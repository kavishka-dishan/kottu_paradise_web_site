<?php
// Include the database connection file
include 'db_connect.php';

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize form data
    $name = $conn->real_escape_string(trim($_POST['name']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $subject = $conn->real_escape_string(trim($_POST['subject']));
    $message = $conn->real_escape_string(trim($_POST['message']));

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = [
            'status' => 'error',
            'message' => 'Invalid email address. Please enter a valid email.'
        ];
    } else {
        // Insert data into the database
        $sql = "INSERT INTO contacts_details (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";

        if ($conn->query($sql) === TRUE) {
            $response = [
                'status' => 'success',
                'message' => 'Your message has been sent successfully!'
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Error: ' . $conn->error
            ];
        }
    }

    // Close the database connection
    $conn->close();
} else {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request. Please submit the form properly.'
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="icon" href="../kottu_paradise_logo.png" sizes="20x20 40x40 55x55" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
    <title>Kottu Paradise | Contact Form Response</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            margin-top: 50px;
            padding: 20px;
            border-radius: 10px;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            margin: auto;
        }
        .message {
            font-size: 18px;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color:rgb(250, 39, 16);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        a:hover {
            background-color:rgb(215, 117, 32);
        }
    </style>
</head>
<body>
    <div class="container">
        <?php if ($response['status'] === 'success'): ?>
            <div class="message success">
                <?php echo $response['message']; ?>
            </div>
        <?php else: ?>
            <div class="message error">
                <?php echo $response['message']; ?>
            </div>
        <?php endif; ?>
        <a href="../contact.html">Go Back to Contact Form</a>
    </div>
</body>
</html>
