<?php
session_start();
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
define('CONSUMER_KEY', 'avk8Dbv4KAyzaKzmLFmwY53tu'); // add your app consumer key between single quotes
define('CONSUMER_SECRET', 'EFEmmbwq4vrhS2gptnuE1JiasRY3ziUyAV8XrsJqu8xHAQH5ci'); // add your app consumer secret key between single quotes
define('OAUTH_CALLBACK', 'callback.php'); // your app callback URL

if (!isset($_SESSION['access_token'])) {
	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
	$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));
	$_SESSION['oauth_token'] = $request_token['oauth_token'];
	$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
	$url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));
	header('Location: '.$url);
} else {
	$access_token = $_SESSION['access_token'];
	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
	$user = $connection->get("account/verify_credentials");
//	echo $user->screen_name;
	header('Location: index.php');
}