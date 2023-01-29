import { useNavigate } from "react-router-dom";
import { runQuery } from "../../../../store/querySlice";

export default function useRunSearch(dispatch,connectionName,server,database,schema,table){

    return data=>{
        console.log('SEARCHING WITH',data);
        let query = `SELECT * FROM ${schema}.${table}`;
        let where = "";
        let operator = "=";
        let AND="";

        const columns = Object.keys(data);
        for(let i=0;i<columns.length;i++){
            if(data[columns[i]].length>0){
                where += ` ${AND} ${columns[i]} ${operator} '${data[columns[i]]}' `;
                AND = " AND ";
            }
        }
        if(where.length>0){
            query = `${query} WHERE ${where}`;
        }

        const payload={ connectionName,server,database,query};
        dispatch(runQuery(payload));
    }
}
