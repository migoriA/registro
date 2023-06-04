<?php

header("content-type:application/json; charset=utf-8");
require("MySQLi.php");

if (isset($_GET["classe"])) {
    $classe = $_GET["classe"];
} else {
    http_response_code(400);
    die("Manca parametro materia");
}

$connection = openConnection();
$sql = "SELECT materie FROM classi WHERE nome='$classe'";
$data = eseguiQuery($connection, $sql);

http_response_code(200);
echo (json_encode($data[0]));

$connection->close();

?>