/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  bracketSpacing: true,
  semi: false,
  trailingComma: 'es5',
  arrowParens: 'always',
  endOfLine: 'auto',

  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      files: '*.mdx',
      options: {
        printWidth: 80,
      },
    },
  ],
}
