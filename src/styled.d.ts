import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bg: string;
        headerBg: string;
        cardBg: string;
        text: string;
        subText: string;
        primary: string;
        primaryBg: string;
        hover: string;
    }
}
