import React from "react";
import {useSelector,useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import {fetchTableFields,runQuery} from "../../store/api";
import {UIActions} from "../../store/ui";

import './dbTableMenu.css';
const DbTableMenu = () => {
    const dispatch = useDispatch();
    //TODO create as a selector function in the proper place
    const dbSelector = state => {
        const ret = {
            current: state.databases.currentDatabase,
            tableList: [],
            tableOwnerList: []
        };
        if(state.databases.currentDatabase){
            ret.tableList = state.databases.tableList[state.databases.currentDatabase];
            ret.tableOwnerList = state.databases.tablesOwners[state.databases.currentDatabase];
        }

        return ret;
    };
    const server        = useSelector(state => state.servers.currentServer);
    const database      = useSelector(dbSelector);
    const currentTable  = useSelector(state => state.ui.currentTable);
    const displayedTableOwners = useSelector(state => state.ui.dbMenuSelectedTableOwners);
    
    if(displayedTableOwners.length === 0){
        dispatch(UIActions.dbMenuSelectedTableOwnersOpened('dbo'));
    }

    return (  
        <>{database.tableOwnerList.map(owner => ownerMenuItem(owner) )}</>
    );



/**
 */
function ownerMenuItem(owner){
    const show_table_list = displayedTableOwners.indexOf(owner) !== -1;
    const arrow = show_table_list ? 'fa-arrow-down' : 'fa-arrow-right';
    return (
        <ListGroup variant="flush" bsPrefix="table-list">
            <ListGroup.Item variant="primary" onClick={()=>{
                                    show_table_list ?
                                        dispatch(UIActions.dbMenuSelectedTableOwnersClosed(owner)) :
                                        dispatch(UIActions.dbMenuSelectedTableOwnersOpened(owner)); 
                                }
                            }>
                <i className={`btn fa ${arrow}`} aria-hidden="true"></i>
                <span className="table-name db-element-clickable">{owner}</span>
            </ListGroup.Item>
            {show_table_list && tablesByOwner(owner)}
        </ListGroup>
    );
}

/**
 */
function tablesByOwner(owner){
    return (  
        <>
            {database.tableList.map(table=>{
                if(table.TABLE_OWNER !== owner){
                    return null;
                } else {

                    return (<ListGroup.Item key={table.TABLE_NAME} active={currentTable === table.TABLE_NAME}>
                                <Link to={`/server/${server}/database/${database.current}/table/${table.TABLE_NAME}`}>
                                <i className="btn fa fa-table db-element-clickable" aria-hidden="true" onClick={()=>{
                                        dispatch(fetchTableFields(server,database.current,table.TABLE_NAME));
                                        dispatch(UIActions.selectedTable(table.TABLE_NAME));
                                    }
                                }></i>
                                <span className="table-name db-element-clickable" onClick={()=>{
                                        dispatch(runQuery(server,database.current,`SELECT * FROM [${table.TABLE_OWNER}].[${table.TABLE_NAME}]`));
                                        dispatch(UIActions.selectedTable(table.TABLE_NAME));
                                    }
                                }>{table.TABLE_NAME}</span>
                                </Link>
                            </ListGroup.Item>);
                    }
            }
        )}
        </>
    );
}


}
 
export default DbTableMenu;
