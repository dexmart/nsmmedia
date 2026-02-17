<?php
// CORS Proxy for football-data.org API
// Place this file at the root of your shared hosting

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$API_KEY = 'c205c3b938f14c1c923907affffc7f3b';
$BASE_URL = 'https://api.football-data.org/v4';

// Get the endpoint from query parameter
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

if (empty($endpoint)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing endpoint parameter']);
    exit;
}

// Build the full URL with all query params except 'endpoint'
$params = $_GET;
unset($params['endpoint']);
$query_string = http_build_query($params);
$url = $BASE_URL . $endpoint . ($query_string ? '?' . $query_string : '');

// Make the API request server-side
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => [
        'X-Auth-Token: ' . $API_KEY
    ]
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(502);
    echo json_encode(['error' => 'Proxy request failed', 'details' => $error]);
    exit;
}

http_response_code($httpCode);
echo $response;
?>
