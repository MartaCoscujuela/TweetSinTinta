<?php
session_start();
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

unset($_SESSION['access_token']);
header('Location: index.php');
?>