# 1. Install next, react and react-dom

```
  npm install next react react-dom
```

Update script in package.json

```
  "scripts": {
    "dev": "node server.ts",
    "build": "next build",
    "start": "cross-env NODE_ENV=production node server.ts",
    "lint": "next lint"
  },
```

Create the `next.config.js` at root

# 2. Install Typescript

Create `tsconfig.json` file at root and install typescript and dependencies

```
  npm i typescript @types/react @types/node -D
```

# 3. Setup server and routing manually

Create the `server.js`, `routes.js` and `pages` at src directory

```
  npm i next-routes-extended -D
  npm i @babel/runtime
```

# 4. Setup ESLint

Create `.eslintrc.json` at root, install dependencies and add command `next lint` to script in package.json

**Note**:
The eslint-config-next `includes everything you need` to have an optimal out-of-the-box linting experience

```
  npm i eslint eslint-config-next -D
```

# 5. Setup Prettier

Create `.prettierrc.json` at root and install dependencies

```
  npm install prettier eslint-config-prettier -D
```
