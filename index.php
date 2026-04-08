<!DOCTYPE html>
<html>
<head>
    <title>Student Registration CRUD</title>
    <link rel="stylesheet" href="style.css">
    <script>
        function validateForm() {
            let fname = document.forms["studentForm"]["firstname"].value;
            let lname = document.forms["studentForm"]["lastname"].value;
            let rollno = document.forms["studentForm"]["rollno"].value;
            let password = document.forms["studentForm"]["password"].value;
            let cpassword = document.forms["studentForm"]["cpassword"].value;
            let contact = document.forms["studentForm"]["contact"].value;

            if (fname == "" || lname == "" || rollno == "" || password == "" || cpassword == "" || contact == "") {
                alert("All fields are required");
                return false;
            }

            if (password !== cpassword) {
                alert("Passwords do not match");
                return false;
            }

            if (contact.length != 10 || isNaN(contact)) {
                alert("Enter valid 10-digit contact number");
                return false;
            }

            return true;
        }
    </script>
</head>
<body>

    <h2>Student Registration System</h2>

    <form name="studentForm" action="insert.php" method="post" onsubmit="return validateForm()">
        <input type="text" name="firstname" placeholder="First Name"><br><br>
        <input type="text" name="lastname" placeholder="Last Name"><br><br>
        <input type="text" name="rollno" placeholder="Roll No / ID"><br><br>
        <input type="password" name="password" placeholder="Password"><br><br>
        <input type="password" name="cpassword" placeholder="Confirm Password"><br><br>
        <input type="text" name="contact" placeholder="Contact Number"><br><br>

        <input type="submit" value="Insert Student">
    </form>

    <br><hr><br>

    <h3>Delete Student</h3>
    <form action="delete.php" method="post">
        <input type="text" name="rollno" placeholder="Enter Roll No to Delete">
        <input type="submit" value="Delete">
    </form>

    <br><hr><br>

    <h3>Update Student Contact</h3>
    <form action="update.php" method="post">
        <input type="text" name="rollno" placeholder="Enter Roll No"><br><br>
        <input type="text" name="contact" placeholder="Enter New Contact"><br><br>
        <input type="submit" value="Update">
    </form>

    <br><hr><br>

    <h3>Search Student</h3>
    <form action="search.php" method="post">
        <input type="text" name="rollno" placeholder="Enter Roll No to Search">
        <input type="submit" value="Search">
    </form>

    <br><br>
    <a href="search.php">View All Students</a>

</body>
</html>