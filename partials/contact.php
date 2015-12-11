<div class="pv+" id="contact">

  <div class="grid text-center mb+">
    <div class="grid__item small-1">
      <h2 class="text-bold mb-">Contact Me</h2>
      <p class="lede">
        I'm always interested in working with new clients or hearing about exciting opportunities.<br>
        Just send me an email and I'll get back to your enquiry ASAP <svg class="icon icon--cool"><use xlink:href="#icon--cool"></use></svg>.
      </p>
    </div>
  </div>

  <div class="grid">

    <div class="grid__item small-1 medium-1of3 small-mb">
      <h4>Contact Detail</h4>
      <p>
        P: +62 812 840 262 91
        <br>
        E: email[at]ahmadmilzam[dot]com
        <br>
        E: ahmadmilzam[at]yahoo[dot]com
      </p>
      <ul class="list-inline mt">
        <li class="list-inline__item mr-"><a href="https://www.facebook.com/ahmadmilzam" title="Me on Facebook"><svg class="icon icon--facebook"><use xlink:href="#icon--facebook"></use></svg></a></li>
        <li class="list-inline__item mr-"><a href="https://twitter.com/milzaaam" title="Me on Twitter"><svg class="icon icon--twitter"><use xlink:href="#icon--twitter"></use></svg></a></li>
        <li class="list-inline__item mr-"><a href="https://plus.google.com/+AhmadMilzam-freelance-web-developer/posts" title="Me on Google Plus"><svg class="icon icon--google-plus"><use xlink:href="#icon--google-plus"></use></svg></a></li>
        <li class="list-inline__item"><a href="https://www.linkedin.com/in/ahmadmilzam" title="Me on Linkedin"><svg class="icon icon--linkedin"><use xlink:href="#icon--linkedin"></use></svg></a></li>
      </ul>
    </div>

    <form class="grid__item small-1 medium-2of3" action="send_email.php" name="contactForm" id="js-contactForm" method="post" data-abide="ajax" autocomplete="off">

      <div class="grid mb-">
        <div class="grid__item small-1 medium-1of2">
          <label for="name">
            <small>Name</small>
          </label>
          <input class="radius" id="name" type="text" name="name" placeholder="My name is*" required>
        </div>
        <div class="grid__item small-1 medium-1of2">
          <label for="email">
            <small>Email</small>
          </label>
          <input class="radius" id="email" type="email" name="email" placeholder="your.email@something.com*" required>
        </div>
      </div>
      <div class="grid mb-">
        <div class="grid__item small-1 medium-1of2">
          <label for="phonenumber">
            <small>Phone number</small>
          </label>
          <input class="radius" id="phonenumber" type="tel" name="phone" placeholder="0899999999*" required pattern="[0-9]+">
        </div>
        <div class="grid__item small-1 medium-1of2">
          <label for="website-url">
            <small>Website Url</small>
          </label>
          <input class="radius" id="website-url" type="url" name="website" placeholder="http://your-current-website.com">
        </div>
      </div>
      <div class="grid mb-">
        <div class="grid__item small-1">
          <label for="message">
            <small>Project detail</small>
          </label>
          <textarea class="radius" id="message" name="message" rows="6" placeholder="Hello, I have some project TBD*" required></textarea>
        </div>
      </div>
      <div class="grid mb">
        <div class="grid__item small-1">
          <input class="radius first-name" id="firstname" type="email" name="first_name" placeholder="Your first name">
          <button class="btn btn--large btn--full" id="buttonSubmit" type="submit" data-loading="Please wait..">SEND</button>
        </div>
      </div>

      <div class="grid">
        <div class="grid__item small-1">
          <div class="feedback mt-" id="js-feedback"></div>
        </div>
      </div>
    </form>

  </div>

</div>