import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import angularPlugin from "@angular-eslint/eslint-plugin";
import angularTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import nxPlugin from "@nx/eslint-plugin";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  {
    ignores: ["node_modules", "dist", "build", ".angular"],
  },
  // ESLint JS recommended
  js.configs.recommended,
  // TypeScript ESLint recommended
  ...tseslint.configs.recommended,
  // TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@nx": nxPlugin,
      "unused-imports": unusedImportsPlugin,
      "@angular-eslint": angularPlugin,
    },
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["@frontend/**"],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-duplicate-imports": ["error"],
      "unused-imports/no-unused-imports": "error",
      "@angular-eslint/prefer-on-push-component-change-detection": "error",
    },
  },
  // Angular template files (component templates only)
  {
    files: ["**/*.html"],
    ignores: ["src/index.html"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint/template": angularTemplatePlugin,
    },
    rules: {},
  },
];

