import { Link } from "react-router-dom";
import styled from "styled-components";
import icongroupo from "../../assets/icon-left-font.png";

const SyleImg = styled.img`
  height: 70px;
`;

const GlobalContainer = styled.nav`
  padding: 15px;
  dispaly: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  return (
    <GlobalContainer>
        <Link to="/">
      <SyleImg src={icongroupo} alt="" />
      </Link>
      <div>
        <Link to="/register">Inscription</Link>
        <Link to="/login">Connexion</Link>
      </div>
    </GlobalContainer>
  );
}
export default Header;
