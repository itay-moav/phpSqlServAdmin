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
            tableList: []
        };
        if(state.databases.currentDatabase){
            ret.tableList = state.databases.tableList[state.databases.currentDatabase];
        }

        return ret;
    };
    const server        = useSelector(state => state.servers.currentServer);
    const database      = useSelector(dbSelector);
    const currentTable  = useSelector(state => state.ui.currentTable);
    
    return (  
        <ListGroup variant="flush" bsPrefix="table-list">
            {database.tableList.map(table=>{
            
                return (<ListGroup.Item key={table.name} active={currentTable === table.name}>
                            <Link to={`/server/${server}/database/${database.current}/table/${table.name}`}>
                            <i className="btn fa fa-table db-element-clickable" aria-hidden="true" onClick={()=>{
                                    dispatch(fetchTableFields(server,database.current,table.name));
                                    dispatch(UIActions.selectedTable(table.name));
                                }
                            }></i>
                            <span className="table-name db-element-clickable" onClick={()=>{
                                    dispatch(runQuery(server,database.current,`SELECT * FROM [${table.name}]`));
                                    dispatch(UIActions.selectedTable(table.name));
                                }
                            }>{table.name}</span>
                            </Link>
                        </ListGroup.Item>)
            }
        )}
        </ListGroup>
    );
}
 
export default DbTableMenu;