<?php
require_once('../vendor/autoload.php');

$fb = new Facebook\Facebook([
    'app_id' => '216008415822363',
    'app_secret' => 'aba8ce5fc8dc5b0a72ccbec554e3f785',
    'default_graph_version' => 'v2.2',
    ]);
    
$helper = $fb->getRedirectLoginHelper();
$permissions = ['email'];
$loginUrl = $helper->getLoginUrl('http://localhost:8080/ProgrammatismosDiadiktio_Project2/html/login.html',$permissions);

echo '<a href="' . htmlspecialchars($loginUrl) .'"> Login with Facebook1</a>';
?>