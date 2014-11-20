<!doctype html>
<html class="no-js" lang="en">
  <head>
    <link rel="author" href="https://plus.google.com/116499314183216878484">
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

    <link rel="stylesheet" href="assets/css/app.min.css" />
    <!-- Hello there! . If your looking at this. Maybe you are the people i'd love to work with. -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="author" content="Ahmad Milzam">
    <meta name="description" content="Online Portfolio of Ahmad Milzam, a Freelance Front-end and Web Developer living in Jakarta, Indonesia">

    <meta property="og:title" content="Online Portfolio of Ahmad Milzam">
    <meta property="og:url" content="http://ahmadmilzam.com">
    <meta property="og:image" content="http://ahmadmilzam.com/assets/img/cover.jpg">
    <meta property="og:description" content="Online Portfolio of Ahmad Milzam, a Freelance Front-end and Web Developer living in Jakarta, Indonesia">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Ahmad Milzam | Freelance Web Developer Jakarta Indonesia">

    <title>Testimonial Page | Freelance Web Developer Jakarta Indonesia</title>
    <!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700' rel='stylesheet' type='text/css'> -->
  </head>
  <body>

    <!-- Form section -->
    <div class="row--content">

      <div class="row">
        <div class="small-6 medium-4 medium-centered large-4 large-centered columns">
          <h2 class="content-heading text-center">Testimonial Form</h2>
          <p class="text-center" id="feedback"></p>
          <form action="send_testi.php" id="ajax-form" method="post" data-abide="ajax" autocomplete="off">
            <div class="row">
              <div class="small-6 column">
                <label>Name <small>Required</small></label>
                <input class="radius" type="text" name="name" placeholder="Your name" required>
                <input class="radius first-name" type="text" name="first_name" placeholder="Your first name">
              </div>
              <div class="small-6 column">
                <label>Email <small>Required</small></label>
                <input class="radius" type="email" name="email" placeholder="Your email" required>
              </div>
              <div class="small-6 column">
                <label>Website <small>If you have one</small></label>
                <input class="radius" type="url" name="website" placeholder="Your website url">
              </div>
              <div class="small-6 column">
                <label>Testimonial <small>Required</small></label>
                <textarea class="radius" name="message" rows="7" placeholder="Your testimonial" required></textarea>
              </div>
              <div class="small-6 columns">
                <button class="button radius expand" id="button-form-submit" type="submit">Send</button>
              </div>
              <div class="text-center">
                <a href="/" class="back-to-home"><i class="icon icon-house"></i> Back to Homepage</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Form section -->
    <script src="assets/js/app.min.js"></script>
    <script>
    var form = $('#ajax-form');
      $(document).foundation();

      form.on('valid', function(e){
        e.preventDefault();

        var url = form.attr('action'),
            type = form.attr('method'),
            data = {};

        myapp.setBtnLoading();

        form.find('[name]').each(function(){
          var that = $(this),
          name = that.attr('name'),
          value = that.val();

          data[name] = value;
        });

        myapp.sendEmail(url, type, data).done(function(response){
          form.clearForm();
          $('#feedback').html(response.msg);
        })
        .fail(function(xhr, status, err){
          $('#feedback').html(err);
        })
        .always(function(){
          myapp.setBtnSteady();
        });

        return false;
      });
    </script>
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