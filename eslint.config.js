import js from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"
import importPlugin from "eslint-plugin-import"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"

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
      "@typescript-eslint": tseslint,
      react: react,
      "react-hooks": reactHooks,
      import: importPlugin
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      "react-hooks/refs": "off",
      "react-hooks/purity": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      "import/no-unresolved": "off",
      "import/no-duplicates": "error",
      // Browser Extension specific rules
      "no-restricted-globals": [
        "error",
        {
          name: "alert",
          message:
            "Use console.log or custom logging instead of alert() in browser extensions"
        }
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.name='eval']",
          message:
            "eval() is not allowed in browser extensions for security reasons"
        },
        {
          selector: "CallExpression[callee.name='Function']",
          message:
            "Function constructor is not allowed in browser extensions for security reasons"
        },
        {
          selector:
            "CallExpression[callee.object.name='chrome'][callee.property.name='tabs'][callee.property.name='executeScript']",
          message:
            "Consider using chrome.scripting.executeScript instead of chrome.tabs.executeScript (Manifest V3)"
        }
      ]
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
  },
  {
    files: ["src/ui/TextScramble.tsx"],
    rules: {
      "react-hooks/exhaustive-deps": "off"
    }
  }
]
