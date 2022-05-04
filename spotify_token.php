<?php

define("CLIENT_ID", "bd8917b099ab4c19bf8d48c6211dfb64");
define("CLIENT_SECRET", "746dfc57019b4d69a702f409b15e1f52");

define("TOKEN_ENDPOINT", "https://accounts.spotify.com/api/token");

$token_payload = [
	"grant_type" => "client_credentials"
];

$headers = [
	"Authorization: Basic " . base64_encode(CLIENT_ID . ":" . CLIENT_SECRET)
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, TOKEN_ENDPOINT);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($token_payload));

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$token_response = curl_exec($ch);

$token_response = json_decode($token_response, true);

if ( isset($token_response["error"]) ) {
	$return = [
		"error" => true,
		"message" => $token_response['error_description']
	];
} else {
	$return = [
		"access_token" => $token_response['access_token']
	];

}

echo json_encode($return);

?>