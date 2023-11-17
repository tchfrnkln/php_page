<?php
include "conn.php"; 

if (isset($_GET['ref'])) {
    $orderId = $_GET['ref'];

    // Update the 'paid' column to true for the specified order ID
    $sql = "UPDATE test SET paid = true WHERE reference = $ref";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.html");
        exit();
    } else {
        echo "Error updating record: " . $conn->error;
    }
} else {
    echo "Invalid request";
}

$conn->close();
?>
