import {createAction} from "@reduxjs/toolkit";
import {ServersActions} from "./servers";
import {DatabasesActions} from "./databases";
import {QueryActions} from "./query";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

export const appInitServers = () => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: '/app/initservers',
            method: 'get',
            onSuccess: ServersActions.loaded.type
        })
    );
};

export const appInitDatabase = (serverName,databaseName) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: '/app/initdatabase/servername/' + serverName + '/databasename/' + databaseName,
            method: 'get',
            onSuccess:  [
                QueryActions.queryRan.type,
                DatabasesActions.selected.type
            ]
        })
    );
};

export const fetchTableFields = (serverName,databaseName,tableName) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `/tables/fields/servername/${serverName}/databasename/${databaseName}/table/${tableName}`,
            method: 'get',
            onSuccess: [
                QueryActions.queryRan.type,
                QueryActions.resultsLoaded.type
            ]
        })
    );
};

export const runQuery = (serverName,databaseName,query) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `/query/run/servername/${serverName}/databasename/${databaseName}`,
            method: 'post',
            body: {params:{query}},
            onSuccess: [
                QueryActions.queryRan.type,
                QueryActions.resultsLoaded.type,
                DatabasesActions.schemaModified.type
            ]
        })
    );
};
