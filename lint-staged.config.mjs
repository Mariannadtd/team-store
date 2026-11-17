export default {
  '*.{js,mjs,cjs,ts}': ['eslint --fix', 'prettier --write'],
  '*.css': ['stylelint --fix', 'prettier --write'],
  '*.{json,md,html,yml,yaml}': 'prettier --write',
};
