<?php

header("content-type:application/json; charset=utf-8");
require("MySQLi.php");

$connection = openConnection();

if (isset($_REQUEST["id"])) {
    $id = $connection->real_escape_string($_REQUEST["id"]);
} else {
    http_response_code(400);
    die("Manca parametro id");
}

if (isset($_REQUEST["motivazione"])) {
    $motivazione = $connection->real_escape_string($_REQUEST["motivazione"]);
} else {
    http_response_code(400);
    die("Manca parametro motivazione");
}

$sql = "UPDATE assenze SET motivazione='$motivazione', giustificato=1 WHERE id=$id";
$data = eseguiQuery($connection, $sql);

http_response_code(200);

$connection->close();

?>