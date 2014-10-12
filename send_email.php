<?php

define('IS_AJAX', isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');

$error = '';

if(! $_POST OR !IS_AJAX)
{
  echo "Back off man, i'm a scientist!";
  exit;
}

if(isset($_POST['first_name']) && $_POST['first_name'] != '')
{
  exit;
}
// var_dump($_POST); exit;

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$website = trim($_POST['website']);
$message = trim($_POST['message']);


if(empty($name) OR empty($email) OR empty($phone) OR empty($message))
{
  $error = "Are you joking ?";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $error = "Plase insert a valid email address";
}

if(!empty($website) && !filter_var($website, FILTER_VALIDATE_URL))
{
  $error = "Plase insert a valid url";
}

if(!is_numeric($phone))
{
  $error = "Please insert a numeric value into phone number field";
}

if(strlen($phone) < 9)
{
  $error = "Please insert a valid phone number";
}

if(strlen($name) < 4 OR strlen($message) < 10 OR strlen($email) < 9)
{
  $error = "Are you joking ? Please write good message.";
}

if ($error !== '')
{
  header('Content-type: application/json');
  echo json_encode(array('msg' => $error));
  exit;
}
else
{
  require('phpmailer/class.phpmailer.php');

  $mail = new PHPMailer;

  // Add a sender
  $mail->From = $email;
  $mail->FromName = $name;

  // Add a recipient
  $mail->AddAddress('email@ahmadmilzam.com', 'Ahmad Milzam');
  $mail->Subject = "Website Contact Form";
  $mail->AddBCC('ahmadmilzam@yahoo.com');
  $mail->IsHTML(true);
  $mail->Body = '<h4>Hey, you got mail!</h4>';
  $mail->Body .= 'From: '.$name.'<br>';
  $mail->Body .= 'Phone number: '.$phone.'<br>';
  if($website !== ''){
    $mail->Body .= 'Website: '.$website.'<br>';
  }
  $mail->Body .= 'Message: '.$message.'<br>';

  // GMAIL STUFF

  // $mail->Mailer = "smtp";
  // $mail->Host = "smtp.gmail.com";
  // $mail->Port = 587;
  // $mail->SMTPSecure = "tls";

  // $mail->SMTPAuth = true; // turn on SMTP authentication
  // $mail->Username = "ahmadmilzam91@gmail.com"; // SMTP username
  // $mail->Password = "makanenak"; // SMTP password

  if(!$mail->Send())
  {
    $error = 'An error occured. Mail error: '.$mail->ErrorInfo;
  }
  else
  {
    $error = 'Message has been sent.';
  }
  header('Content-type: application/json');
  echo json_encode(array('msg' => $error) );
  exit;
}