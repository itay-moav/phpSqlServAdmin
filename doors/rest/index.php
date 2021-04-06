<?php
require_once '../../config/bootstrap.php';
(new \Talis\Doors\Rest)->gogogo(app_env()['paths']['root_uri']);