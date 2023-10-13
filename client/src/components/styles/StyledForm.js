import styled from "styled-components";

export const StyledForm = styled.div`
display : flex;
flex-direction : column;
justify-content  : center;
align-items : center;
background-color : inherit;
height : 100vh;
width : 100%;
form {
    height : 60vh;
    display : flex;
    flex-direction  :column;
    justify-content : space-evenly;
    align-items : center;
    width :22rem;
    border-radius : 1rem;
    background-color : rgb(15,25,36);
    label {
        color : rgb(25,118,210);
    }
    input {
        color : white;
        outline : 1px solid rgb(25,118,210);
        &:focus {
            outline : none;
        }
    }
}
`