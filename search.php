<?php
include 'db.php';
?>

<!DOCTYPE html>
<html>
<head>
    <title>Search Students</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Student Records</h2>

<?php
if (isset($_POST['rollno']) && $_POST['rollno'] != "") {
    $rollno = $_POST['rollno'];
    $sql = "SELECT firstname, lastname, rollno, contact FROM students WHERE rollno='$rollno'";
} else {
    $sql = "SELECT firstname, lastname, rollno, contact FROM students";
}

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    echo "<table border='1' cellpadding='10'>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Roll No</th>
                <th>Contact</th>
            </tr>";

    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr>
                <td>{$row['firstname']}</td>
                <td>{$row['lastname']}</td>
                <td>{$row['rollno']}</td>
                <td>{$row['contact']}</td>
              </tr>";
    }

    echo "</table>";
} else {
    echo "No records found.";
}
?>

<br><br>
<a href="index.php">Go Back</a>

</body>
</html>