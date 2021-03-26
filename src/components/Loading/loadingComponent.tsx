import React from "react";
import styleLoading from "./loadingComponent.module.css";
import loading from "./../../assets/imgLoading/loading.gif"

const LoadingComponent: React.FC = () => {
    return (
        <div className={styleLoading.bgLoading}>
            <img src={loading} />
            {/* <img src="./assets.loading.gif" alt=""/> */}
            {/* <img src={require("./../../assets/loading.gif")} /> */}
        </div>
    )
}

export default LoadingComponent;