<?php namespace lib\Database;

class GetConnection extends \Talis\Chain\aChainLink
{
    public function process(): \Talis\Chain\aChainLink
    {
        $client = new Connection('amwell_sandbox',app_env()['databases']['amwell_sandbox'],\ZimLogger\MainZim::$CurrentLogger);
        $this->Request->addToBodyParams('CONN',$client);
        return $this;
    }
}
