<?php namespace Api;

/**
 * Fetch init data for the dabases selected
 * 
 * @author itay
 *
 */
class DatabaseTablesRead extends \Talis\Chain\aFilteredValidatedChainLink{

    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\lib\Database\FindConnectionName(),[]],
            [\model\Query\Run::class,['query' => 'SELECT * from INFORMATION_SCHEMA.TABLES ORDER BY TABLE_SCHEMA ASC, TABLE_NAME ASC']], //fetches all table + views in db
            [loadNoTablesSchemas(),[]],
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}

/**
 * 
 * @return callable
 */
function loadNoTablesSchemas():callable{
    
    return function( \Talis\Message\Request $Request,\Talis\Message\Response $Response):void{
        $conn=$Request->getBodyParamExists('CONN');
        $Response->getPayload()->schemaWithNoTable = $conn->execute("
                SELECT s.name AS schema_name,
                       s.schema_id,
                       u.name as schema_owner
                FROM
                        sys.schemas s
                    JOIN sys.sysusers u
                        ON u.uid = s.principal_id
                    LEFT JOIN
                       INFORMATION_SCHEMA.TABLES IST
                    ON s.name = IST.TABLE_SCHEMA
                WHERE IST.TABLE_SCHEMA IS NULL
                ORDER BY s.schema_id ASC
            ")->fetchAll();
    };
}
