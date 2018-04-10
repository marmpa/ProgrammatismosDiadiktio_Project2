require_once __Dir__ . '/vendor/autoload.php'

$fb = new Facebook\Facebook([
    'app_id' => '{216008415822363}',
    'app_secret' => '{app-secret}',
    'default_graph_version' => 'v2.2',
    ]);
    
$helper = $fb->getRedirectLoginHelper();
$permissions = ['email'];
$loginUrl = $helper->getLoginUrl('https://example.com/fb-callback.php',$permissions);

echo '<a href="' . htemlspecialchars($loginUrl) .'"> Login with Facebook1</a>';