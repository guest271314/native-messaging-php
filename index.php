#!/usr/bin/env php
<?php
function abort() {
  passthru("kill -9 " . getmypid());
}
register_shutdown_function("abort");
if ($_SERVER["REQUEST_METHOD"] == "HEAD") {
  abort();
}
if ($_SERVER["REQUEST_METHOD"] !== "HEAD" && $_SERVER["REQUEST_METHOD"] == "POST" && $_POST["command"]) {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, HEAD");
  header("Access-Control-Allow-Headers: Access-Control-Request-Private-Network");
  header("Access-Control-Allow-Private-Network: true");
  header("Content-Type: application/octet-stream");
  header("Vary: Origin");
  echo passthru($_POST["command"]);
} else {  
  // chrome.runtime.sendNativeMessage hangs without writing to client
  // https://stackoverflow.com/a/48443161
  $fp = fopen("php://stdout", "w");
  if ($fp) {
    // Send the length of data
    fwrite($fp, pack("L", 1));
    fwrite($fp, 1);
    fflush($fp);
    fclose($fp);
  }
  // blocks
  passthru("php -S localhost:8000"); 
}
