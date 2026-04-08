<?php
include 'db.php';

$rollno = $_POST['rollno'];

$sql = "DELETE FROM students WHERE rollno='$rollno'";

if (mysqli_query($conn, $sql)) {
    if (mysqli_affected_rows($conn) > 0) {
        echo "Student deleted successfully.<br><a href='index.php'>Go Back</a>";
    } else {
        echo "No student found with this Roll No.<br><a href='index.php'>Go Back</a>";
    }
} else {
    echo "Error: " . mysqli_error($conn);
}
?>