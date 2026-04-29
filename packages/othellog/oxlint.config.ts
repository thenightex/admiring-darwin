import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    suspicious: "warn",
  },
  rules: {
    "typescript/no-explicit-any": "error",
    "eslint/no-console": ["error", { "allow": ["warn", "error"] }],
  },
});