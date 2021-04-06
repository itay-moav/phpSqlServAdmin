<?php namespace lib\Database;

abstract class ChainWithConnection extends \Talis\Chain\aChainLink
{
    /**
     * @var Connection
     */
    protected Connection $conn; 
    
    /**
     *
     * @param \Talis\Message\Request $Request
     * @param \Talis\Message\Response $Response
     * @param array<mixed> $params
     */
    public function __construct(\Talis\Message\Request $Request,\Talis\Message\Response $Response,array $params=[]){
        parent::__construct($Request, $Response,$params);
        $conn = $this->Request->getBodyParam('CONN',null);
        if(!$conn){
            $this->conn = new Connection('amwell_sandbox',app_env()['databases']['amwell_sandbox'],\ZimLogger\MainZim::$CurrentLogger);
            $this->Request->addToBodyParams('CONN',$this->conn);
        } else {
            $this->conn = $conn;
        }
    }
}
