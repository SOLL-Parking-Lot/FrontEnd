import classes from "./AppContainer.module.css";

// App Container Modal 전체 web App 크기 및 높이 설정
const AppContainer = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
};

export default AppContainer;