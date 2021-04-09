<?php namespace Api;
class TablesDiscoveryRead extends \Talis\Chain\aFilteredValidatedChainLink{

    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\model\Query\Run::class,['query' => 'select * from sys.tables']], //fetches all tables in db
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}
