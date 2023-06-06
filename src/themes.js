
import styled from "styled-components"




export const Toggle = styled.div `
  color: ${props => props.theme.textColor};
  `

export const Page = styled.div `
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  transition: all .5s ease;
  `
export const WorkoutContainer = styled.div `
  background-color: ${props => props.theme.containerBackgroud};
  transition: all .3s ease;
  `
export const Form = styled.form `
  background-color: ${props => props.theme.containerBackgroud};
  transition: all .3s ease;
  `


export const LightTheme = {
     backgroundColor: 'white',
     textColor: 'black',
     containerBackgroud: '#ededed',
 }
export const DarkTheme = {
    backgroundColor: 'black',
    textColor: 'white',
    containerBackgroud: '#222629',
}

export const themes = {
    light: LightTheme,
    dark: DarkTheme,
}
