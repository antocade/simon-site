import styled from 'styled-components';

const LoginModal = styled.div`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgb(0,0,0,0.4);
   `
const LoginContent = styled.div`
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 5px;
    width: 30%;
`

const CloseBtn = styled.span`
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;

        &:hover,
        &:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
`

const SignupModal = styled.div`
    `


export { LoginModal, LoginContent, CloseBtn, SignupModal };