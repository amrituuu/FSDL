<?php
include 'db.php';

$rollno = $_POST['rollno'];
$contact = $_POST['contact'];

if (!preg_match("/^[0-9]{10}$/", $contact)) {
    echo "Invalid contact number.<br><a href='index.php'>Go Back</a>";
    exit();
}

$sql = "UPDATE students SET contact='$contact' WHERE rollno='$rollno'";

if (mysqli_query($conn, $sql)) {
    if (mysqli_affected_rows($conn) > 0) {
        echo "Student contact updated successfully.<br><a href='index.php'>Go Back</a>";
    } else {
        echo "No student found with this Roll No.<br><a href='index.php'>Go Back</a>";
    }
} else {
    echo "Error: " . mysqli_error($conn);
}
?>