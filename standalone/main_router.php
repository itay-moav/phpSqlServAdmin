<?php
if(strpos($_SERVER["REQUEST_URI"],'/vulcan/server') === 0) {
    // serve the index.html
    readfile('./vulcan/index.html');
    exit;
}
if (strpos($_SERVER["REQUEST_URI"],'/vulcan') === 0) {
    return false;    // serve the requested resource as-is.
}
require_once '../config/bootstrap.php';

//IF you want all the API to be under a sub directory or a few level deep i.e. /api or /api/v0

// localhost:8000/api/talis/discovery
(new \Talis\Doors\Rest)->gogogo('/api');
