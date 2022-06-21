import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from './colors'

export const StyledLink = styled(Link)`
  padding: 35px 20px 35px 20px;
  margin:5px;
  color: #8186a0;
  text-decoration: none;
  font-size: 30px;
  text-align: center;
  ${(props) =>
    props.$isFullLink &&
    `color: white;
    background-color:#32374C; 
 `}
`
export default StyledLink