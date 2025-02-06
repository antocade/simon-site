import styled from 'styled-components';

const theme = {
    blue: {
        default: "#0065fc",
        hover: "#448efc",
    },
    red: {
        default: "#fc1303",
        hover: "#fa5246"
    },
};

// -- Generic Button -- //
const Gen_Btn = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    padding: 5px 10px;
    &:hover {
        background-color: ${(props) => theme[props.theme].hover};
    };`

Gen_Btn.defaultProps = {
    theme: "blue",
}
// -- -- //


export { Gen_Btn };