<?php namespace model\Query;

require_once(__DIR__ . '/CONSTANTS.php');

/**
 * Analyzes the query type and runs the appropriate 
 * command executioner.
 * 
 * @author itay
 * @date 2021-04-05
 */
class Run extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        $query   = trim($this->params['query'] ?? $this->Request->getBodyParamOrFail('query'));
        $payload = $this->Response->getPayload();
        $command = strtoupper(explode(' ', $query)[0]);
        $payload->command = $command;
        $payload->query = $query;
        $payload->queryResult = [];
        $payload->triggerRefresh = 0;//Trigger refresh = 1 will force the UI to reload the state/schemas of the sql server
        $payload->tables = []; //this list is populated if trigger refresh is activated, intercepted by uiSlice
        $payload->error = '';
        
        try{
            dbgn("switch command: {$command}");
            switch($command){
                case COMMAND__SELECT:
                    (new Command\Select($this->Request,$this->Response,['query'=>$query]))->process();
                    break;
    
                case COMMAND__INSERT:
                    (new Command\Insert($this->Request,$this->Response,['query'=>$query]))->process();
                    break;
                    
                case COMMAND__UPDATE:
                    (new Command\Update($this->Request,$this->Response,['query'=>$query]))->process();
                    break;
                    
                case COMMAND__DELETE:
                    (new Command\Delete($this->Request, $this->Response,['query'=>$query]))->process();
                    break;
                    
                case COMMAND__CREATE:
                    (new Command\Create($this->Request, $this->Response,['query'=>$query]))->process();
                    break;
                    
                case COMMAND__ALTER:
                    (new Command\Alter($this->Request, $this->Response,['query'=>$query]))->process();
                    break;
                    
                case COMMAND__DROP:
                    (new Command\Drop($this->Request, $this->Response,['query'=>$query]))->process();
                    break;
                    
                case COMMAND__SP:
                    (new Command\StoredProcedure($this->Request, $this->Response,['query'=>$query]))->process();
                    break;
                    
                default:
                    dbgr('QUERY OUT',$query);
                    //throw new \Exception('Query not supported yet');
                    (new Command\MixedQuery($this->Request, $this->Response,['query'=>$query]))->process();
                    break;
                
            }
        } catch (\PDOException $e){
            $payload->error = $e->getMessage();
            $payload->queryResult = 'error';
            return $this;
        }
        
        //If we need to refresh the UI with the list of tables (in case of a drop/create/alter statements)
        if($payload->triggerRefresh === 1){ //@phpstan-ignore-line The value is part of the payload and is being passed by ref to the specific query command classes and modified there
            $payload->tables  = $this->conn->execute('SELECT * from INFORMATION_SCHEMA.TABLES')->fetchAll();
            $payload->schemaWithNoTable = $this->conn->execute("
                SELECT s.name AS schema_name, 
                       s.schema_id,
                       u.name as schema_owner
                FROM 
                        sys.schemas s
                    JOIN sys.sysusers u
                        ON u.uid = s.principal_id
                    LEFT JOIN 
                       INFORMATION_SCHEMA.TABLES IST
                    ON s.name = IST.TABLE_SCHEMA
                WHERE IST.TABLE_SCHEMA IS NULL
                ORDER BY s.schema_id ASC
            ")->fetchAll();
        }
        return $this;
    }
}

