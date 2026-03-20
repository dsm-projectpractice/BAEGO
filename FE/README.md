# BAEGO FE

주변 맛집을 탐색하고 즐겨찾기로 관리하는 모바일 웹 앱 프론트엔드입니다.

## 기술 스택

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router DOM**

## 프로젝트 구조

```
src/
├── components/
│   ├── common/       # 공통 UI 컴포넌트
│   ├── filter/       # 필터 관련 컴포넌트
│   ├── location/     # 위치 관련 컴포넌트
│   └── restaurant/   # 레스토랑 관련 컴포넌트
├── contexts/         # React Context (즐겨찾기 등)
├── data/             # 목업 데이터
├── hooks/            # 커스텀 훅
├── pages/            # 페이지 컴포넌트
└── types/            # TypeScript 타입 정의
```

## 페이지 구성

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | SplashPage | 앱 진입 스플래시 |
| `/home` | HomePage | 홈 (주변 맛집) |
| `/explore` | ExplorePage | 맛집 탐색 |
| `/favorites` | FavoritesPage | 즐겨찾기 목록 |
| `/mypage` | MyPage | 마이페이지 |

## 실행 방법

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```
