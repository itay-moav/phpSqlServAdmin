<?php
echo "\nExports the PHP constants as a JS module to be used under UI-dev\n";
$looking_for=__DIR__ . '/../config/CONSTANTS.php';
$constants_file_content = file_get_contents($looking_for);
if(!$constants_file_content){
    throw new \Exception("Constant file [{$looking_for}] was not found");
}
$constants = str_replace('<?php',"\n",explode('//BACKEND ONLY',$constants_file_content)[0]);
$constants = str_replace('const','export const',$constants);
echo $constants;
$target_folder = __DIR__ . '/../UI-dev1.1/src/services';
file_put_contents("{$target_folder}/CONSTANTS.js", $constants);
