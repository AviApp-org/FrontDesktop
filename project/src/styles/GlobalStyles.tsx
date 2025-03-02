import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --bg-primary: #f5f5f5;
    --bg-secondary: #ffffff;
    --text-primary: #333333;
    --text-secondary: #666666;
    --primary: #007bff;
    --primary-hover: #0056b3;
    --danger: #dc3545;
    --danger-hover: #c82333;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyles; 