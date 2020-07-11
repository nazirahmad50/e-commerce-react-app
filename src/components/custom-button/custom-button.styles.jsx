import styled, { css } from "styled-components";

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`

const isInvertedButtonStyles = css`
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover{
      background-color: black;
      color: white;
      border: none;
    }
`;

const isGoogleSignInStyles = css`
    background-color: #4285f4;
    color: white;

    &:hover{
      background-color:#357ae8; 
    }
`;

// return different styles depending on the props
const getButtonStyled = props =>{
    if (props.isGoogleSignIn) return isGoogleSignInStyles;

    // if not inverted return the regular button styles 
    return props.isInverted ? isInvertedButtonStyles : buttonStyles
}

// styled componenets supports sass as well
export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getButtonStyled}
`;
