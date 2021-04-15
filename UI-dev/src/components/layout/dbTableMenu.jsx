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
            current: state.databases.current,
            tableList: []
        };
        if(state.databases.current){
            ret.tableList = state.databases.tableList[state.databases.current];
        }

        return ret;
    };
    const database      = useSelector(dbSelector)
    const currentTable  = useSelector(state => state.ui.currentTable);
    
    return (  
        <ListGroup variant="flush" bsPrefix="table-list">
            {database.tableList.map(table=>{
            
                return (<ListGroup.Item key={table.name} active={currentTable === table.name}>
                            <Link to={`/database/${database.current}/table/${table.name}`}>
                            <i className="btn fa fa-table db-element-clickable" aria-hidden="true" onClick={()=>{
                                    dispatch(UIActions.selectedTable(table.name));
                                    dispatch(fetchTableFields(table.name));
                                }
                            }></i>
                            <span className="table-name db-element-clickable" onClick={()=>{
                                    dispatch(UIActions.selectedTable(table.name));
                                    dispatch(runQuery(`SELECT * FROM [${table.name}]`));
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