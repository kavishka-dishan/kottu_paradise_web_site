<?php

$servername = "fdb29.awardspace.net"; // Change if not localhost
$username = "4566387_kottuparadsie"; // Update with your MySQL username
$password = "paradise2009#4"; // Add your MySQL password
$dbname = "4566387_kottuparadsie"; // Ensure this matches your database name

// Create a connection

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
