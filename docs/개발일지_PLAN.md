# 개발일지 작성 계획

> 프로젝트: 배고 (위치 기반 식사 추천 서비스)
> 작성자: 이동현 (3110) | 담당: PM & Backend
> 총 작성 횟수: 3차

---

## 일지별 작성 시기 및 커버 범위

| 차수 | 작성 시기 | 커버 주차 | 기간 |
|------|-----------|-----------|------|
| 1차 | 2026-03-20 (3주차 초) | 1~2주차 | 03/06 ~ 03/19 |
| 2차 | 2026-04-03 (5주차 초) | 3~4주차 | 03/20 ~ 04/02 |
| 3차 | 2026-04-22 (8주차 초) | 5~8주차 | 04/03 ~ 04/25 |

> **작성 원칙:** 각 일지는 직전 구간이 끝난 직후 작성. 진행률·이슈는 실제 수행 내용 기준으로 기재.

---

## 1차 개발일지 (1~2주차 | 기획 및 설계 / PM 착수)

### 기본 정보
- **개발기간:** 2026년 3월 6일 – 3월 19일
- **학번:** 3110
- **성명:** 이동현
- **프로젝트 주제:** 배고 — 위치 기반 식사 추천 서비스 (Web-view App)

---

### 기능 구현 및 진행상황

**이번 주 목표 및 진행률**
- 요구사항 정의 및 팀 일정 계획 수립 — 100% 완료
- Notion 프로젝트 보드 구성 — 100% 완료
- 네이버 Cloud Platform API 등록 및 키 발급 — 100% 완료
- ERD 작성 (MySQL 4개 테이블 + Redis 키 설계) — 100% 완료
- API 명세서 초안 작성 — 70% 완료 (엔드포인트 목록 확정, FE 팀과 응답 포맷 합의 미완)

**주요 개발 내용**

1. **프로젝트 기획서 작성**
   - 서비스 개요, 핵심 기능, 기술 스택, WBS 포함한 기획서 ver 1.0 완성
   - 팀원 R&R 확정: 조성현(FE UI/UX), 김시우(FE 기능/연동), 이동현(PM & Backend)

2. **Notion 프로젝트 보드 구성 (PM 역할)**
   - 주차별 마일스톤 설정, GitHub Issues/Milestones 연동
   - 팀 Discord 채널 및 소통 규칙 수립

3. **Naver Cloud Platform API 키 발급**
   - Naver Search API (Local), Naver Maps API, Reverse Geocoding API 등록
   - .env 파일 구조 및 키 보안 관리 방식 결정

4. **DB 설계 (ERD 작성)**
   - MySQL: tbl_users, tbl_user_preferences, tbl_selection_history, tbl_favorites — 4개 테이블 설계
   - Redis: 식당 목록 캐시 / 역지오코딩 캐시 / Rate Limit 카운터 — 키 패턴 및 TTL 전략 확정
   - 관계: tbl_users 1:1 선호도, 1:N 이력, 1:N 즐겨찾기 (ON DELETE CASCADE)

5. **API 명세서 초안**
   - `GET /api/restaurants` (위치 기반 식당 조회)
   - `GET /api/geocode` (역지오코딩)
   - `POST /api/history`, `GET /api/history` (선택 이력)
   - `POST /api/favorites`, `DELETE /api/favorites/:place_id`, `GET /api/favorites`

> **첨부:** ERD 다이어그램 이미지 / Notion 보드 스크린샷 / API 명세서 초안 문서

---

### 이슈 관리 및 해결 과정

**예상 이슈 및 작성 포인트 (실제 발생 내용으로 대체)**

| 항목 | 내용 |
|------|------|
| 발생한 이슈 | Naver Cloud API 무료 등급 쿼터 한도 확인 중 Local Search API가 하루 1,000건으로 제한됨을 발견 |
| 원인 분석 | 팀 전체 인원이 동일 Client ID를 공유하므로 개발 중 테스트 요청만으로도 쿼터 소진 위험 존재 |
| 해결 과정 및 결과 | Redis 캐싱 전략을 설계 단계에서부터 확정 (TTL 30분), 개발·스테이징 환경에서는 Mock 응답 JSON을 별도 작성하여 API 호출 없이 테스트하기로 팀 합의 |

---

### KPT 회고 및 차주 계획

**Keep**
- ERD를 팀 전체가 리뷰하며 합의한 점 → 이후 연동 시 혼선 최소화 예상
- Notion + GitHub Issues 이중 관리 체계로 누락 없는 일정 추적 가능

**Problem**
- API 명세서 응답 포맷이 팀원(FE)과 완전히 합의되지 않은 상태로 1주차 종료
- 역할 분담 후 첫 주라 팀 간 소통 비용이 예상보다 높았음

**Try**
- 2주차 내 FE 팀과 API 응답 포맷 싱크 미팅 1회 진행 → 명세서 최종 확정
- 주 2회(월·목) 정기 스탠드업으로 소통 비용 구조화

**차주(3~4주차) 개발 계획**
- Docker 개발 환경 구성 (docker-compose.yml: Node.js + Redis)
- Node.js + Express 프록시 서버 초기화 (라우터, 미들웨어 구조 설계)
- Naver Search API / Reverse Geocoding Wrapper 모듈 완성
- .env 기반 API 키 보안 설정 및 팀원 공유 방식 결정

---

## 2차 개발일지 (3~4주차 | 서버 기초 개발)

### 기본 정보
- **개발기간:** 2026년 3월 20일 – 4월 2일
- **학번:** 3110
- **성명:** 이동현
- **프로젝트 주제:** 배고 — 위치 기반 식사 추천 서비스 (Web-view App)

---

### 기능 구현 및 진행상황

**이번 주 목표 및 진행률**
- Docker 개발 환경 구성 (docker-compose.yml) — 100% 완료
- Express 프록시 서버 초기화 (라우터·미들웨어 구조) — 100% 완료
- Naver Search API Wrapper 모듈 — 100% 완료
- Naver Reverse Geocoding Wrapper 모듈 — 85% 완료 (행정동 파싱 로직 마무리 중)
- .env 기반 API 키 보안 설정 — 100% 완료
- API 명세서 FE 팀 최종 합의 — 75% 완료 (mock→실제 전환 시 응답 포맷 조율 진행 중)

**주요 개발 내용**

1. **Docker 개발 환경 구성**
   - `docker-compose.yml`: Node.js 20 + Redis 7.x 컨테이너 구성
   - `.dockerignore`, `Dockerfile` 작성
   - 팀원 로컬에서 `docker compose up`으로 즉시 실행 가능한 환경 제공

2. **Express 서버 구조 초기화**
   - 디렉토리: `src/routes/`, `src/controllers/`, `src/services/`, `src/middlewares/`
   - 미들웨어: `helmet` (보안 헤더), `cors` (허용 Origin 제한), `express-rate-limit`
   - 환경변수: `dotenv` 연동, 필수 키 누락 시 서버 시작 차단 로직 적용

3. **Naver API Wrapper 모듈**
   - `src/services/naverSearchService.js`: Local Search API 호출 추상화
   - `src/services/naverGeocodeService.js`: Reverse Geocoding 호출 추상화
   - Axios 기반 HTTP 클라이언트, 타임아웃 3,000ms 설정

4. **API 엔드포인트 1차 구현**
   - `GET /api/restaurants?lat=&lng=&category=&radius=&sort=` — 식당 조회 (Naver API 프록시)
   - `GET /api/geocode?lat=&lng=` — 역지오코딩 (행정동 주소 반환)

> **첨부:** `docker-compose.yml` 코드 스크린샷 / Wrapper 모듈 주요 코드 / Postman API 테스트 결과 캡쳐

---

### 이슈 관리 및 해결 과정

**예상 이슈 및 작성 포인트 (실제 발생 내용으로 대체)**

| 항목 | 내용 |
|------|------|
| 발생한 이슈 | CORS 설정 후 FE 로컬(localhost:3001)에서 서버(localhost:3000) 호출 시 preflight 오류 발생 |
| 원인 분석 | `cors` 패키지 설정에서 `OPTIONS` 메서드 허용 및 `Access-Control-Allow-Headers` 미설정 |
| 해결 과정 및 결과 | `cors({ origin, methods: ['GET','POST','DELETE'], allowedHeaders: ['Content-Type'] })` 명시적 설정으로 해결. MDN CORS 문서 및 express cors 패키지 공식 문서 참조 |

---

### KPT 회고 및 차주 계획

**Keep**
- Docker 환경 통일로 "내 로컬에서만 됨" 문제 사전 차단
- Wrapper 모듈 추상화로 FE 연동 시 서비스 레이어만 호출하면 되는 구조 확보

**Problem**
- Rate Limit 미들웨어 적용은 완료했으나 Redis 기반 분산 카운터가 아닌 in-memory 방식 → EC2 배포 후 프로세스 재시작 시 초기화 문제 존재
- 서버 로깅 체계가 `console.log`에 의존 중 → 프로덕션 환경 부적합

**Try**
- Redis 기반 Rate Limit 카운터로 교체 (`rate-limit-redis` 패키지 검토)
- `winston` 또는 `morgan` 로거 도입으로 로그 레벨·파일 저장 체계 구축

**차주(5~6주차) 개발 계획**
- Redis 캐싱 레이어 적용 (`restaurants:{region}:{category}:{radius}` 키 / TTL 1,800초)
- 역지오코딩 캐시 적용 (`geocode:{lat_3자리}:{lng_3자리}` / TTL 86,400초)
- 필터링 파라미터 서버 가공 로직 (거리·카테고리·정렬)
- FE 팀 연동 지원 및 API 응답 포맷 최종 통일

---

## 3차 개발일지 (5~8주차 | 서버 심화 개발 → 테스트 → 배포)

### 기본 정보
- **개발기간:** 2026년 4월 3일 – 4월 25일
- **학번:** 3110
- **성명:** 이동현
- **프로젝트 주제:** 배고 — 위치 기반 식사 추천 서비스 (Web-view App)

---

### 기능 구현 및 진행상황

**이번 주 목표 및 진행률**
- Redis 캐싱 레이어 적용 (식당 목록 + 역지오코딩) — 100% 완료
- Rate Limit Redis 분산 카운터 전환 — 100% 완료
- 필터링 파라미터 서버 가공 로직 + 에러 코드 표준화 — 100% 완료
- CORS·Rate Limit 미들웨어 최종 확정 — 100% 완료
- FE 팀 실 API 연동 지원 및 QA 이슈 수정 — 90% 완료 (잔여 이슈 1건 처리 중)
- 서버 부하 테스트 (autocannon) 및 전역 예외 처리 — 100% 완료
- AWS EC2 프로덕션 배포 — 100% 완료
- GitHub Actions CI/CD 파이프라인 — 90% 완료 (배포 자동화 완료, 서버 모니터링 설정 중)

**주요 개발 내용**

1. **Redis 캐싱 레이어 (5~6주차)**
   - 식당 목록: `restaurants:{region}:{category}:{radius}` → TTL 1,800초
   - 역지오코딩: `geocode:{lat_3자리}:{lng_3자리}` → TTL 86,400초
   - Rate Limit 카운터: `ratelimit:{ip}:{minute_ts}` → TTL 60초 / 분당 30회 제한
   - 캐시 히트 시 Naver API 호출 Skip → 쿼터 절감 효과 실측

2. **필터링 파라미터 서버 가공 로직**
   - 거리(500m/1km/2km), 카테고리(한/중/일/양식/전체), 정렬(거리순/평점순) 파라미터 검증·가공
   - 허용 외 값 입력 시 400 Bad Request + 에러 코드 표준화 (`INVALID_CATEGORY`, `INVALID_RADIUS` 등)

3. **FE 연동 지원 (6주차)**
   - API 응답 포맷 최종 통일 (카멜케이스 필드명, 페이지네이션 메타 포함)
   - FE QA 이슈 3건 백엔드 수정: 카테고리 필터 미적용 버그, 거리 단위 오류, CORS Preflight 재발

4. **테스트 및 디버깅 (7주차)**
   - `autocannon`으로 부하 테스트: 100 동시 요청 / 30초 → 평균 응답 120ms
   - API 예외 처리 표준화: 전역 에러 핸들러 미들웨어 적용
   - Redis 캐시 히트율 점검: 동일 지역 반복 요청 기준 히트율 약 70%

5. **AWS EC2 배포 및 CI/CD (8주차)**
   - EC2 t3.micro 인스턴스 구성, Docker 이미지 빌드·배포
   - GitHub Actions: `main` 브랜치 PR merge 시 lint → build → EC2 배포 자동 트리거
   - PM2 프로세스 매니저 적용 (서버 자동 재시작), 배포 실패 시 이전 이미지 롤백

> **첨부:** Redis 캐시 히트율 로그 / 부하 테스트 결과 / GitHub Actions 워크플로우 YAML / EC2 배포 완료 스크린샷

---

### 이슈 관리 및 해결 과정

**예상 이슈 및 작성 포인트 (실제 발생 내용으로 대체)**

| 항목 | 내용 |
|------|------|
| 발생한 이슈 | GitHub Actions 배포 시 EC2에서 Docker 이미지 pull 후 컨테이너 재시작이 간헐적으로 실패 |
| 원인 분석 | 이전 컨테이너가 종료되지 않은 상태에서 새 컨테이너가 동일 포트(3000) 바인딩 시도 → 충돌 |
| 해결 과정 및 결과 | Actions 배포 스텝에 `docker stop` → `docker rm` → `docker run` 순서 명시적 작성으로 해결. Docker 공식 문서 및 GitHub Actions marketplace 레퍼런스 참조 |

---

### KPT 회고 및 차주 계획

**Keep**
- Redis 캐싱으로 일일 API 쿼터 소진 없이 개발·QA 전 구간 완료
- Docker + GitHub Actions 조합으로 EC2 배포 자동화 → 수동 배포 오류 Zero
- 전역 에러 핸들러로 예외 처리 일관성 확보, FE 팀 디버깅 시간 단축

**Problem**
- EC2 단일 인스턴스 구성으로 장애 시 서비스 전면 중단 위험 잔존
- 부하 테스트를 7주차에야 진행 → 병목 발견 시 수정 시간 부족

**Try**
- (추후 고도화 시) EC2 Auto Scaling 또는 Load Balancer 도입 검토
- 다음 프로젝트에서는 5주차 이전 부하 테스트 조기 진행

**최종 결과 요약**
- 배포 URL: (서비스 접속 주소 기재)
- GitHub Repository: (저장소 주소 기재)
- 핵심 성과: 프록시 서버 + Redis 캐싱으로 API 키 보안 및 쿼터 절감 달성, CI/CD 자동화로 안정적 배포 환경 구축

---

## 작성 시 공통 유의사항

1. **실제 코드·캡쳐 첨부 필수**: 기능 구현 및 진행상황 섹션에 소스코드 스크린샷 또는 Git 커밋 화면 반드시 포함
2. **진행률은 수치로**: "80% 완료" 등 구체적 수치 사용
3. **이슈는 1건 이상**: 없으면 "발생 없음"보다 경미한 이슈라도 기술 — 학습 과정 서술로 활용
4. **KPT Try는 액션 아이템**: "더 잘하겠다"가 아닌 "X를 Y 방식으로 시도한다" 형태로 구체화
5. **차주 계획은 WBS 기반**: PLAN.md의 주차별 업무를 기준으로 작성, 완료 못한 항목은 이월 명시
