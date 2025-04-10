<?php

// Include the database connection file
include 'db_connect.php';

// Retrieve form data from POST request
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$address = $_POST['address'];
$delivery = $_POST['delivery'];
$total_amount = $_POST['total_amount'];
$order_items = json_decode($_POST['order_items'], true);

// Insert order into the `orders` table
$order_sql = "INSERT INTO orders (name, phone, email, address, delivery, total_amount) 
              VALUES ('$name', '$phone', '$email', '$address', '$delivery', '$total_amount')";

if ($conn->query($order_sql) === TRUE) {
    $order_id = $conn->insert_id;

    // Insert items into the `order_items` table
    $item_sql = "INSERT INTO order_items (order_id, item_name, item_price, quantity) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($item_sql);

    foreach ($order_items as $item) {
        $stmt->bind_param("isdi", $order_id, $item['name'], $item['price'], $item['quantity']);
        $stmt->execute();
    }

    // Success message with a modern design
    echo "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel='stylesheet'>
        <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css' rel='stylesheet'>
        <title>Kottu Paradise | Order Success</title>
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                background: #f7f7f7;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
            }
            .success-container {
                text-align: center;
                background: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                padding: 30px;
                max-width: 500px;
                width: 90%;
                animation: slideIn 0.5s ease-in-out;
            }
            .success-icon {
                font-size: 80px;
                color: #4CAF50;
                margin-bottom: 20px;
                animation: bounce 1s infinite;
            }
            .success-title {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 15px;
            }
            .success-details {
                font-size: 18px;
                margin-bottom: 20px;
                color: #555;
            }
            .success-order-summary {
                text-align: left;
                margin: 20px 0;
                background: #f9f9f9;
                padding: 15px;
                border-radius: 8px;
            }
            .success-order-summary h4 {
                margin: 0;
                margin-bottom: 10px;
                color: #000;
            }
            .success-order-summary p {
                margin: 5px 0;
            }
            .back-home-btn {
                background: #4CAF50;
                color: white;
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                text-decoration: none;
                cursor: pointer;
            }
            .back-home-btn:hover {
                background: #45a049;
            }
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
        </style>
    </head>
    <body>
        <div class='success-container'>
            <div class='success-icon'><i class='fas fa-check-circle'></i></div>
            <div class='success-title'>Thank You, $name!</div>
            <div class='success-details'>
                Your order has been successfully placed.<br>
                We'll contact you at <b>$phone</b> or <b>$email</b>.
            </div>
            <div class='success-order-summary'>
                <h4>Order Summary:</h4>
                <p><b>Delivery Address:</b> $address</p>
                <p><b>Delivery Option:</b> $delivery</p>
                <p><b>Total Amount:</b> $$total_amount</p>
                <ul>
    ";
    foreach ($order_items as $item) {
        echo "<li>{$item['quantity']}x {$item['name']} - $".number_format($item['price'] * $item['quantity'], 2)."</li>";
    }
    echo "
                </ul>
            </div>
            <a href='menu.html' class='back-home-btn'>Back to Menu</a>
        </div>
    </body>
    </html>
    ";
} else {
    echo "
    <div class='error'>
        <p>Something went wrong: {$conn->error}</p>
        <a href='menu.html'>Back to Menu</a>
    </div>
    ";
}

$conn->close();
?>
