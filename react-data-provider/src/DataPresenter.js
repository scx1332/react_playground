import {useEffect, useState, useCallback, useReducer} from "react";
import dataProvider from "./DataProvider";

function DataPresenter(props) {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const handleDataProviderChange = function () {
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
                <h3>{props.name}</h3>
                <button onClick={props.onRemove}>Remove this presenter</button>
                <ul>
                    <li>number: {dataProvider.getCurrentNumber()}</li>
                    <li>square: {dataProvider.getNumberSquare()}</li>
                    <li>parity: {dataProvider.getIsEven() ? "even" : "odd"}</li>

                    <div>{JSON.stringify(dataProvider.getProviderProperties(), null, '  ')}</div>
                </ul>
            </div>
        </div>
    )
}
export default DataPresenter;