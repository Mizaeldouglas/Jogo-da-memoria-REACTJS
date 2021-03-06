import styled from "styled-components";

type containerProps ={
	showBackGround:boolean;
	showColor:boolean;
}

export const Container = styled.div<containerProps>`
	background-color:  ${props => props.showBackGround ? 'yellow' : '#e2e3e3'};
	
	height: 100px;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

type IconProps = {
	opacity?: number;
}
export const Icon = styled.img<IconProps>`
	width: 40px;
	height: 40px;
	opacity: ${props => props.opacity ?? 1};
`;