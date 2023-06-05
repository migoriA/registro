<?php

header("content-type:application/json; charset=utf-8");
require("MySQLi.php");

$connection = openConnection();

if (isset($_REQUEST["matricola"])) {
    $matricola = $connection->real_escape_string($_REQUEST["matricola"]);
} else {
    http_response_code(400);
    die("Manca parametro matricola");
}

if (isset($_REQUEST["materia"])) {
    $materia = $connection->real_escape_string($_REQUEST["materia"]);
} else {
    http_response_code(400);
    die("Manca parametro materia");
}

if (isset($_REQUEST["voto"])) {
    $voto = $connection->real_escape_string($_REQUEST["voto"]);
} else {
    http_response_code(400);
    die("Manca parametro voto");
}

$sql = "INSERT INTO voti (matricola, materia, voto) VALUES ($matricola, '$materia', $voto)";
$data = eseguiQuery($connection, $sql);

http_response_code(200);

$connection->close();

?>