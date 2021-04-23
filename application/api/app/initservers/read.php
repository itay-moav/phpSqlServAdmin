<?php namespace Api;
/**
 * Goes over the config file 
 * Get the list of server names and their DB list
 * 
 * @author itay
 *
 */
class AppInitserversRead extends \Talis\Chain\aFilteredValidatedChainLink{

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
        $databases = \app_env()['databases'];
        if(!isset($databases) || !$databases || count($databases) === 0){
            throw new \Exception('No configuration found');
        }
        
        $servers = [];
        foreach($databases as $database){
            unset($database['password']);
            if(!isset($servers[$database['server']])){
                $servers[$database['server']] = [];
            }
            $servers[$database['server']][$database['database']] = $database;
        }
        $payload->servers = $servers;
        if(count($servers) === 1){
            $payload->currentServer  = $database['server'];
            $payload->currentDatabse = $database['database'];
            \Talis\Corwin::$Context->resource('connection_name',$database['connection_name']);
            
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


