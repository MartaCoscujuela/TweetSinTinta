<?php
session_start();
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
    define('CONSUMER_KEY', 'avk8Dbv4KAyzaKzmLFmwY53tu'); // add your app consumer key between single quotes
    define('CONSUMER_SECRET', 'EFEmmbwq4vrhS2gptnuE1JiasRY3ziUyAV8XrsJqu8xHAQH5ci'); // add your app consumer secret key between single quotes
    define('OAUTH_CALLBACK', 'callback.php'); // your app callback URL

	$access_token = $_SESSION['access_token'];
	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
    $statues = $connection->post("statuses/update", ["status" => $_POST["texto"]]);
    var_dump($statues);
 ?>