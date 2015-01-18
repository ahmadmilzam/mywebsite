<?php
  // Define Environment
  $root = dirname(__FILE__);
  switch ($root) {
    //change your project path here
    // laptop
    case 'D:\server\htdocs\project\website\mywebsite':
      $enviroment = 'development';
    break;
    default:
      $enviroment = 'production';
    break;
  }
  define('ENVIRONMENT', $enviroment);
?>

<!doctype html>
<html lang="en">
<head>
  <link rel="author" href="https://plus.google.com/116499314183216878484">
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

  <link rel="stylesheet" href="assets/css/app<?php echo ENVIRONMENT == 'development' ? '.css' : '.min.css' ?>" />
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta name="author" content="Ahmad Milzam">
  <meta name="description" content="Testimonial submission form for Ahmad Milzam, Frontend Web Architect and Web Developer">

  <meta property="og:title" content="Online Portfolio of Ahmad Milzam">
  <meta property="og:url" content="http://ahmadmilzam.com">
  <meta property="og:image" content="http://ahmadmilzam.com/assets/img/cover.jpg">
  <meta property="og:description" content="Ahmad Milzam, a Frontend Web Architect and Web Developer living in Jakarta, Indonesia. Specialise in writing, architecting and scaling CSS for big websites in big teams. With a strong focus on performance.">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Ahmad Milzam - Frontend Web Architect and Web Developer | Jakarta Indonesia">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@milzaaam">
  <meta name="twitter:creator" content="@milzaaam">
  <meta name="twitter:title" content="Online Portfolio of Ahmad Milzam">
  <meta name="twitter:description" content="Ahmad Milzam, a Frontend Web Architect and Web Developer living in Jakarta, Indonesia. Specialise in writing, architecting and scaling CSS for big websites in big teams. With a strong focus on performance.">
  <meta name="twitter:image:src" content="http://ahmadmilzam.com/assets/img/cover.jpg">

  <title>Ahmad Milzam - Testimonial Form</title>
</head>
<!--
  ___ ___ _____ ___    ___     ______  ___
  | | | | | __| | |    | |    / ____ \ | |
  | |_| | | |__ | |    | |    | |  | | | |
  |  _  | | __| | |    | |    | |  | | |_|
  | | | | | |__ | |___ | |___ | |__| | ___
  |_| |_| |___| |____| |____| \______/ |_|

  If your looking at this. Clearly you are my kind of person
  and you are the people i'd love to work with.

  Nice to meet you!

  <3's

  Milzam
-->
<body>

  <!-- Form section -->
  <div class="layout pv+">
    <div class="layout__unit small-1 medium-4-5 medium-centered large-3-5 large-centered">
      <h1 class="text-center mb-">Testimonial Form</h2>
      <div class="feedback mb-" id="feedback"></div>

      <form action="send_testi.php" id="contactForm" method="post" data-abide="ajax" autocomplete="off">

        <label class="mb0"><small>Name</small></label>
        <input class="radius" type="text" name="name" placeholder="Fill in your name" required>
        <input class="radius first-name" type="text" name="first_name" placeholder="Your first name">

        <label class="mb0"><small>Email</small></label>
        <input class="radius" type="email" name="email" placeholder="Fill in your email address" required>

        <label class="mb0"><small>Website</small></label>
        <input class="radius" type="url" name="website" placeholder="Fill in your website (if you have one)">

        <label class="mb0"><small>Testimonial</small></label>
        <textarea class="radius" name="message" rows="7" placeholder="And finally, fill in your comment here.." required></textarea>

        <div class="mb-">
          <button class="btn btn--large btn--full" id="buttonSubmit" type="submit" data-loading="Please Wait...">Send</button>
        </div>
        <div class="text-center">
          <a href="/" class="back-to-home"><i class="icon icon-house"></i> Back to Homepage</a>
        </div>

      </form>

    </div>
  </div>
  <!-- Form section -->

  <script src="assets/js/app<?php echo ENVIRONMENT == 'development' ? '.js' : '.min.js' ?>"></script>

  <!-- google analytics -->
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-42593908-1', 'ahmadmilzam.com');
    ga('send', 'pageview');
  </script>
</body>
</html>