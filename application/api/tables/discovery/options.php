<?php namespace Api;
/**
 *
 * @author Itay Moav
 * @Date  20200406
 */
class TablesDiscoveryOptions extends \Talis\Chain\OptionsAllowed{
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\OptionsAllowed::allowed()
     */
    protected function allowed():string{
        return 'OPTIONS, GET';
    }
}
