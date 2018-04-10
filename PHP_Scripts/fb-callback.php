require_once __Dir__ . '/vendor/autoload.php'

$fb = new Facebook\Facebook([
  'app_id' => '{216008415822363}',
  'app_secret' => '{app-secret}',
  'default_graph_version' => 'v2.2',
  ]);


$helper = $fb->getRedirectLoginHelper();

try
{
	$accessToken = $helper->getAccessToken();


}
catch(Facebook\Exceptions\FaebookSDKException $e)
{
	echo 'Facebook SDK returned an error: ' . $e->getMessage();
  	exit;
}

echo '<h3>Access Token </h3>'
var_dump($accessToken->getValue());

$oAuth2Client = $fb->getOAuth2Client();

$tokenMetadata = $oAth2Client->debugToken($accessToken);

echo '<h3>Metadata</h3>';

var_dump($tokenMetadata);

$tokenMetadata->validateExpiration();

if(! $accessToken->isLongLived())
{
	try
	{
		$accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
	}
	catch(Facebook\Exceptions\FacebookSDKException $e)
	{
		echo "<p> Error getting long-lived access token:" . $helper->getMessage() . "</p>\n\n";
		exit;
	}

	echo '<h3>Long-lived</h3>';
	var_dump($accessToken->getValue());
}

$_SESSION['fb_access_token'] = (string) $accessToken;