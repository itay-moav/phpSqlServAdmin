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
        $payload->queryResult = $this->conn->execute($payload->query)->fetchAll();
        return $this;
    }
}