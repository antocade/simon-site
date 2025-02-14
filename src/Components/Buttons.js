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

const tabTheme = {
    blue: {
        inactive: "#0065fc",
        active: "#448efc"
    },
}

// -- Generic Button -- //
const GenBtn = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    padding: 5px 10px;
    &:hover {
        background-color: ${(props) => theme[props.theme].hover};
    };`

GenBtn.defaultProps = {
    theme: "blue",
}
// -- -- //

// -- Tab Buttons -- //
const TabContainer = styled.div`
    // overflow: hidden;
    background: #fff;
    font-family: Open Sans;
    height: 3em;
    width: 40%;
    margin: auto;
    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: center;
    column-gap: 0px;`

const Tab = styled.div`
    border: none;
    outline: none;
    cursor: pointer;
    width: 100px;
    position: relative;
    text-align: center;

    font-size: 1em;
    background-color: ${(props) => (props.activeTab ? tabTheme[props.theme].inactive : tabTheme[props.theme].active)};
    transition: background-color 0.5s ease-in-out;

    &:hover {
    opacity: 0.8;
    }`

Tab.defaultProps = {
    theme: "blue",
}
// -- -- //

export { GenBtn, TabContainer, Tab };