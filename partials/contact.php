<div class="pv+ bg-gray" id="contact">

  <div class="layout mb+">
    <div class="layout__unit small-1">
      <h2 class="h1 text-center mb-">Contact Me</h2>
      <p class="lede text-center">
        I'm always interested in working with new clients or hearing about exciting opportunities.<br>
        Just send me an email and I'll get back to your enquiry ASAP <i class="icon icon--cool"></i>.
      </p>
    </div>
  </div>

  <div class="layout">

    <div class="layout__unit small-1 medium-1-3 small-mb">
      <h4>Contact Detail</h4>
      <p>
        P: +62 812 840 262 91
        <br>
        E: email[at]ahmadmilzam[dot]com
        <br>
        E: ahmadmilzam[at]yahoo[dot]com
      </p>
      <ul class="list-inline mt">
        <li class="list-inline__item mr-"><a href="https://www.facebook.com/ahmadmilzam" title="Me on Facebook"><i class="icon icon--facebook"></i></a></li>
        <li class="list-inline__item mr-"><a href="https://twitter.com/milzaaam" title="Me on Twitter"><i class="icon icon--twitter"></i></a></li>
        <li class="list-inline__item mr-"><a href="https://plus.google.com/+AhmadMilzam-freelance-web-developer/posts" title="Me on Google Plus"><i class="icon icon--google-plus"></i></a></li>
        <li class="list-inline__item"><a href="https://www.linkedin.com/in/ahmadmilzam" title="Me on Linkedin"><i class="icon icon--linkedin"></i></a></li>
      </ul>
    </div>

    <form class="layout__unit small-1 medium-2-3" action="send_email.php" name="contactForm" id="contactForm" method="post" data-abide="ajax" autocomplete="off">

      <div class="layout mb-">
        <div class="layout__unit small-1 medium-1-2">
          <label for="name">
            <small>Name</small>
          </label>
          <input class="radius" id="name" type="text" name="name" placeholder="My name is*" required>
        </div>
        <div class="layout__unit small-1 medium-1-2">
          <label for="email">
            <small>Email</small>
          </label>
          <input class="radius" id="email" type="email" name="email" placeholder="your.email@something.com*" required>
        </div>
      </div>
      <div class="layout mb-">
        <div class="layout__unit small-1 medium-1-2">
          <label for="phonenumber">
            <small>Phone number</small>
          </label>
          <input class="radius" id="phonenumber" type="tel" name="phone" placeholder="0899999999*" required pattern="[0-9]+">
        </div>
        <div class="layout__unit small-1 medium-1-2">
          <label for="website-url">
            <small>Website Url</small>
          </label>
          <input class="radius" id="website-url" type="url" name="website" placeholder="http://your-current-website.com">
        </div>
      </div>
      <div class="layout mb-">
        <div class="layout__unit small-1">
          <label for="message">
            <small>Project detail</small>
          </label>
          <textarea class="radius" id="message" name="message" rows="6" placeholder="Hello, I have some project TBD*" required></textarea>
        </div>
      </div>
      <div class="layout mb">
        <div class="layout__unit small-1">
          <input class="radius first-name" id="firstname" type="email" name="first_name" placeholder="Your first name">
          <button class="btn btn--large btn--full" id="buttonSubmit" type="submit" data-loading="Please wait..">SEND</button>
        </div>
      </div>

      <div class="layout">
        <div class="layout__unit small-1">
          <div class="feedback mt-" id="feedback"></div>
        </div>
      </div>
    </form>

  </div>

</div>