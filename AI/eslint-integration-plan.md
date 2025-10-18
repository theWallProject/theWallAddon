# ESLint Integration Plan - Incremental Implementation

## Project Stack

- Plasmo framework (browser extension)
- React 18.3.1 + TypeScript
- Chrome Extension Manifest V3
- Three.js + GSAP

---

## Phase 1: Basic ESLint (Commit 1)

**Goal**: Get ESLint running with minimal config

### Steps:

1. Install ESLint: `npm install eslint@9.37.0 --save-dev`
2. Create `.eslintrc.json` with basic browser config
3. Add `.eslintignore` for build folders
4. Add `"lint": "eslint . --ext .ts,.tsx,.js,.jsx"` to package.json
5. Test: `npm run lint`

**Commit**: `feat: add basic ESLint configuration`

---

## Phase 2: TypeScript Support (Commit 2) ✅

**Goal**: Add TypeScript linting

### Steps:

1. ✅ Install: `npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev`
2. ✅ Update `eslint.config.js` to use TypeScript parser
3. ✅ Add `@typescript-eslint/recommended` rules
4. ✅ Test: `npm run lint`
5. ✅ Fix build file ignoring issue
6. ✅ Remove all unused variables carefully
7. ✅ Replace console statements with log functions
8. ✅ Fix async promise executor issue
9. ✅ Add proper TypeScript error descriptions
10. ✅ Create image type declarations
11. ✅ Configure no-console exceptions for helpers and generate files
12. ✅ Add success message to lint command

**Commit**: `feat: add TypeScript ESLint support and fix all linting issues`

---

## Phase 3: React Support (Commit 3) ✅

**Goal**: Add React linting rules

### Steps:

1. ✅ Install: `npm install eslint-plugin-react eslint-plugin-react-hooks --save-dev`
2. ✅ Add React plugins to `eslint.config.js`
3. ✅ Add `react/recommended` and `react-hooks/recommended` rules
4. ✅ Configure React settings (version detection)
5. ✅ Disable overly strict rules for Three.js/React Three Fiber
6. ✅ Test: `npm run lint`

**Commit**: `feat: add React ESLint support`

---

## Phase 4: Import Management (Commit 4) ✅

**Goal**: Organize and validate imports

### Steps:

1. ✅ Install: `npm install eslint-plugin-import --save-dev`
2. ✅ Add import plugin to `eslint.config.js`
3. ✅ Add `import/order` rule for consistent import ordering
4. ✅ Add `import/no-duplicates` for duplicate imports
5. ✅ Configure import grouping and alphabetization
6. ✅ Fix import ordering issues automatically
7. ✅ Test: `npm run lint`

**Commit**: `feat: add import management ESLint rules`

---

## Phase 5: Browser Extension Support (Commit 5) ✅

**Goal**: Add WebExtension specific rules

### Steps:

1. ✅ Research browser extension ESLint plugins
2. ✅ Add custom browser extension security rules
3. ✅ Add Chrome API best practices rules
4. ✅ Configure stricter rules for background scripts
5. ✅ Add security restrictions (no eval, no Function constructor)
6. ✅ Add Manifest V3 migration warnings
7. ✅ Test: `npm run lint`

**Commit**: `feat: add WebExtension ESLint support`

---

## Phase 6: Git Hooks & Build Integration (Commit 6) ✅

**Goal**: Add Git hooks and integrate linting into build process

### Steps:

1. ✅ Install: `npm install husky lint-staged --save-dev`
2. ✅ Add linting to build command: `npm run lint && npm run pre-build && ...`
3. ✅ Configure lint-staged for pre-commit hooks
4. ✅ Create pre-commit hook with linting and type checking
5. ✅ Create pre-push hook with build validation
6. ✅ Fix TypeScript error in image sharing
7. ✅ Test: `npm run build` (includes linting)

**Commit**: `feat: add Git hooks and integrate linting into build process`

---

## Phase 7: Prettier Integration (Commit 7)

**Goal**: Integrate Prettier with ESLint

### Steps:

1. Install: `npm install eslint-plugin-prettier eslint-config-prettier --save-dev`
2. Add prettier plugin to `.eslintrc.json`
3. Add `"prettier"` to extends (last)
4. Add `"prettier/prettier": "error"` rule
5. Test: `npm run lint`

**Commit**: `feat: integrate Prettier with ESLint`

---

## Phase 7: Unused Imports Cleanup (Commit 7)

**Goal**: Auto-detect and remove unused imports

### Steps:

1. Install: `npm install eslint-plugin-unused-imports --save-dev`
2. Add unused-imports plugin to `.eslintrc.json`
3. Add `"unused-imports/no-unused-imports": "error"`
4. Disable default unused vars, use plugin version
5. Test: `npm run lint:fix`

**Commit**: `feat: add unused imports cleanup`

---

## Phase 8: Accessibility Support (Commit 8)

**Goal**: Add accessibility linting

### Steps:

1. Install: `npm install eslint-plugin-jsx-a11y --save-dev`
2. Add jsx-a11y plugin to `.eslintrc.json`
3. Add `plugin:jsx-a11y/recommended`
4. Test: `npm run lint`

**Commit**: `feat: add accessibility linting support`

---

## Phase 9: Pre-commit Hooks (Commit 9)

**Goal**: Auto-lint on commit

### Steps:

1. Install: `npm install husky lint-staged --save-dev`
2. Run: `npx husky init`
3. Create `.lintstagedrc.json` with ESLint rules
4. Update `.husky/pre-commit` to run lint-staged
5. Add `"prepare": "husky"` to package.json scripts
6. Test: Make a commit

**Commit**: `feat: add pre-commit hooks with lint-staged`

---

## Phase 10: VS Code Integration (Commit 10)

**Goal**: Better IDE experience

### Steps:

1. Create `.vscode/settings.json`
2. Add ESLint validation for TS/TSX files
3. Add auto-fix on save
4. Set Prettier as default formatter
5. Test: Open a file and verify ESLint works

**Commit**: `feat: add VS Code ESLint integration`

---

## Phase 11: Security Linting (Commit 11)

**Goal**: Add security-focused rules

### Steps:

1. Install: `npm install eslint-plugin-security --save-dev`
2. Add security plugin to `.eslintrc.json`
3. Add `plugin:security/recommended`
4. Test: `npm run lint`

**Commit**: `feat: add security linting rules`

---

## Phase 12: Performance Linting (Commit 12)

**Goal**: Add performance-focused rules

### Steps:

1. Install: `npm install eslint-plugin-react-perf --save-dev`
2. Add react-perf plugin to `.eslintrc.json`
3. Add performance rules for React components
4. Test: `npm run lint`

**Commit**: `feat: add performance linting rules`

---

## Phase 13: Final Integration (Commit 13)

**Goal**: Integrate into build process

### Steps:

1. Update pre-build script to include linting
2. Add overrides for specific files (background.ts, build folders)
3. Add `"lint:check": "eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0"`
4. Test: `npm run pre-build`

**Commit**: `feat: integrate ESLint into build process`

---

## Key Benefits of This Approach

✅ **Small commits** - Each phase is focused and manageable  
✅ **Testable** - Verify each step works before moving on  
✅ **Reversible** - Easy to rollback if issues arise  
✅ **Incremental** - Builds complexity gradually  
✅ **Working code** - Each commit maintains functionality

## Quick Start

Begin with Phase 1 and work through sequentially. Each phase should take 5-10 minutes to implement and test.

## Troubleshooting

- If a phase fails, fix the issue before proceeding
- Each phase builds on the previous one
- Test `npm run lint` after each phase
- Use `npm run lint:fix` to auto-fix issues when possible

---

**Next**: Start with Phase 1 and commit each step as you go!
