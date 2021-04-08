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
        $query   = trim($this->params['query'] ??  $this->Request->getBodyParamOrFail('query'));
        $payload = $this->Response->getPayload();
        $command = strtolower(explode(' ', $query)[0]);
        $payload->command = $command;
        $payload->query = $query;
        $payload->error = '';
        
        try{
            dbgn($command);
            switch($command){
                case COMMAND__SELECT:
                    (new Command\Select($this->Request,$this->Response))->process();
                    break;
    
                case COMMAND__INSERT:
                    (new Command\Insert($this->Request,$this->Response))->process();
                    break;
                    
                case COMMAND__UPDATE:
                    (new Command\Update($this->Request,$this->Response))->process();
                    break;
                    
                case COMMAND__DELETE:
                    (new Command\Delete($this->Request, $this->Response))->process();
                    break;
                    
                case COMMAND__SP:
                    (new Command\StoredProcedure($this->Request, $this->Response))->process();
                    break;
                    
                default:
                    dbgr('QUERY OUT',$query);
                    //throw new \Exception('Query not supported yet');
                    (new Command\StoredProcedure($this->Request, $this->Response))->process();
                    break;
                
            }
        } catch (\PDOException $e){
            $payload->error = $e->getMessage();
            $payload->queryResult = 'error';
        }
        return $this;
    }
}

