# 팀원 정보

## 프로젝트
**배고** — 위치 기반 식사 추천 서비스 (Web-view App)  
개발 기간: 2026.03.06 ~ 2026.04.25 (총 8주)

---

## 팀원

### 김시우
- 학번: 3102
- 역할: FE 기능/연동 담당
- git 이름: 김시우
- git 이메일: proxy1@ncloud.sbs
- 담당 영역:
  - 프론트엔드 개발 환경 초기 세팅 (Vite + React + TypeScript + Tailwind CSS)
  - 레스토랑 타입 정의 및 Mock 데이터 작성
  - `useGeolocation` 커스텀 훅 (GPS 에러 분기 처리 포함)
  - `useFilterStore` Zustand 전역 상태 관리
  - Axios 인스턴스 + Request/Response Interceptor 구현
  - 실제 백엔드 API 연동 (GET /api/restaurants)
  - 네이버 지도 딥링크 브릿지 (`openNaverMap`) 구현
  - 즐겨찾기 기능 (FavoritesContext + localStorage)

---

### 이동현
- 학번: 3110
- 역할: PM & 백엔드 담당
- git 이름: 이동현
- git 이메일: proxy0@ncloud.sbs
- 담당 영역:
  - 프로젝트 기획서 및 WBS 작성, 팀 R&R 확정
  - Notion 프로젝트 보드 + GitHub Issues/Milestones 관리
  - Naver Cloud Platform API 키 발급 및 보안 관리
  - DB 설계 (MySQL 4테이블 + Redis 키 패턴)
  - API 명세서 작성 및 FE 팀과 응답 포맷 합의
  - Docker 개발 환경 구성 (docker-compose.yml: Node.js 20 + Redis 7.x)
  - NestJS 프록시 서버 초기화 (helmet, CORS, rate-limit, dotenv)
  - Naver Search API / Reverse Geocoding Wrapper 모듈
  - Redis 캐싱 레이어 (식당 TTL 30분, 역지오코딩 TTL 24시간)
  - Redis 기반 Rate Limit 전환 (`rate-limit-redis`)
  - ValidationPipe + class-validator 전역 파라미터 검증
  - winston 로거 도입

---

### 조성현
- 학번: 3114
- 역할: FE UI/UX 담당
- git 이름: 조성현
- git 이메일: proxy2@ncloud.sbs
- 담당 영역:
  - 스토리보드 작성 (전체 화면 흐름 설계 및 팀 리뷰)
  - UI/UX 요구사항 명세서 작성
  - Figma 화면 설계 (Atomic Design 기반 Master Component 구조)
  - 디자인 시스템 정의 (컬러 팔레트, 타이포그래피, 8px 그리드)
  - Tailwind CSS 커스텀 설정 (`tailwind.config.js`)
  - 공통 UI 컴포넌트 개발 (Button, RestaurantCard, Tag, BottomNav, AppLayout)
  - BottomSheet 구현 (framer-motion 스와이프 제스처)
  - Skeleton UI 컴포넌트 (RestaurantCardSkeleton, HeaderSkeleton)
  - 모바일 크로스 브라우징 테스트 및 버그 수정
  - iOS Safe Area (`env(safe-area-inset-bottom)`) 대응
  - `dvh` 단위 도입으로 모바일 뷰포트 높이 문제 해결

---

## 개발일지 제출 현황

| 차수 | 기간 | 김시우 | 이동현 | 조성현 |
|------|------|--------|--------|--------|
| 1차  | 03.06 ~ 03.19 | 완료 | 완료 | 완료 |
| 2차  | 03.20 ~ 04.02 | 완료 | 완료 | 완료 |
| 3차  | 04.03 ~ 04.16 | 완료 | 완료 | 완료 |

---

## 기술 스택

**FE:** Vite 5 + React 18 + TypeScript 5 + Tailwind CSS 3 + Zustand + Axios + framer-motion  
**BE:** Node.js 20 + NestJS + Redis 7.x + MySQL 8.x  
**외부 API:** Naver Cloud Platform (Search API, Maps API, Reverse Geocoding)  
**인프라:** Docker, AWS EC2, Netlify  
**협업:** Notion, GitHub Issues/Milestones, Discord
