<?php namespace Api;
/**
 * Goes over the config file 
 * Get the list of server names and their DB list
 * 
 * @author itay
 *
 */
class ServersAvailableRead extends \Talis\Chain\aFilteredValidatedChainLink{

    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [GetServers::class,[]],
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}

/**
 * 
 * @author itay
 *
 */
class GetServers extends \Talis\Chain\aChainLink
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process():\Talis\Chain\aChainLink{
        $payload = $this->Response->getPayload();
        $db_connections = \app_env()[\ENVIRONMENT__DBCONNECTIONS];
        if(!isset($db_connections) || !$db_connections || count($db_connections) === 0){
            throw new \Exception('No configuration found [' . \ENVIRONMENT__DBCONNECTIONS .']');
        }
        
        $servers = [];
        foreach($db_connections as $db_conn){
            unset($db_conn['password']);
            unset($db_conn['port']);
            
            //first time - init the server databases list to an empty array
            if(!isset($servers[$db_conn[\ENVIRONMENT__DBCONNECTIONS__SERVER]])){
                $servers[$db_conn[\ENVIRONMENT__DBCONNECTIONS__SERVER]] = $db_conn;
                $servers[$db_conn[\ENVIRONMENT__DBCONNECTIONS__SERVER]][\TREE_NODES__DATABASES] = [];
            }
            
            //some connection are on the database level (handled here).
            if(isset($db_conn[\ENVIRONMENT__DBCONNECTIONS__DATABASE])){
                $servers[$db_conn[\ENVIRONMENT__DBCONNECTIONS__SERVER]][\TREE_NODES__DATABASES][$db_conn[\ENVIRONMENT__DBCONNECTIONS__DATABASE]] = $db_conn;
            }
        }
        
        $payload->servers = $servers;
        return $this;
    }
}

//SELECT * FROM sys.dm_os_sys_info;
//SELECT * FROM sys.tables
//SELECT hostname, loginame, cmd FROM sys.sysprocesses
//select * from sys.configurations
//EXEC sp_tables


