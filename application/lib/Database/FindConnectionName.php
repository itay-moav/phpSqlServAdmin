<?php namespace lib\Database;
/**
 * Finds the connection name and stores in in Context
 */
function FindConnectionName():\Closure{
    return function (\Talis\Message\Request $Request,\Talis\Message\Response $Response):void{
        $connection_name = $Request->get_param_or_fail(\ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME);
        dbgr('CONNECTION NAME SELECTED!',$connection_name);
        \Talis\TalisMain::$Context->resource(\ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME,$connection_name);
    };
}