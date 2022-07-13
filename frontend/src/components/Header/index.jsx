import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import icongroupo from "../../assets/icon-left-font.png";
import StyledLink from '../../utils/style/Link-style';

const SyleImg = styled.img`
  height: 60px;
  @media screen and (max-width:420px){
    height:50px;
  }
`

const GlobalContainer = styled.nav`
  padding: 10px;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  background-color:${colors.tertiary};
  height:80px;
  padding:0px;
  `


function Header() {
  return (
    <GlobalContainer>
        <Link to="/">
      <SyleImg src={icongroupo} alt="" />
      </Link>
      <div>
        <StyledLink to="/register" $isFullLink>Inscription</StyledLink>
        <StyledLink to="/login" $isFullLink>Connexion</StyledLink>
      </div>
      </GlobalContainer>
  );
}
export default Header;
