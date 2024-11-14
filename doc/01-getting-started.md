# 프로젝트 생성

## 명령

```
npm init -y
npm install next react react-dom @reduxjs/toolkit react-redux react-hook-form yup
npm install -D typescript @types/react @types/node @types/react-dom tailwindcss postcss autoprefixer
npm install classnames
npx tsc --init
npx tailwindcss init -p
mkdir -p src/{pages,components,store,styles,types}
```

## 파일 수정

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "incremental": true,
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "resolveJsonModule": true,
    "allowJs": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "skipLibCheck": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### `package.json`

```
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
```

# 앱 라우팅

## pages -> app

주요 변경 사항:

pages/_app.tsx = app/layout.tsx + app/providers.tsx
pages/index.tsx = app/page.tsx + HomeForm 컴포넌트

- 'use client' 지시문 = 클라이언트 컴포넌트 명시
- App Router 인덱스 페이지는 반드시 page.tsx 이름 (index.tsx 아님)
-

```
  app/
  ├── (shop)/                # URL에 영향을 주지 않는 그룹화
  │   ├── books/
  │   │   └── page.tsx      # /books
  │   └── authors/
  │       └── page.tsx      # /authors
  └── (marketing)/          
  └── about/
  └── page.tsx      # /about
```

권장하는 구조의 특징:

1. app/components/
   - 전역적으로 재사용되는 공통 컴포넌트
   - 여러 라우트에서 공유되는 UI 컴포넌트
   - 기본 폼, 레이아웃 컴포넌트 등

2. app/shop/components/
   - shop 기능에만 특화된 컴포넌트
   - 다른 라우트에서는 사용되지 않는 컴포넌트
   
3. app/shop/_components/
   - shop 내부에서만 사용되는 프라이빗 컴포넌트
   - 언더스코어(_)를 사용하여 라우팅에서 제외

이렇게 구성하면:
- 컴포넌트의 재사용성과 역할이 명확해짐
- 라우트별로 관련 컴포넌트를 구조화할 수 있음
- 컴포넌트 간의 의존성 관리가 용이함

## Next.js App Router의 특별 파일 이름들 (변경 불가):

layout.tsx
page.tsx
loading.tsx
error.tsx
not-found.tsx
route.tsx
template.tsx

# 배포

## 번들 분석기

npm install --save-dev @next/bundle-analyzer

`next.config.js`

```js
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
    })

const nextConfig = {
    reactStrictMode: true,
}

module.exports = withBundleAnalyzer(nextConfig)

//
//환경 변수 설정
//웹팩 설정 커스터마이징
//이미지 최적화 설정
//국제화(i18n) 설정
//리다이렉트/리라이트 설정
```

## pm2 배포

# shadcn/ui

npx shadcn@latest init
✔ Which style would you like to use? › Default
✔ Which color would you like to use as the base color? › Slate
✔ Would you like to use CSS variables for theming? … no / yes
