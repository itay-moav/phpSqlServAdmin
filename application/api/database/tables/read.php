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
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}
