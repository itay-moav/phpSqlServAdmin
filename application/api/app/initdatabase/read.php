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
            [GetServers::class,[]],
            [\model\Query\Run::class,['query' => 'select * from sys.tables']], //fetches all tables in db  
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
        $servers = [];
        //remove passwords
        foreach($databases as $database){
            unset($database['password']);
            if(!isset($servers[$database['server']])){
                $servers[$database['server']] = [];
            }
            $servers[$database['server']][] = $database;
        }
        $payload->servers = $servers;
        if(count($servers) === 1){
            $payload->currentServer  = $database['server'];
            $payload->currentDatabse = $database['database'];
            \Talis\Corwin::$Context->resource('connection_name',$database['connection_name']);
        } else {
            $payload->currentServer  = '';
            $payload->currentDatabse = '';
            \Talis\Corwin::$Context->resource('connection_name',null);
        }
        return $this;
    }
}

//SELECT * FROM sys.dm_os_sys_info;
//SELECT * FROM sys.tables
//SELECT hostname, loginame, cmd FROM sys.sysprocesses
//select * from sys.configurations
//EXEC sp_tables


