<?php
include 'db.php';

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$rollno = $_POST['rollno'];
$password = $_POST['password'];
$cpassword = $_POST['cpassword'];
$contact = $_POST['contact'];

if (empty($firstname) || empty($lastname) || empty($rollno) || empty($password) || empty($cpassword) || empty($contact)) {
    echo "All fields are required";
    exit();
}

if ($password != $cpassword) {
    echo "Passwords do not match";
    exit();
}

if (!preg_match("/^[0-9]{10}$/", $contact)) {
    echo "Invalid contact number";
    exit();
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO students (firstname, lastname, rollno, password, contact)
        VALUES ('$firstname', '$lastname', '$rollno', '$hashedPassword', '$contact')";

if (mysqli_query($conn, $sql)) {
    echo "Student inserted successfully.<br><a href='index.php'>Go Back</a>";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>