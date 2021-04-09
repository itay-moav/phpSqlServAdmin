<?php namespace model\Import\CSV;

/**
 * Init the CSV looper, The connection, get table structure, run the batches of queries
 * @author itay
 * @date 2021-04-08
 */
class Main extends \Talis\Chain\aChainLink{
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process():\Talis\Chain\aChainLink{
        $payload = $this->Response->getPayload();
        dbgr('FIELDS',$payload->queryResult);
        return $this;
    }
    
}