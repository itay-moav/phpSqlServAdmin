<?php namespace Api;

/**
 * Fetch init data for the dabases selected
 * 
 * @author itay
 *
 */
class AppInitdatabaseRead extends \Talis\Chain\aFilteredValidatedChainLink{

    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\lib\Database\FindConnectionName(),[]],
            [\model\Query\Run::class,['query' => 'EXEC sp_tables']], //fetches all tables in db  
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}
