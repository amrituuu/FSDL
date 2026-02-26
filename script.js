// Access using getElementById
const form = document.getElementById("regForm");
const successMessage = document.getElementById("successMessage");

// Change heading using innerHTML
document.getElementById("formTitle").innerHTML = "Student Registration Portal";

// Validation Function
form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    let errors = document.getElementsByClassName("error");

    for (let i = 0; i < errors.length; i++) {
        errors[i].innerHTML = "";
    }

    // Empty check
    if (username === "") {
        errors[0].innerHTML = "Username required";
        valid = false;
    }

    // Email Regex
    let emailPattern = /^[A-Za-z]+@[A-Za-z]{3}\.[A-Za-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        errors[1].innerHTML = "Invalid Email format";
        valid = false;
    }

    // Phone Validation
    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        errors[2].innerHTML = "Phone must be 10 digits";
        valid = false;
    }

    // Password Validation
    let passPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[&$#@]).{7,}$/;
    if (!passPattern.test(password)) {
        errors[3].innerHTML = "Password must contain 1 capital, 1 digit, 1 special (&,$,#,@)";
        valid = false;
    }

    if (password !== confirmPassword) {
        errors[4].innerHTML = "Passwords do not match";
        valid = false;
    }

    if (valid) {
        successMessage.innerHTML = "Registration Successful!";
        successMessage.style.color = "green";

        // Add Text Node
        let newNode = document.createTextNode(" Welcome " + username);
        successMessage.appendChild(newNode);
    }
});

// Change Image Source
document.getElementById("changeImageBtn").onclick = function() {
    document.getElementById("profileImage").src = "https://via.placeholder.com/120/ff4444";
};

// Delete Node Example
setTimeout(() => {
    let img = document.getElementById("profileImage");
    img.parentNode.removeChild(img);
}, 20000);


// =================== JQUERY SECTION ===================

$(document).ready(function() {

    // Change Button Text
    $("#submitBtn").text("Create Account");

    // Set Background Image
    $("body").css("background-image", "linear-gradient(135deg, #667eea, #764ba2)");

    // Access Form Data using jQuery
    $("#submitBtn").click(function() {
        let name = $("#username").val();
        console.log("Username using jQuery:", name);
    });

    // Add Attribute using jQuery
    $("#username").attr("maxlength", "20");

    // AJAX Example (Dummy)
    $("#regForm").submit(function() {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            type: "POST",
            data: {
                username: $("#username").val(),
                email: $("#email").val()
            },
            success: function(response) {
                console.log("Ajax Submitted", response);
            }
        });
    });

});