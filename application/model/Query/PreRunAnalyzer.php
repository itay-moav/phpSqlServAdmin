<?php namespace model\Query;


//ON HOLD https://stackoverflow.com/questions/74423340/catch-sqlsrv-execution-plan-with-php
/**
 * Does a dry run against the server to see if we have syntax errors or
 * other issues compiler can find
 * 
 * @author itay
 * @date 2022-11-13
 */
class PreRunAnalyzer extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        //Doing only queries coming from client, Otherwise, I skip this step
        $query = $this->Request->getBodyParam('query',null);
        if(!$query){
            dbgn('NO ANALYZE ON VULCAN GENERATED QUERIES');
            return $this;
        }
        $payload = $this->Response->getPayload();
        $payload->error = '';
                          
        try{
            $this->conn->execute('SET SHOWPLAN_ALL ON');
            (new Command\Select($this->Request, $this->Response,['query'=>$query]))->process();
            
        } catch (\PDOException $e){
            $payload->error = $e->getMessage();
            $payload->queryResult = 'error';
            return $this;
        }
        return $this;
    }
}

