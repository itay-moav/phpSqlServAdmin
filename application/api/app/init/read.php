<?php namespace Api;
/**
 * 
 * @author itay
 *
 */
class AppInitRead extends \Talis\Chain\aFilteredValidatedChainLink{

    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [AddServerDetails::class,[]],
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
class AddServerDetails extends \Talis\Chain\aChainLink
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process():\Talis\Chain\aChainLink{
        $payload = $this->Response->getPayload();
        $databases = \app_env()['databases'];
        //remove passwords
        foreach($databases as &$database){
            unset($database['connection_name']);
            unset($database['password']);
        }
        $payload->servers = $databases;
        $payload->connectedTo = $database;//Notice no (s) at the end. This is the current connection, servers is the possible connections TODO should probably change the logic
        return $this;
    }
}

//SELECT * FROM sys.dm_os_sys_info;
//SELECT * FROM sys.tables
//SELECT hostname, loginame, cmd FROM sys.sysprocesses
//select * from sys.configurations


