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
├── .gitignore          # Git 제외 파일 설정
├── .vscode             # VS Code 설정
├── astro.config.mjs    # Astro 설정 파일
├── node_modules        # 패키지 모듈
├── package.json        # 프로젝트 설정
├── package-lock.json   # 패키지 잠금 파일
├── public              # 정적 파일 디렉토리
├── README.md           # 프로젝트 설명서
├── setup-log.md        # 설정 로그 (이 파일)
├── src                 # 소스 코드
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
    "astro": "^5.7.11"
  },
  "devDependencies": {
    "gh-pages": "^6.1.1"
  }
}
```

### astro.config.mjs 설정
GitHub Pages 배포를 위한 site 및 base 경로 설정을 추가했습니다:

```javascript
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://securil.github.io',
  base: '/Sera_IR',
});
```

### 테스트 페이지 생성
`src/pages/index.astro` 파일을 다음과 같이 수정하여 테스트 페이지를 생성했습니다:

```astro
---
// 테스트용 인덱스 페이지
---

<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>세라 (SERA) - 테스트 페이지</title>
	<style>
		body {
			font-family: 'Pretendard', 'Apple SD Gothic Neo', sans-serif;
			background-color: #121212;
			color: #ffffff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100vh;
			margin: 0;
			padding: 0 20px;
			text-align: center;
		}
		h1 {
			font-size: 3rem;
			margin-bottom: 1rem;
			background: linear-gradient(45deg, #ff3e9d, #9d00ff);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		p {
			font-size: 1.2rem;
			max-width: 600px;
			margin: 0 auto 1.5rem;
			opacity: 0.8;
		}
	</style>
</head>
<body>
	<h1>SERA (세라)</h1>
	<p>GitHub Pages 테스트 페이지입니다.</p>
	<p>베이스 경로: {import.meta.env.BASE_URL}</p>
</body>
</html>
```

## 3. Git 설정 및 배포

### Git 저장소 설정
```bash
# GitHub 저장소 연결
git remote add origin https://github.com/securil/Sera_IR.git

# 변경사항 커밋
git add package.json astro.config.mjs src/pages/index.astro
git commit -m 'GitHub Pages 배포를 위한 설정 추가'
git push -u origin master
```

### 빌드 및 배포
```bash
# 빌드
npm run build

# GitHub Pages에 배포
npm run deploy
```

## 4. 배포 결과

- 웹사이트 URL: https://securil.github.io/Sera_IR/
- GitHub 저장소 브랜치:
  - `master`: 개발 코드 (소스 파일)
  - `gh-pages`: 배포된 빌드 파일 (dist 폴더의 내용)

## 5. 개발 진행 방법

1. `master` 브랜치에서 개발 작업 진행
2. 작업 완료 후 `git add .` 및 `git commit -m "커밋 메시지"` 명령으로 변경사항 커밋
3. `git push origin master` 명령으로 GitHub에 푸시
4. `npm run build && npm run deploy` 명령으로 빌드 및 배포

## 6. 참고사항

- 베이스 경로 문제가 발생하지 않도록 항상 경로에 `import.meta.env.BASE_URL`을 사용하거나, `/Sera_IR/`를 접두사로 추가
- 다국어 지원 설정은 향후 개발 단계에서 구현 예정
- 디자인 및 애니메이션 효과는 기획안에 따라 추가 예정
