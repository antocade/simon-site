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
    font-family: Verdana, sans-serif;
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 5px;
    width: 30%;

    & h2 {
        text-align: center;
        margin-top: 0px;
        padding-top: 5px;
        padding-bottom: 30px;
    }

    & label {
        font-size: 14px;
        color: gray;
        margin-left: 4.5%;
    }

    & input {
        height: 40px;
        display: grid;
        margin: 5px auto 25px auto;
        width: 90%;
        border-radius: 3px;
        border: 1px solid gray;
        background-color: transparent;
        font-size: 18px;
    }

    & input:focus {
        outline: none;
        border-style: 1px solid;
        border-color: black;
    }

    & .modalSubmit {
        width: 30%;
        height: 45px;
        margin: auto;
        font-size: 24px;
        color: white;
        border-style: none;
        background-color: #13b934;
        border-radius: 5px;
    }

    & .modalSubmit:hover {
        cursor: pointer;
        background-color: #0fc246;
    }

    & .modalSwitch {
        color: blue;
    }

    & .modalSwitch:hover {
        cursor: pointer;
        text-decoration: underline;
    }
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

export { LoginModal, LoginContent, CloseBtn };