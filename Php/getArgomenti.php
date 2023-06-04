<?php

header("content-type:application/json; charset=utf-8");
require("MySQLi.php");

if (isset($_GET["classe"])) {
    $classe = $_GET["classe"];
} else {
    http_response_code(400);
    die("Manca parametro classe");
}

$connection = openConnection();
$sql = "SELECT data,materia,argomento from argomenti WHERE classe='$classe' ORDER BY data ASC";
$data = eseguiQuery($connection, $sql);

http_response_code(200);
echo (json_encode($data));

$connection->close();

?>