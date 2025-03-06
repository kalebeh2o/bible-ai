import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  ...compat.extends(
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Desabilita a verificação de 'any'
      "@typescript-eslint/explicit-module-boundary-types": "off", // Desabilita a verificação de tipos de retorno
      "react-hooks/exhaustive-deps": "off", // Avisa sobre dependências não verificadas no useEffect
      "react/no-unescaped-entities": "off", // Desabilita a verificação de entidades não escapadas
      "no-console": "off", // Avisa sobre o uso de console.log
      "no-unused-vars": "off", // Avisa sobre variáveis não utilizadas
      "import/order": [
        "off",
        {
          groups: [
            ["builtin", "external"], // Core e dependências externas primeiro
            ["internal"], // Importações internas do sistema e do projeto
            ["parent", "sibling", "index"], // Importações do projeto
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
];
