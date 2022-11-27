<?php namespace model\Query\Command;

/**
 * Handles just select
 * 
 * @author itay
 * @date 2021-04-05
 */
class Select extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        $payload = $this->Response->getPayload();
        $query   = $this->params['query'];
        dbgr('QUERY',$query);
        $payload->queryResult = $this->conn->execute($query)->fetchAll();
        dbgr('QUERY RESULTS',$payload->queryResult);
        return $this;
    }
}