<?php

header("content-type:application/json; charset=utf-8");
require("MySQLi.php");

if (isset($_GET["user"])) {
    $user = $_GET["user"];
} else {
    http_response_code(400);
    die("Manca parametro utente");
}

if (isset($_GET["idMateria"])) {
    $idMateria = $_GET["idMateria"];
} else {
    http_response_code(400);
    die("Manca parametro materia");
}

$connection = openConnection();
$sql = "SELECT id,voto,data from voti WHERE matricola='$user' AND materia=$idMateria ORDER BY data ASC";
$data = eseguiQuery($connection, $sql);

http_response_code(200);
echo (json_encode($data));

?>