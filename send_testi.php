<?php

$response = array();

$response['status'] = 401;
$response['msg'] = '';

if(! $_POST OR count($_POST) == 0)
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
$website = trim($_POST['website']);
$message = trim($_POST['message']);


if(empty($name) OR empty($email) OR empty($message))
{
  $response['msg'] = "Are you joking ?";
}

if(strlen($name) < 4 OR strlen($message) < 10 OR strlen($email) < 9)
{
  $response['msg'] = "Are you joking ?";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $response['msg'] = "Plase insert a valid email address";
}

if(!empty($website) && !filter_var($website, FILTER_VALIDATE_URL))
{
  $response['msg'] = "Plase insert a valid url";
}

if ($response['msg'] !== '')
{
  header('Content-type: application/json');
  echo json_encode($response);
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
  $mail->Body .= 'Dari: '.$name.'<br>';
  $mail->Body .= 'Isi Testimonial: <br>'.$message.'<br>';
  if($website !== ''){
    $mail->Body .= 'Website: '.$website.'<br>';
  }

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
      $response['msg'] = 'An error occured. Mail error: '.$mail->ErrorInfo;
    }
    else
    {
      $response['msg'] = 'Thank you very much for your feedback :)';
      $response['status'] = 200;
    }
    header('Content-type: application/json');
    echo json_encode($response);
    exit;
  }