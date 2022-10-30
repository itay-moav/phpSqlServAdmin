<?php namespace lib\Database;

/**
 * 
 * @author itay
 *
 */
abstract class ChainWithConnection extends \Talis\Chain\aChainLink
{
    /**
     * @var iConnection
     */
    protected iConnection $conn;
    
    /**
     *
     * @param \Talis\Message\Request $Request
     * @param \Talis\Message\Response $Response
     * @param array<mixed> $params
     */
    public function __construct(\Talis\Message\Request $Request,\Talis\Message\Response $Response,array $params=[]){
        parent::__construct($Request, $Response,$params);
        $conn   = $this->Request->getBodyParam('CONN',null);
        $connection_name = \Talis\Corwin::$Context->resource(\ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME);
        if(!$conn && $connection_name !== \Talis\Context::NaN){ //There is no active connection, but we do have a connection name
            
            $env = app_env()[\ENVIRONMENT__DBCONNECTIONS][$connection_name];
            
            //sometimes the connections are on the server level, which allow view of several databases.
            //In such a case, I get the dbname param from the client so I:
            // 1. connect to the correct db and 2. do not need to add db name to queries Unless I want to.
            $dbname = $this->Request->getBodyParam(\URL_PARAMS__DATABASE_NAME,null);
            if($dbname && !isset($env[\ENVIRONMENT__DBCONNECTIONS__DATABASE])){
                $env[\ENVIRONMENT__DBCONNECTIONS__DATABASE] = $dbname;
            }
            
            if(isset(app_env()[\ENVIRONMENT__DBCONNECTIONS][$connection_name]['user_connection'])){//This is a tailored connection, uses proxy or some other starnge configuration
                $this->conn = $env['user_connection']($connection_name,$env,\ZimLogger\MainZim::$CurrentLogger);
            } else {
                $this->conn = new Connection($connection_name,$env,\ZimLogger\MainZim::$CurrentLogger);
            }
            $this->Request->addToBodyParams('CONN',$this->conn);
            
        } elseif($conn) {
            $this->conn = $conn;
        } else{
            throw new \Exception('Missing connection details');
        }
    }
}
