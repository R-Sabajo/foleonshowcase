import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root {
	--Dark-Blue: #001945;
	--Grey-Blue: #8E98AB;
	--Light-Grey: #F2F4F8;
	--Dark-Text: #001945;
}

*,
*::before,
*::after {

	box-sizing: border-box;
	padding:0;
	margin:0;
}

body {
	font-family: 'Proxima Nova';
	background-color: var(--Dark-Blue);
	color: #fff;
}
`;
