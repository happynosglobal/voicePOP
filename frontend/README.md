# Voice Pop Admin Frontend

Voice Pop 관리자 페이지 프론트엔드 애플리케이션입니다. React와 Vite를 기반으로 구축된 현대적인 웹 애플리케이션으로, 방송 및 광고 관리 시스템을 제공합니다.

## 🚀 기술 스택

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Zustand
- **Routing**: React Router DOM 7.2.0
- **HTTP Client**: Axios
- **Charts**: ApexCharts
- **Date Handling**: date-fns, React DatePicker
- **Form Validation**: Joi
- **File Export**: xlsx-js-style

## 📁 프로젝트 구조

```
src/
├── api/                    # API 통신 모듈
│   ├── advertisement/      # 광고 관련 API
│   ├── brand/             # 브랜드 관련 API
│   ├── broadcast/         # 방송 관련 API
│   ├── category/          # 카테고리 관련 API
│   ├── device/            # 장비 관련 API
│   ├── storeGroup/        # 점포그룹 관련 API
│   └── user/              # 사용자 관련 API
├── assets/                # 정적 자원 (이미지, 아이콘)
├── components/            # 재사용 가능한 컴포넌트
│   ├── customDatePicker/  # 커스텀 날짜 선택기
│   ├── customTimePicker/  # 커스텀 시간 선택기
│   ├── dropdown/          # 드롭다운 컴포넌트
│   ├── emptyState/        # 빈 상태 컴포넌트
│   ├── input/             # 입력 컴포넌트
│   ├── loading/           # 로딩 컴포넌트
│   ├── modal/             # 모달 컴포넌트
│   ├── pagination/        # 페이지네이션
│   ├── tab/               # 탭 컴포넌트
│   └── tooltip/           # 툴팁 컴포넌트
├── features/              # 기능별 페이지 컴포넌트
│   ├── AdApproval/        # 광고 승인
│   ├── AdCompanyRegister/ # 광고업체 등록
│   ├── AdRegister/        # 광고 등록
│   ├── AdSchedule/        # 광고 스케줄
│   ├── AdStats/           # 광고 통계
│   ├── AdStatus/          # 광고 현황
│   ├── BroadcastManagement/ # 예약 관리
│   ├── BroadcastRegister/ # 방송 등록
│   ├── Dashboard/         # 대시보드
│   ├── EquipmentManagement/ # 장비 관리
│   ├── EquipmentSetting/  # 장비 설정
│   ├── EquipmentStats/    # 장비 통계
│   ├── EquipmentStatus/   # 장비 현황
│   ├── Login/             # 로그인
│   ├── SignUp/            # 회원가입
│   ├── StoreGroup/        # 점포그룹
│   └── UserManagement/    # 사용자 관리
├── hooks/                 # 커스텀 훅
├── layout/                # 레이아웃 컴포넌트
├── routes/                # 라우팅 설정
├── stores/                # Zustand 스토어
└── utils/                 # 유틸리티 함수
```

## 🛣️ 라우팅 구조

### 인증 관련
- `/login` - 로그인
- `/signup` - 회원가입
- `/help/pw/reset` - 비밀번호 재설정
- `/help/pw/change` - 비밀번호 변경

### 방송 관리
- `/broadcast/device-status` - 장비 현황
- `/broadcast/register` - 방송 등록
- `/broadcast/management` - 예약 관리
- `/broadcast/schedule` - 광고 스케줄

### 광고 관리
- `/advertisement/register` - 광고 등록
- `/advertisement/status` - 광고 현황

### 관리자 기능
- `/status` - 대시보드
- `/manager/user-management` - 사용자 관리
- `/manager/equipment-management` - 장비 관리
- `/manager/store-group` - 점포그룹
- `/manager/equipment-stats` - 장비 통계
- `/manager/ad-stats` - 광고 통계
- `/manager/ad-company-register` - 광고업체 등록
- `/manager/ad-approval` - 광고 승인

### 기타
- `/equipment-setting` - 장비 설정

## 🔧 환경 변수

### Development (.env.development)
```env
VITE_API_PREFIX=/v2
VITE_ERODY_ASSIST_API_HOST=https://api-ext.dev-chatbot.emart.com/assist
VITE_ERODY_ASSIST_API_KEY=1234567asdfgh
VITE_BROADCAST_TIME_MIN=07:00
VITE_BROADCAST_TIME_MAX=22:00
VITE_BROADCAST_TIME_DEFAULT_START=10:00
VITE_BROADCAST_TIME_DEFAULT_END=22:00
```

### Production (.env.production)
```env
VITE_API_PREFIX=/v2
VITE_ERODY_ASSIST_API_HOST=https://api-ext.dev-chatbot.emart.com/assist
VITE_ERODY_ASSIST_API_KEY=1234567asdfgh
VITE_BROADCAST_TIME_MIN=07:00
VITE_BROADCAST_TIME_MAX=22:00
VITE_BROADCAST_TIME_DEFAULT_START=10:00
VITE_BROADCAST_TIME_DEFAULT_END=22:00
```

### 환경 변수 설명
- `VITE_API_PREFIX`: API 요청 프리픽스
- `VITE_ERODY_ASSIST_API_HOST`: 어시스트 API 호스트
- `VITE_ERODY_ASSIST_API_KEY`: 어시스트 API 키
- `VITE_BROADCAST_TIME_MIN/MAX`: 방송 시간 범위
- `VITE_BROADCAST_TIME_DEFAULT_START/END`: 기본 방송 시간

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+
- Yarn 또는 npm

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드 (개발용)
yarn build:dev

# 빌드 (프로덕션용)
yarn build:prd

# 프리뷰
yarn preview

# 린트 검사
yarn lint
```

## 🏗️ 주요 기능

### 1. 대시보드
- 시스템 전체 현황 모니터링
- 실시간 통계 및 차트

### 2. 방송 관리
- **장비 현황**: 방송 장비 상태 모니터링
- **방송 등록**: 새로운 방송 콘텐츠 등록
- **예약 관리**: 방송 스케줄 관리

### 3. 광고 관리
- **광고 등록**: 새로운 광고 콘텐츠 등록
- **광고 현황**: 광고 상태 및 진행 상황
- **광고 스케줄**: 광고 방송 일정 관리
- **광고 승인**: 광고 콘텐츠 승인 프로세스

### 4. 관리자 기능
- **사용자 관리**: 시스템 사용자 관리
- **장비 관리**: 방송 장비 관리
- **점포그룹**: 점포 그룹 관리
- **통계**: 장비 및 광고 통계
- **광고업체 등록**: 광고 파트너사 관리

## 🔐 인증 시스템

- JWT 기반 인증
- 역할 기반 접근 제어 (RBAC)
- 메뉴 권한에 따른 동적 라우팅
- 보호된 라우트 구현

## 📊 상태 관리

- **Zustand**: 경량 상태 관리 라이브러리 사용
- **stores/user.js**: 사용자 정보 및 인증 상태
- **stores/loading.js**: 로딩 상태 관리
- **stores/codes.js**: 코드 데이터 관리

## 🎨 UI/UX

- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **DaisyUI**: Tailwind CSS 컴포넌트 라이브러리
- **React Icons**: 아이콘 라이브러리
- **React Toastify**: 알림 메시지
- **React Tooltip**: 툴팁 컴포넌트

## 📈 차트 및 시각화

- **ApexCharts**: 인터랙티브 차트 라이브러리
- **React Big Calendar**: 캘린더 컴포넌트
- 실시간 데이터 시각화

## 📁 파일 처리

- **React Dropzone**: 파일 드래그 앤 드롭
- **xlsx-js-style**: Excel 파일 내보내기
- **file-saver**: 파일 다운로드

## 🔧 개발 도구

- **ESLint**: 코드 품질 검사
- **Vite**: 빠른 개발 서버 및 빌드 도구
- **SWC**: 빠른 JavaScript/TypeScript 컴파일러

## 📝 라이선스

이 프로젝트는 비공개 프로젝트입니다.
