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
    font-family: Open Sans;
    height: 3em;
    width: 40%;
    margin: auto;
    padding-bottom: 10px;

    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: center;
    column-gap: 0px;`

const Tab = styled.div`
    border: 1.5px black solid;
    border-right: 0px;
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

const TabL = styled(Tab)`
    border-top-left-radius: 3.5px;
    border-bottom-left-radius: 3.5px;`

const TabR = styled(Tab)`
    border-top-right-radius: 3.5px;
    border-bottom-right-radius: 3.5px;
    border-right: 1.5px black solid;`

Tab.defaultProps = {
    theme: "blue",
}

TabL.defaultProps = {
    theme: "blue",
}

TabR.defaultProps = {
    theme: "blue",
}
// -- -- //

export { GenBtn, TabContainer, Tab, TabL, TabR };