<?php namespace model\Query\Command;

/**
 * Handles stored procedures
 * 
 * @author itay
 * @date 2021-04-06
 */
class StoredProcedure extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        //TODO Untill I figure it out, I handel stored procedures as SELECT
        $payload = $this->Response->getPayload();
        $payload->queryResult = $this->conn->execute($payload->query)->fetchAll();
        return $this;
    }
}