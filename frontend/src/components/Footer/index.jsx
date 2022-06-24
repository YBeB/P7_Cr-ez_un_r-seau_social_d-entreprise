import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import icongroupo from "../../assets/icon-left-font.png";
import StyledLink from '../../utils/style/Link-style';

const FooterStyle=styled.footer`
background-color:${colors.tertiary};
`

const LongFooter=styled.div`
display:flex;
justify-content: space-between;
width:50%
`
const ListStyle=styled.li`
list-style-type:none;
color:white;
${(props) =>
    props.$ListTitle &&
    `font-size:22px;
    font-weight:bold;
 `}
`



function Footer() {
    return (
        <FooterStyle>
            <LongFooter>
            <ul>
            <ListStyle $ListTitle>Général</ListStyle>
            <ListStyle>A Propos</ListStyle>
            <ListStyle>Conditions d'utilisations</ListStyle>
            <ListStyle>Politique de confidentialité</ListStyle>
            </ul>

            <ul>
            <ListStyle $ListTitle>Support</ListStyle>
            <ListStyle>F.A.Q</ListStyle>
            <ListStyle>Aide</ListStyle>
            <ListStyle>Contacter le support</ListStyle>
            </ul>
            </LongFooter>
        </FooterStyle>
    );
  }
  export default Footer