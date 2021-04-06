<?php namespace Api;
class TalisPingRead extends \Talis\Chain\aFilteredValidatedChainLink{
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [Pong::class,[]]
        ];
    }
}




class Pong extends \Talis\Chain\aChainLink implements \Talis\commons\iRenderable{
    public function process():\Talis\Chain\aChainLink{
        $this->Response->setMessage('PONG ... PING PONG!');
        $this->Response->setStatus(new \Talis\Message\Status\Code200);
        $this->Response->markResponse();
        return $this;
    }
    
    /**
     *
     * {@inheritDoc}
     * @see \Talis\commons\iRenderable::render()
     */
    public function render(\Talis\commons\iEmitter $emitter):void{
        \dbgn($this->Request->getUri() . ' PONG !');
        $emitter->emit($this->Response);
    }
}