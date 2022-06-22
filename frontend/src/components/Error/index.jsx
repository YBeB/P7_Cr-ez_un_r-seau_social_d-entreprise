import styled from 'styled-components'
import colors from '../../utils/style/colors'
const ErrorBig=styled.h1`
font-family:Lato,sans-serif;
display:flex;
align-items:center;
justify-content:center;
height:120px;
font-size:42px;
color:${colors.tertiary}
`
const SubtitleError=styled.p`
display:flex;
align-items:center;
justify-content:center;
font-size:21px;
color:${colors.primary}

`






function Error(){
return (
 <div>
<ErrorBig>Erreur 404</ErrorBig>
<SubtitleError>La page que vous tentez de voir n'existe pas</SubtitleError>
 </div>
)

}
export default Error