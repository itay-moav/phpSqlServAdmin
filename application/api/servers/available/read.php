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
        $db_connections = \app_env()[ENVIRONMENT__DBCONNECTIONS];
        if(!isset($db_connections) || !$db_connections || count($db_connections) === 0){
            throw new \Exception('No configuration found');
        }
        
        $servers = [];
        foreach($db_connections as $db_conn){
            unset($db_conn['password']);
        
            //first time - init the server databases list to an empty array
            if(!isset($servers[$db_conn['server']])){
                $servers[$db_conn['server']] = [];
            }
            
            //some connection are on the database level (handled here).
            if(isset($db_conn['database'])){
                $servers [$db_conn['server']] [$db_conn['database']] = $db_conn;
            }
        }
        
        $payload->servers = $servers;
        if(count($servers) === 1){
            $payload->currentServer  = $db_conn['server'];
            $payload->currentDatabse = $db_conn['database'];
            \Talis\Corwin::$Context->resource('connection_name',$db_conn['connection_name']);
            
            //Fetch database information TODO not sure client side can handle it
            (new \model\Query\Run($this->Request,$this->Response,['query' => 'select * from sys.tables']))->process();
            
        } else {
            $payload->currentServer  = '';
            $payload->currentDatabse = '';
            \Talis\Corwin::$Context->resource('connection_name',\Talis\Context::NaN);
        }
        return $this;
    }
}

//SELECT * FROM sys.dm_os_sys_info;
//SELECT * FROM sys.tables
//SELECT hostname, loginame, cmd FROM sys.sysprocesses
//select * from sys.configurations
//EXEC sp_tables


