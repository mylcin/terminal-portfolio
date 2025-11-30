import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', '.contentlayer/**'],
  },
  {
    rules: {
      'react-hooks/static-components': 'off',
    },
  },
  ...nextConfig,
  prettierConfig,
];

export default eslintConfig;
