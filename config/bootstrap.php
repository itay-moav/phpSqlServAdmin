<?php 
/**
 * This API system has no state, so far....
 *
 * @author Itay
 * @date 2017-04-05
 */
define('CORE_PATH', 		__DIR__ . '/..');
define('APP_PATH', 			CORE_PATH . '/application');
ini_set('include_path', '.' . PATH_SEPARATOR . APP_PATH);
require_once __DIR__ . '/config.php';

/**
 *
 * @return callable
 */
function getAutoloader(){
    /**
     * @param string $class
     * @throws \Talis\Exception\ClassNotFound
     */
    return function (string $class):void {
        $file_path = str_replace('\\','/',$class) . '.php';
        require_once $file_path;
    };
}

spl_autoload_register(getAutoloader(),true);
require_once __DIR__ . '/../vendor/autoload.php';
\ZimLogger\MainZim::include_shortcuts();

//Logger
\ZimLogger\MainZim::setGlobalLogger(
    app_env()['log']['name'],
    app_env()['log']['handler'],
    app_env()['log']['verbosity'],
    app_env()['log']['uri'],
    app_env()['log']['low_memory_footprint']
);

\Talis\Corwin::$APP_PATH = APP_PATH;



/*
//instantiate a connection to the DB
\SiTEL\DataSources\Sql\Factory::getConnectionMySQL('mysql_master',\app_env()['database']['mysql_master']);

//subscribe the sql debug function to the logger
$fn = fn()=>\SiTEL\DataSources\Sql\Factory::getDebugInfo();
\ZimLogger\MainZim::full_stack_subscribe_to_default($fn,'database');
*/
 

//Init function to run before starting the chains
/*
\Talis\Corwin::$registered_init_func = function(\Talis\Message\Request $Request){
};
*/