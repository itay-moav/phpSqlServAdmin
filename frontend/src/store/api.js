import { createAction } from "@reduxjs/toolkit";
import {DatabasesActions} from "./databases";
import {QueryActions} from "./query";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

export const appInit = () => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: '/app/init',
            method: 'get',
            onSuccess: DatabasesActions.loaded.type
        })
    );
};

export const fetchTableFields = (table_name) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: '/tables/fields/table/' + table_name,
            method: 'get',
            onSuccess: [
                QueryActions.queryRan.type,
                QueryActions.resultsLoaded.type
            ]
        })
    );
};

export const runQuery = (query) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: '/query/run',
            method: 'post',
            body: {params:{query}},
            onSuccess: [
                QueryActions.queryRan.type,
                QueryActions.resultsLoaded.type
            ]
        })
    );
};
