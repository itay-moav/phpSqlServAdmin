import { useNavigate } from "react-router-dom";
import { runQuery } from "../../../../store/querySlice";

export default function useRunSearch(dispatch,connectionName,server,database,schema,table){

    return data=>{
        console.log('SEARCHING WITH',data);
        const where = translateDataToValueOperatorPairs(data);
        const query = `SELECT * FROM ${schema}.${table} ${where}`;
        const payload={ connectionName,server,database,query};
        dispatch(runQuery(payload));
    }
}


function translateDataToValueOperatorPairs(rawData){
    let sql="";
    let sqlAnd = "";
    const columns = Object.keys(rawData);
    for(let i=0;i<columns.length;i++){
        if(columns[i].includes('value-')){
            const operatorName = rawData[columns[i].replace('value-','operator-')];
                
            if(rawData[columns[i]].length>0 || operatorName === 'ISNULL' || operatorName === 'ISNOTNULL'){
                console.log('Calling operatios',operatorName);
                const columnName = columns[i].replace('value-','');
                const sqlCondition = Operators[operatorName](rawData[columns[i]]);
                sql += ` ${sqlAnd} ${columnName} ${sqlCondition} `;
                sqlAnd = " AND ";
            }
        }
    }

    if(sql.length>0){
        sql = ` WHERE ${sql}`;
    }
    return sql;
}

const Operators = {
    eq: value => ` ='${value}'`,
    gt: value => ` >'${value}'`,
    gteq: value => ` >='${value}'`,
    lt: value => ` <'${value}'`,
    lteq: value => ` <='${value}'`,
    noteq: value => ` <>'${value}'`,
    LIKE: value => ` LIKE '${value}'`,
    NOTLIKE: value => `NOT LIKE ='${value}'`,
    LIKEpp: value => ` LIKE '%${value}%'`,
    NOTLIKEpp: value => `NOT LIKE ='%${value}%'`,
    IN: value => ` IN (${value})`,
    NOTIN: value => ` NOT IN(${value})`,
    BETWEEN: value => ` BETWEEN '${value.replace(",","' AND '")}'`,
    NOTBETWEEN: value => ` NOT BETWEEN '${value.replace(",","' AND '")}'`,
    ISNULL: () => ` IS NULL`,
    ISNOTNULL: () => ` IS NOT NULL`
}
