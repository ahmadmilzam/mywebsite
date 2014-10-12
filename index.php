<?php
  // Define Environment
  $root = dirname(__FILE__);
  switch ($root) {
    //change your project path here
    // laptop kantor
    case 'D:\server\htdocs\project\web\mywebsite':
    // PC Rumah
    // case 'F:\Server\htdocs\ciledug-racing\public_html':
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
<div class="band band--welcome text-center" id="home">
  <div class="valign-middle">
    <div class="columns">
      <p class="lead">Hello, my name is</p>
      <h1>Ahmad Milzam</h1>
      <h2>
        <small>Front-end Web Architect / Developer</small>
      </h2>
    </div>
  </div>
  <a href="javascript:;" data-scroll="#profile" class="link-learn-more bounceInDown js-button-scroll">
    <i class="icon icon-arrow-down text-2x"></i>
  </a>
</div>
<!-- /Intro section -->

<!-- Action section -->
<div class="row--padding--big grey" id="profile">

  <div class="row wow fadeInUp">
    <div class="small-6 medium-4 large-4 columns margin-bottom-onsmall">
      <p class="lead no-margin-bottom small-text-center medium-text-left large-text-left">
        If you are interested in working together I'm available for
        <strong>freelance</strong> or
        <strong>direct client projects</strong>. <br>
        Contact details can be found below.
      </p>
    </div>
    <div class="small-6 medium-2 large-2 columns text-center">
      <a href="javascript:;" data-scroll="#contact" class="button large radius js-button-scroll no-margin-bottom">SAY HELLO</a>
    </div>
  </div>
</div>
<!-- /Action section -->

<!-- Profile Section -->
<?php require_once 'partials/about.php'; ?>
<!-- /Profile Section -->

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