<?php

header("content-type:application/json; charset=utf-8");
require("MySQLi.php");

if (isset($_GET["id"])) {
    $id = $_GET["id"];
} else {
    http_response_code(400);
    die("Manca parametro id");
}

$connection = openConnection();
$sql = "SELECT voto,data from voti WHERE materia='$id' ORDER BY data DESC";
$data = eseguiQuery($connection, $sql);

http_response_code(200);
echo(json_encode($data));

?>