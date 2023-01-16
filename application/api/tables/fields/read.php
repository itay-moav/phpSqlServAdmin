<?php namespace Api;
/**
 * Calls for the fields manipulating screen /table../fields
 * and is also needed when trying to inser into or update a table
 * It is stored in Redux on the client
 * 
 * @author itay
 *
 */
class TablesFieldsRead extends \Talis\Chain\aFilteredValidatedChainLink{
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\lib\Database\FindConnectionName(),[]],
            [FetchTableColumns::class,[]],
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}




class FetchTableColumns extends \Talis\Chain\aChainLink{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process():\Talis\Chain\aChainLink{
        $conn=$Request->getBodyParamExists('CONN');
        //col.TABLE_CATALOG AS [Database],
        //col.TABLE_SCHEMA AS Owner,
        //col.TABLE_NAME AS TableName,
        //col.DATETIME_PRECISION AS DatePrecision,
        $read_table_columns_sql="
        SELECT
                    
                col.COLUMN_NAME AS column_name,
                col.ORDINAL_POSITION AS ordinal_position,
                col.COLUMN_DEFAULT AS da_default,
                col.DATA_TYPE AS data_type,
                col.CHARACTER_MAXIMUM_LENGTH AS max_length,
                CAST(CASE col.IS_NULLABLE WHEN 'NO' THEN 0 ELSE 1 END AS bit) AS is_nullable,
                COLUMNPROPERTY(OBJECT_ID('[' + col.TABLE_SCHEMA + '].[' + col.TABLE_NAME + ']'), col.COLUMN_NAME, 'IsIdentity')AS is_identity,
                COLUMNPROPERTY(OBJECT_ID('[' + col.TABLE_SCHEMA + '].[' + col.TABLE_NAME + ']'), col.COLUMN_NAME, 'IsComputed')AS is_computed,
                CAST(ISNULL(pk.is_primary_key, 0) AS bit)AS is_primary_key,
                col.COLLATION_NAME AS collation_name
                    
                    
        FROM
                INFORMATION_SCHEMA.COLUMNS AS col
            LEFT JOIN
                (SELECT
                        SCHEMA_NAME(o.schema_id)AS TABLE_SCHEMA,
                        o.name AS TABLE_NAME,
                        c.name AS COLUMN_NAME,
                        i.is_primary_key
                 FROM sys.indexes AS i
                    JOIN
                        sys.index_columns AS ic
                    ON
                        i.object_id = ic.object_id AND i.index_id = ic.index_id
                    JOIN
                        sys.objects AS o
                    ON
                        i.object_id = o.object_id
                    LEFT JOIN
                        sys.columns AS c
                    ON
                        ic.object_id = c.object_id AND c.column_id = ic.column_id
                 WHERE
                        i.is_primary_key = 1) AS pk
            ON
                col.TABLE_NAME = pk.TABLE_NAME
                  AND col.TABLE_SCHEMA = pk.TABLE_SCHEMA
                  AND col.COLUMN_NAME = pk.COLUMN_NAME
                    
        WHERE
                col.TABLE_NAME = 'wormhole'
            AND
                col.TABLE_SCHEMA = 'wormholes'
        ORDER BY
            col.TABLE_NAME, col.ORDINAL_POSITION
                    
        ";
        
        $table_columns = $conn->execute($read_table_columns_sql)->fetchAll();
        
        return $this;
    }
}