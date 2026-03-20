import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      playwright,
      jsdoc,
    },
    rules: {
      "playwright/no-focused-test": "error",
      "playwright/no-skipped-test": "warn",
      "playwright/no-conditional-in-test": "error",
      "playwright/prefer-web-first-assertions": "warn",
      "jsdoc/require-jsdoc": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      semi: ["error", "always"],
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "no-unreachable": "error",
      "no-loop-func": "error",
      "no-dupe-else-if": "error",
      "no-empty-function": "error",
      "no-self-compare": "error",
      "no-throw-literal": "error",
      "no-console": "error",
      "no-debugger": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
