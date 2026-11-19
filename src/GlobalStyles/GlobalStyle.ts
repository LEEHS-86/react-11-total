import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Pretendard', sans-serif;
        background: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.text};
        transition: background 0.3s, color 0.3s;
    }

    a {
        text-decoration: none;
        color: #8015da;
    }
`;

export default GlobalStyle;
