<?php namespace model\Query\Command;

/**
 * Drop table Drop View etc
 * 
 * @author itay
 * @date 2021-04-12
 */
class Drop extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        dbgn('IN DROP');
        $payload = $this->Response->getPayload();
        $this->conn->execute($payload->query);
        $payload->triggerRefresh = 1;
        return $this;
    }
}
