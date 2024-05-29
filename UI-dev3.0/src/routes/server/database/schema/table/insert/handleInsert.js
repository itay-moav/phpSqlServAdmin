export default function handleInsert(dispatch,connectionName,database,schema,table){
    console.log('homin');
    return data => {
        console.log('aaaaaaaaaa',data);
        const column_names = Object.keys(data);
        let sql = `INSERT INTO ${database}.${schema}.${table} (${column_names.join(",")}) \n`;
        sql += " VALUES (";
        let i=0;
        for(;i<column_names.length-1;i++){
            //TODO here be specific function for type int and type char
            sql += `\n'${data[column_names[i]]}',`;

        }
        sql += `\n'${data[column_names[i]]}'\n)`;//last one, no comma at end
        console.log('sssss',sql);
    }
}