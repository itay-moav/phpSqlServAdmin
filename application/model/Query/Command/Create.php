<?php namespace model\Query\Command;

/**
 * Create table Create View etc
 * 
 * @author itay
 * @date 2021-04-12
 */
class Create extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        $payload = $this->Response->getPayload();
        $this->conn->execute($payload->query);
        $payload->triggerReferesh = 1;
        
        return $this;
    }
}
