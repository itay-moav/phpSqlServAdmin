<?php namespace lib\Database;
/**
 * Finds the connection name and stores in in Context
 */
function FindConnectionName():\Closure{
    return function (\Talis\Message\Request $Request,\Talis\Message\Response $Response):void{
        $payload = $Response->getPayload();
        $server = $Request->get_param_or_fail('servername');
        $database = $Request->get_param_or_fail('databasename');
        $connection_name = '';
        foreach(app_env()['db-connections'] as $conn_name => $connections){
            if($server === $connections['server'] && $database === $connections['db-connections']){
                $connection_name = $conn_name;
                $payload->selectedServer   = $server;
                $payload->selectedDatabase = $database;
                break;
            }
        }
        dbgr('CONNECTION NAME SELECTED!',$connection_name);
        \Talis\Corwin::$Context->resource('connection_name',$connection_name);
    };
}