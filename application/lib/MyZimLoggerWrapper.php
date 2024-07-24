<?php namespace lib;


class MyZimLoggerWrapper implements \Talis\commons\iLogger{
   
    /**
     * 
     */
    public function __construct(private \ZimLogger\Handlers\aLogHandler $logger){

    }

    /**
     *
     * @param mixed $inp : The piece you want to send the log. Make sure it isa datatype your logger can handle
     */
    public function debug(mixed $inp):void{
        $this->logger->debug($inp);
    }
    
    /**
     *
     * @param mixed $inp : The piece you want to send the log. Make sure it isa datatype your logger can handle
     * @param bool $full_stack : A boolean flag to tell the logger (if it has this capability, otherwise just send false) to add
     *                           some default stuff to the log entry (can be trace, some stats, SESSION etc)
     */
    public function info(mixed $inp,bool $full_stack):void{
        $this->logger->debug($inp,$full_stack);
    }
    
    /**
     *
     * @param mixed $inp : The piece you want to send the log. Make sure it isa datatype your logger can handle
     * @param bool $full_stack : A boolean flag to tell the logger (if it has this capability, otherwise just send false) to add
     *                           some default stuff to the log entry (can be trace, some stats, SESSION etc)
     */
    public function warning(mixed $inp,bool $full_stack):void{
        $this->logger->debug($inp,$full_stack);
    }
    
    /**
     *
     * @param mixed $inp : The piece you want to send the log. Make sure it isa datatype your logger can handle
     * @param bool $full_stack : A boolean flag to tell the logger (if it has this capability, otherwise just send false) to add
     *                           some default stuff to the log entry (can be trace, some stats, SESSION etc)
     */
    public function error(mixed $inp,bool $full_stack):void{
        $this->logger->debug($inp,$full_stack);
    }
    
    /**
     *
     * @param mixed $inp : The piece you want to send the log. Make sure it isa datatype your logger can handle
     * @param bool $full_stack : A boolean flag to tell the logger (if it has this capability, otherwise just send false) to add
     *                           some default stuff to the log entry (can be trace, some stats, SESSION etc)
     */
    public function fatal(mixed $inp,bool $full_stack):void{
        $this->logger->debug($inp,$full_stack);
    }   
}
