# SERA IR 웹사이트 설정 로그

## 프로젝트 초기화 및 GitHub Pages 설정 과정

이 문서는 (주)세라 IR 웹사이트 개발을 위한 Astro 프로젝트 초기화 및 GitHub Pages 배포 설정 과정을 기록합니다.

## 1. 초기 환경 설정

### 작업 환경
- 프로젝트 경로: `D:\Project\Sera_IR`
- GitHub 저장소: `https://github.com/securil/Sera_IR.git`
- 개발 환경: Windows 10, Astro

### 프로젝트 구조
```
D:\Project\Sera_IR
├── .git                # Git 저장소
├── .github             # GitHub Actions 설정
├── .gitignore          # Git 제외 파일 설정
├── .vscode             # VS Code 설정
├── astro.config.mjs    # Astro 설정 파일
├── node_modules        # 패키지 모듈
├── package.json        # 프로젝트 설정
├── package-lock.json   # 패키지 잠금 파일
├── public              # 정적 파일 디렉토리
│   ├── img             # 이미지 파일
│   ├── js              # JavaScript 파일
│   └── styles          # CSS 파일
├── README.md           # 프로젝트 설명서
├── setup-log.md        # 설정 로그 (이 파일)
├── src                 # 소스 코드
│   ├── components      # 재사용 가능한 컴포넌트
│   ├── layouts         # 페이지 레이아웃
│   ├── pages           # 페이지 파일
│   │   ├── ko          # 한국어 페이지
│   │   ├── en          # 영어 페이지
│   │   ├── zh          # 중국어 페이지
│   │   ├── ja          # 일본어 페이지
│   │   └── index.astro # 메인 리디렉션
│   └── styles          # 전역 스타일
└── tsconfig.json       # TypeScript 설정
```

## 2. GitHub Pages 배포 설정

### package.json 설정
다음과 같이 `package.json` 파일에 gh-pages 패키지를 추가하고 deploy 스크립트를 설정했습니다:

```json
{
  "name": "sera-ir",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "@astrojs/tailwind": "^6.0.2",
    "astro": "^5.7.11"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.17",
    "gh-pages": "^6.1.1",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.17"
  }
}
```

### astro.config.mjs 설정
GitHub Pages 배포 및 다국어 설정을 추가했습니다:

```javascript
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://securil.github.io',
  base: '/Sera_IR',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'zh', 'ja'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  output: 'static'
});
```

## 3. 다국어 지원 구현

### 레이아웃 구성
레이아웃 파일(`src/layouts/Layout.astro`)을 생성하여 공통 헤더, 푸터 및 언어 전환 기능을 구현했습니다. 주요 특징은 다음과 같습니다:

- 헤더: 로고, 내비게이션 메뉴, 언어 선택기
- 푸터: 저작권 정보, 이용약관, 개인정보처리방침 링크, 소셜 미디어 링크
- 언어 선택: 드롭다운 메뉴를 통한 4개 언어(한국어, 영어, 중국어, 일본어) 변경 기능
- 반응형 디자인: 모바일 화면에서는 햄버거 메뉴로 전환

### 다국어 페이지 생성
다음 4개 언어에 대한 기본 페이지를 생성했습니다:
- `src/pages/ko/index.astro`: 한국어 페이지
- `src/pages/en/index.astro`: 영어 페이지
- `src/pages/zh/index.astro`: 중국어 페이지
- `src/pages/ja/index.astro`: 일본어 페이지

기본 접속 시 한국어 페이지로 리디렉션하도록 `src/pages/index.astro` 파일을 설정했습니다.

### 컴포넌트 구조화
재사용 가능한 컴포넌트를 개발하여 코드 중복을 방지했습니다:
- `HeroSection.astro`: 웹사이트 메인 배너 섹션(다국어 지원)

## 4. 디자인 및 애니메이션 효과

### 글로벌 스타일
`public/styles/global.css` 파일에 다음과 같은 전역 스타일을 정의했습니다:
- 색상 팔레트: 블랙(#121212) + 핑크(#ff3e9d) + 바이올렛(#9d00ff) 계열
- 그라데이션 효과: 텍스트 및 버튼에 그라데이션 적용
- 애니메이션 효과: 페이드인, 호버 효과
- 반응형 디자인: 모바일, 태블릿, 데스크톱 뷰에 맞는 미디어 쿼리

### 파티클 애니메이션
Canvas API를 사용한 배경 파티클 효과를 구현했습니다:
- 브랜드 컬러(핑크, 바이올렛)를 사용한 파티클 생성
- 파티클 간 연결선 효과
- 마우스 인터랙션
- 반응형 조정(화면 크기 변경 시 자동 대응)

### 추가 애니메이션
- 요소별 등장 애니메이션(Fade-in)
- 호버 시 버튼 애니메이션
- 헤더 스크롤 애니메이션

## 5. GitHub Actions 자동 배포 설정

### GitHub Actions 워크플로우
`.github/workflows/deploy.yml` 파일을 생성하여 GitHub Actions를 통한 자동 배포를 설정했습니다:

```yaml
name: Deploy to GitHub Pages

on:
  # main 브랜치에 푸시될 때마다 워크플로우 실행
  push:
    branches: [ main, master ]
  # Actions 탭에서 수동으로 워크플로우를 실행할 수 있도록 설정
  workflow_dispatch:

# GitHub Pages 배포에 필요한 쓰기 권한 설정
permissions:
  contents: read
  pages: write
  id-token: write

# 동시에 하나의 배포만 허용
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci
      - name: Build with Astro
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

이 설정으로 `master` 브랜치에 변경사항을 푸시하면 자동으로 빌드 및 배포가 이루어집니다.

## 6. 문제 해결

### particles.js 라이브러리 문제
외부 라이브러리(particles.js, tsParticles)를 사용하려 했으나, JavaScript 호환성 문제(strict mode)로 인해 오류가 발생했습니다:
```
Error initializing particles: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

### 개선 방안
외부 라이브러리 의존성을 제거하고 Canvas API를 활용한 직접 구현 방식으로 전환했습니다:
- JavaScript Canvas API를 사용한 파티클 시스템 직접 구현
- 브라우저 호환성 향상
- 로딩 시간 개선
- 커스터마이징 용이

## 7. 개발 진행 방법

### 일반 개발 흐름
1. `master` 브랜치에서 개발 작업 진행
2. 로컬에서 `npm run dev` 명령으로 개발 서버 실행 및 테스트
3. 작업 완료 후 `git add .` 및 `git commit -m "커밋 메시지"` 명령으로 변경사항 커밋
4. `git push origin master` 명령으로 GitHub에 푸시
5. GitHub Actions가 자동으로 빌드 및 배포 진행

### 배포 확인
GitHub 저장소의 "Actions" 탭에서 워크플로우 진행 상황을 확인할 수 있으며, 배포가 완료되면 https://securil.github.io/Sera_IR/ 주소에서 웹사이트를 확인할 수 있습니다.

## 8. 참고사항

- 베이스 경로 문제가 발생하지 않도록 항상 경로에 `import.meta.env.BASE_URL`을 사용
- 개발 환경(localhost)과 배포 환경(GitHub Pages)의 화면 크기 차이로 인해 반응형 디자인이 다르게 보일 수 있음
- 모바일 뷰는 768px 미만 화면에서 표시됨
- 추가적인 콘텐츠 섹션은 향후 업데이트 예정
