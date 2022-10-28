<?php namespace Api;
/**
 * Get's a list of databases in this server.
 * Handles a server level connection
 * 
 * @author itay
 * @date 2022-10-28
 *
 */
class ServersDatabasesRead extends \Talis\Chain\aFilteredValidatedChainLink{

    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\lib\Database\FindConnectionName(),[]],
            [\model\Query\Run::class,['query' => 'SELECT name FROM sys.databases']], //fetches all (with permission) databases in current connection
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}
