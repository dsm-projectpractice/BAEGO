# 배고 (BAEGO)

> 위치 기반 식사 추천 서비스 — 입력 없이 터치 한 번으로 메뉴를 결정

## 프로젝트 개요

현재 위치를 자동으로 감지하여 주변 식당을 즉시 추천해주는 Web-view App입니다.
검색어 입력 없이 수동적(passive) 추천 흐름을 제공하여 식사 결정 피로도를 줄이는 것을 목표로 합니다.

- **개발 기간:** 2026.03.06 ~ 2026.04.25 (8주)
- **팀 구성:** 3인 (PM & Backend, Frontend UI/UX, Frontend 기능/연동)

## 팀원

| 이름 | 역할 | 담당 |
|------|------|------|
| 이동현 | PM & Backend | 프로젝트 관리, Express/NestJS 프록시 서버, Redis 캐싱, AWS EC2 배포, CI/CD |
| 조성현 | Frontend (UI/UX) | Figma 화면 설계, 공통 컴포넌트, 디자인 시스템 |
| 김시우 | Frontend (기능/연동) | Geolocation, Naver API 연동, 클라이언트 상태 관리, 라우팅 |

## 핵심 기능

- **위치 기반 식당 탐색** — HTML5 Geolocation API로 위경도 수집, Naver Reverse Geocoding으로 행정동 주소 변환
- **메뉴 추천 엔진** — 거리순/평점순 정렬, 거리(500m/1km/2km) · 카테고리(한/중/일/양식) 필터
- **네이버 플레이스 딥링크** — 식당 선택 시 네이버 플레이스 앱/모바일 웹으로 직접 연결
- **즐겨찾기** — 마음에 드는 식당 저장 및 관리
- **선택 이력** — 방문 이력 기반 개인화 추천 데이터 축적

## 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| React | 18 | UI 라이브러리 |
| TypeScript | 5 | 타입 안전성 |
| Vite | 5 | 빌드 툴 |
| Tailwind CSS | 3 | 스타일링 |
| React Router | - | 클라이언트 라우팅 |

### Backend
| 기술 | 버전 | 용도 |
|------|------|------|
| NestJS | 11 | 프록시 서버 프레임워크 |
| Node.js | 20 | 런타임 |
| Redis | 7.x | API 응답 캐싱, Rate Limit |
| MySQL | 8.x | 사용자 데이터 영구 저장 |
| TypeORM | - | ORM |

### Infra / DevOps
| 기술 | 용도 |
|------|------|
| AWS EC2 | 서버 배포 |
| Docker | 컨테이너화 |
| GitHub Actions | CI/CD 파이프라인 |
| Naver Cloud API | Local Search, Maps, Reverse Geocoding |

## 프로젝트 구조

```
BAEGO/
├── FE/                          # 프론트엔드 (React + TypeScript)
│   └── src/
│       ├── components/          # 공통 컴포넌트 (Button, Card, BottomSheet 등)
│       ├── pages/               # 페이지 (Home, Explore, Favorites, MyPage)
│       ├── hooks/               # 커스텀 훅 (useGeolocation, useRestaurants)
│       ├── contexts/            # 전역 상태 (FavoritesContext)
│       ├── data/                # Mock 데이터
│       └── types/               # 타입 정의
└── BE/                          # 백엔드 (NestJS)
    └── src/
        ├── restaurants/         # GET /api/restaurants (Naver Search 프록시)
        ├── geocode/             # GET /api/geocode (역지오코딩)
        ├── users/               # 사용자 등록 및 선호도
        ├── history/             # 선택 이력
        ├── favorites/           # 즐겨찾기
        └── common/filters/      # 전역 예외 처리
```

## 시작하기

### Frontend

```bash
cd FE
npm install
npm run dev
```

### Backend

```bash
cd BE
cp .env.example .env   # 환경변수 설정
npm install
npm run start:dev
```

### 환경변수 (BE/.env)

```env
NAVER_CLIENT_ID=         # Naver Search API Client ID
NAVER_CLIENT_SECRET=     # Naver Search API Client Secret
NAVER_MAP_CLIENT_ID=     # Naver Maps API Key ID
NAVER_MAP_CLIENT_SECRET= # Naver Maps API Key Secret
DB_HOST=localhost
DB_PORT=3306
DB_NAME=baego
DB_USER=
DB_PASSWORD=
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PORT=3000
ALLOWED_ORIGIN=http://localhost:5173
```

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET | /api/restaurants | 위치 기반 식당 조회 |
| GET | /api/geocode | 역지오코딩 (좌표 → 행정동) |
| POST | /api/users | 사용자 등록 |
| GET/PATCH | /api/users/:id/preferences | 선호도 조회/수정 |
| POST/GET | /api/history | 선택 이력 저장/조회 |
| POST/DELETE/GET | /api/favorites | 즐겨찾기 추가/삭제/조회 |
