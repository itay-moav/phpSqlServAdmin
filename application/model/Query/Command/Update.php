<?php namespace model\Query\Command;

/**
 * Handles just updates
 * 
 * @author itay
 * @date 2021-04-06
 */
class Update extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        $payload = $this->Response->getPayload();
        $run = $this->conn->execute($payload->query);
        $payload->queryResult = [[
            'rows updated'    => $run->numRows
        ]];
        return $this;
    }
}
