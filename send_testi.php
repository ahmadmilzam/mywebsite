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

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$message = trim($_POST['message']);


if(empty($name) OR empty($email) OR empty($message))
{
  $error = "Are you joking ?";
}

if(strlen($name) < 4 OR strlen($message) < 10 OR strlen($email) < 9)
{
  $error = "Are you joking ?";
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
  $mail->Body = '<h4>You got testimonial!</h4>';
  $mail->Body .= 'Dari: '.$name.'<br>Isi Testimonial: <br>'.$message;

    // GMAIL STUFF

    /* $mail->Mailer = "smtp";
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 587;
    $mail->SMTPSecure = "tls";

    $mail->SMTPAuth = true; // turn on SMTP authentication
    $mail->Username = "username@gmail.com"; // SMTP username
    $mail->Password = "password"; // SMTP password */

    if(!$mail->Send())
    {
      $error = 'An error occured. Mail error: '.$mail->ErrorInfo;
    }
    else
    {
      $error = 'Thank you very much for your feedback :)';
    }
    header('Content-type: application/json');
    echo json_encode(array('msg' => $error) );
    exit;
  }