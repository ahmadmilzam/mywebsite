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

<?php require_once 'partials/header.php'; ?>

<!-- Intro section -->
<?php require_once 'partials/intro.php'; ?>
<!-- /Intro section -->

<!-- Call to Action section -->
<?php require_once 'partials/cta.php'; ?>
<!-- /Call Action section -->

<!-- Profile Section -->
<?php require_once 'partials/about.php'; ?>
<!-- /Profile Section -->

<!-- Service Section -->
<?php require_once 'partials/service.php'; ?>
<!-- /Service Section -->

<!-- Recent work section -->
<?php require_once 'partials/work.php'; ?>
<!-- Recent work section -->

<!-- Testimonial section -->
<?php require_once 'partials/testimonial.php'; ?>
<!-- /Testimonial section -->

<!-- Contact section -->
<?php require_once 'partials/contact.php'; ?>
<!-- /Contact section -->


<?php require_once 'partials/footer.php'; ?>