# README


## othellog
- nvm use ./ (https://github.com/nvm-sh/nvm)
- pnpm install (https://github.com/pnpm/pnpm)
- pnpm run build

## fnm - node
- mise vs fnm? nvm (https://github.com/nvm-sh/nvm) eig gut aber nicht auf windows
- (https://github.com/Schniz/fnm)
- winget install Schniz.fnm
- -> Usage with Cmder

## setup - node alternatives
- use form on (https://nodejs.org/en/download)

## setup
- node -v # Should print "v24.15.0"
- corepack enable pnpm
- pnpm -v

## todo
- migrate to oxlint+oxfmt? currently no template support for vue?
  - use oxlint together with eslint, speed vs coverage
- replicate package template with vue+css


# Lint oxlint + eslint

| Category     | Rule                           | Purpose                   |
|--------------|--------------------------------|---------------------------|
| Must Have    | complexity                     | Limit function complexity |
| Must Have    | no-nested-ternary              | Readable conditionals     |
| Must Have    | consistent-type-assertions     | No unsafe as casts        |
| Must Have    | no-restricted-syntax (enums)   | Use unions over enums     |
| Must Have    | no-restricted-syntax (else)    | Prefer early returns      |
| Must Have    | no-restricted-syntax (routes)  | Use named routes          |
| Must Have    | import-x/no-restricted-paths   | Feature isolation         |
| Must Have    | vue/no-unused-*                | Dead code detection       |
| Must Have    | @intlify/vue-i18n/no-raw-text  | i18n compliance           |
| Must Have    | no-restricted-disable          | No bypassing i18n         |
| Must Have    | no-restricted-imports          | Enforce test helpers      |
| Nice to Have | vue/define-props-destructuring | Vue 3.5 patterns          |
| Nice to Have | vue/max-template-depth         | Template readability      |
| Nice to Have | vitest/*                       | Test consistency          |
| Nice to Have | unicorn/*                      | Modern JavaScript         |
| Nice to Have | pnpm/recommended               | Catalog enforcement       |
| Custom       | composable-must-use-vue        | Composable validation     |
| Custom       | no-hardcoded-colors            | Theming support           |
| Custom       | no-let-in-describe             | Clean tests               |
| Custom       | extract-condition-variable     | Readable conditions       |
| Custom       | repository-trycatch            | Error handling            |

