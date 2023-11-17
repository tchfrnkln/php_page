<?php
include "conn.php"; 

// Form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$randomReference = substr(str_shuffle('012345678911121314151617181920'), 0, 20);

// SQL query to insert data into the 'users' table
$sql = "INSERT INTO test (name, email, phone, reference) VALUES ('$name', '$email', '$phone', '$randomReference')";

if ($conn->query($sql) === TRUE) {
    header("Location: index.html?paynow&email=" . urlencode($email) . "&reference=" . urlencode($randomReference));
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
