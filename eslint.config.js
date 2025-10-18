import js from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"

export default [
  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "dist/**",
      ".plasmo/**",
      "*.min.js",
      "**/*.d.ts",
      "**/*.css.d.ts",
      "build-scripts/**"
    ]
  },
  // Main configuration
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}", "TRANSLATIONS/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        browser: true,
        chrome: true,
        window: true,
        document: true,
        console: true,
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
        requestAnimationFrame: true,
        cancelAnimationFrame: true,
        fetch: true,
        URL: true,
        HTMLCanvasElement: true,
        HTMLButtonElement: true,
        HTMLDivElement: true,
        Image: true,
        File: true,
        navigator: true,
        location: true,
        WebSocket: true,
        MessageChannel: true,
        performance: true,
        atob: true,
        btoa: true,
        NodeJS: true,
        MouseEvent: true
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error"
    }
  },
  {
    files: ["src/helpers.ts"],
    rules: {
      "no-console": "off"
    }
  },
  {
    files: ["TRANSLATIONS/generate.ts"],
    rules: {
      "no-console": "off"
    }
  }
]
