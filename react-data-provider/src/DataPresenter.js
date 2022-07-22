import {useEffect, useState, useCallback, useReducer} from "react";

import dataProvider from "./DataProvider";

const DataPresenter = () => {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const handleDataProviderChange = function () {
        console.log("handleDataProviderChange called");
        forceUpdate();
    };

    useEffect( () => {
        dataProvider.registerListener(handleDataProviderChange);
        return () => {
            dataProvider.unregisterListener(handleDataProviderChange);
        }
    }, []);

    return (
        <div>
            <div className="data_presenter">
                <ul>
                    <li>number: {dataProvider.getCurrentNumber()}</li>
                    <li>square: {dataProvider.getNumberSquare()}</li>
                    <li>parity: {dataProvider.getIsEven() ? "even" : "odd"}</li>
                </ul>
            </div>
        </div>
    )
}
export default DataPresenter;