<?php

include("../DataBase/database-connect.php");
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['gmail'];
$privileges = (function() {
    switch ($_POST['privileges']) {
        case "Teacher": return 0;
        case "Moderator": return 1;
        case "Administraitor": return 2;
    }
})();
$kamarcode = $_POST['kamar_code'];
$hashub = $_POST['has_hub'] || FALSE;


$query = "INSERT INTO `teachers` (`FIRST_NAME`, `LAST_NAME`, `EMAIL`, `PRIVILEGES`, `KAMAR_CODE`, `HAS_HUB`) VALUES ('".$firstname."','".$lastname."','".$email."','".$privileges."','".$kamarcode."','".$hashub."')";
$result = mysqli_query($dbconnect, $query);

header('Location: ../admin-tool.php');

?>