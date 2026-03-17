# DB 설계서

> 프로젝트: 배고 (위치 기반 식사 추천 서비스)
> 작성자: 이동현 (3110) | 담당: PM & Backend
> 작성일: 2026-03-06 | ver 1.0

---

## 저장소 구성

| 저장소 | 용도 | 비고 |
|--------|------|------|
| MySQL 8.x | 사용자, 선호도, 선택 이력, 즐겨찾기 | 영구 저장 |
| Redis 7.x | Naver API 응답 캐시, Rate Limit 카운터 | TTL 기반 자동 만료 |

> 식당 원천 데이터는 Naver API 실시간 조회. 자체 저장 없음.
> 사용자 데이터(선호도/이력/즐겨찾기)만 MySQL에 영구 저장.

---

## MySQL 테이블 설계

### tbl_users

```sql
CREATE TABLE tbl_users (
  user_id        BIGINT       NOT NULL AUTO_INCREMENT,
  device_id      VARCHAR(255) NOT NULL                 COMMENT '기기 고유 ID (UUID 형식)',
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_active_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,
  is_active      TINYINT(1)   NOT NULL DEFAULT 1        COMMENT '0: 탈퇴/비활성',

  PRIMARY KEY (user_id),
  UNIQUE KEY uq_device_id (device_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='사용자 기본 정보 (device_id 기반 식별)';
```

**비고**
- MVP 단계: 별도 회원가입 없이 device_id 기반 식별
- 추후 소셜 로그인 연동 시 `oauth_provider`, `oauth_id` 컬럼 추가 예정

---

### tbl_user_preferences

```sql
CREATE TABLE tbl_user_preferences (
  preference_id       BIGINT      NOT NULL AUTO_INCREMENT,
  user_id             BIGINT      NOT NULL,
  preferred_category  VARCHAR(20) NOT NULL DEFAULT '전체'
                                  COMMENT '전체|한식|중식|일식|양식',
  preferred_radius    INT         NOT NULL DEFAULT 1000
                                  COMMENT '단위: m | 허용값: 500, 1000, 2000',
  preferred_sort      VARCHAR(20) NOT NULL DEFAULT 'distance'
                                  COMMENT 'distance|rating',
  disliked_categories VARCHAR(100)     NULL DEFAULT NULL
                                  COMMENT '기피 카테고리 콤마 구분 (예: 중식,양식)',
  updated_at          DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP
                                  ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (preference_id),
  UNIQUE KEY uq_user_preference (user_id),
  CONSTRAINT fk_pref_user
    FOREIGN KEY (user_id) REFERENCES tbl_users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='사용자 음식 선호도';
```

**비고**
- `user_id`에 UNIQUE 제약 → 사용자당 선호도 1건
- `disliked_categories`: JSON 대신 VARCHAR 콤마 구분 (파싱 단순화)
- 선택 이력 누적 시 서버에서 집계 후 자동 갱신

---

### tbl_selection_history

```sql
CREATE TABLE tbl_selection_history (
  history_id  BIGINT       NOT NULL AUTO_INCREMENT,
  user_id     BIGINT       NOT NULL,
  place_id    VARCHAR(100) NOT NULL COMMENT 'Naver 플레이스 ID',
  place_name  VARCHAR(255) NOT NULL COMMENT '식당명 스냅샷 (API 응답 시점)',
  category    VARCHAR(20)  NOT NULL COMMENT '한식|중식|일식|양식',
  region      VARCHAR(100) NOT NULL COMMENT '선택 시점 행정동',
  selected_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  rating      TINYINT          NULL DEFAULT NULL
                               COMMENT '사용자 평가 1~5 (NULL: 미평가)',

  PRIMARY KEY (history_id),
  KEY idx_history_user_id    (user_id),
  KEY idx_history_place_id   (place_id),
  KEY idx_history_selected_at (selected_at),
  KEY idx_history_user_category (user_id, category),
  CONSTRAINT fk_history_user
    FOREIGN KEY (user_id) REFERENCES tbl_users(user_id)
    ON DELETE CASCADE,
  CONSTRAINT chk_rating CHECK (rating IS NULL OR rating BETWEEN 1 AND 5)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='식당 선택 이력 (개인화 추천 기반 데이터)';
```

**비고**
- `place_name`은 선택 시점 스냅샷 저장 (Naver 데이터 변경 대비)
- `idx_history_user_category`: 카테고리별 선택 빈도 집계 쿼리 최적화
- `rating` NULL 허용: 평가는 선택 후 선택적으로 진행

---

### tbl_favorites

```sql
CREATE TABLE tbl_favorites (
  favorite_id BIGINT       NOT NULL AUTO_INCREMENT,
  user_id     BIGINT       NOT NULL,
  place_id    VARCHAR(100) NOT NULL COMMENT 'Naver 플레이스 ID',
  place_name  VARCHAR(255) NOT NULL COMMENT '식당명 스냅샷',
  category    VARCHAR(20)  NOT NULL COMMENT '한식|중식|일식|양식',
  naver_link  VARCHAR(500) NOT NULL COMMENT '네이버 플레이스 딥링크 URL',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (favorite_id),
  UNIQUE KEY uq_user_place (user_id, place_id),
  KEY idx_favorites_user_id (user_id),
  CONSTRAINT fk_favorites_user
    FOREIGN KEY (user_id) REFERENCES tbl_users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='즐겨찾기';
```

**비고**
- `uq_user_place (user_id, place_id)`: 동일 식당 중복 즐겨찾기 방지
- `naver_link` 스냅샷 저장: 딥링크는 Naver 정책 변경 가능성 있음

---

## 테이블 관계 (ERD 요약)

```
tbl_users (1)
├── (1:1) tbl_user_preferences   ON DELETE CASCADE
├── (1:N) tbl_selection_history  ON DELETE CASCADE
└── (1:N) tbl_favorites          ON DELETE CASCADE
```

---

## 인덱스 설계 요약

| 테이블 | 인덱스명 | 컬럼 | 목적 |
|--------|----------|------|------|
| tbl_users | uq_device_id | device_id | 기기 식별 조회 |
| tbl_user_preferences | uq_user_preference | user_id | 사용자별 선호도 단건 조회 |
| tbl_selection_history | idx_history_user_id | user_id | 사용자 이력 목록 조회 |
| tbl_selection_history | idx_history_place_id | place_id | 특정 식당 선택 빈도 조회 |
| tbl_selection_history | idx_history_selected_at | selected_at | 최근 이력 정렬 조회 |
| tbl_selection_history | idx_history_user_category | user_id, category | 카테고리별 선택 빈도 집계 |
| tbl_favorites | uq_user_place | user_id, place_id | 중복 즐겨찾기 방지 |
| tbl_favorites | idx_favorites_user_id | user_id | 사용자 즐겨찾기 목록 조회 |

---

## Redis 키 설계

| 키 패턴 | TTL | 용도 |
|---------|-----|------|
| `restaurants:{region}:{category}:{radius}` | 1,800초 (30분) | 식당 목록 캐시 |
| `geocode:{lat_3자리}:{lng_3자리}` | 86,400초 (24시간) | 역지오코딩 캐시 |
| `ratelimit:{ip}:{minute_ts}` | 60초 | Rate Limit 카운터 (분당 30회 제한) |

---

## 환경 변수 (.env)

```env
# Naver API
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=

# MySQL
DB_HOST=
DB_PORT=3306
DB_NAME=baego
DB_USER=
DB_PASSWORD=

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Server
PORT=3000
ALLOWED_ORIGIN=
NODE_ENV=production

# Optional
RATE_LIMIT_MAX=30
CACHE_TTL_RESTAURANTS=1800
CACHE_TTL_GEOCODE=86400
```

> .env는 .gitignore 필수 포함. EC2 배포 시 GitHub Actions Secrets에서 주입.
