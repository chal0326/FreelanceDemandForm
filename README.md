# Freelance Isn't Free Payment Demand Letter

This template provides a streamlined setup for creating a payment demand letter for freelance services. It utilizes React, TypeScript, and Vite for a modern development experience, including Hot Module Replacement (HMR) and ESLint integration.

## Features

- User-friendly form to input client and project details.
- Automatic generation of a demand letter in text format.
- Local storage support to save and retrieve form data.
- Responsive design using Mantine UI components.

## Getting Started

To get started with the Freelance Isn't Free Payment Demand Letter template, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Form Fields

The form includes the following fields:

- Your Information:
  - Name
  - Street Address
  - City
  - State
  - ZIP Code
  - Email
  - Phone Number

- Client Information:
  - Hiring Party Name
  - Contact Name
  - Street Address
  - City
  - State
  - ZIP Code

- Project Details:
  - Start Date
  - Conclusion Date
  - Services Performed
  - Agreed Amount
  - Payment Due Date

- Additional Information:
  - Contract Exists
  - Contract Date (if applicable)
  - Additional Terms

## ESLint Configuration

For production applications, it is recommended to enhance the ESLint configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property in your ESLint configuration file:
  ```js
  export default tseslint.config({
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  });
  ```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
- Optionally add `...tseslint.configs.stylisticTypeChecked`.
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:
  ```js
  // eslint.config.js
  import react from 'eslint-plugin-react';

  export default tseslint.config({
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  });
  ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
