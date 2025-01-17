With our first page down, let's add another one!

This time, we would like the page to be served on the `/about` URL. In order to do this, we will need to tell Ember our plan to add a page at that location, otherwise Ember will think we have visited an invalid URL!

The place to manage what pages are available is the *[router](TODO: link to router)*. Go ahead and open `app/router.js` and make the following change:

```run:file:patch lang=js cwd=super-rentals filename=app/router.js
--- a/app/router.js
+++ b/app/router.js
@@ -9,2 +9,3 @@
 Router.map(function() {
+  this.router('about');
 });
```

This adds a *[route](TODO: link to route)* named "about", which is served at the `/about` URL by default.

```run:command hidden=true cwd=super-rentals
git add app/router.js
```

With that in place, we can create a new `app/templates/about.hbs` template with the following content:

```run:file:create lang=handlebars cwd=super-rentals filename=app/templates/about.hbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
</div>
```

To see this in action, navigate to `http://localhost:4200/about`.

<!-- TODO: screenshot? -->

```run:command hidden=true cwd=super-rentals
git add app/templates/about.hbs
```

With that, our second page is done!

We're on a roll! While we're at it, let's add our third page. This time, things are a little bit different. Everyone at the company calls this the "contact" page. However, the old website we are replacing already has a similar page, which is served at the legacy URL `/getting-in-touch`.

We want to keep the existing URLs for the new website, but `getting-in-touch` is a mouthful to type and say out loud all the time! Fortunately, we can have the best of the both worlds:

```run:file:patch lang=js cwd=super-rentals filename=app/router.js
--- a/app/router.js
+++ b/app/router.js
@@ -10,2 +10,3 @@
   this.router('about');
+  this.route('contact', { path: '/getting-in-touch' });
 });
```

Here, we add the `contact` route, but explicitly specify a path for the route. This allows us to keep the legacy URL, but use the new, shorter name for the route as well as the template filename.

```run:command hidden=true cwd=super-rentals
git add app/router.js
```

Speaking of the template, let's create that as well. We'll add a `app/templates/contact.hbs` file:

```run:file:create lang=handlebars cwd=super-rentals filename=app/templates/contact.hbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Contact Us</h2>
  <p>
    Super Rentals Representatives would love to help you<br>
    choose a destination or answer any questions you may have.
  </p>
  <address>
    Super Rentals HQ
    <p>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </p>
    <a href="tel:503.555.1212">+1 (503) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </address>
</div>
```

Ember comes with strong *[conventions](TODO: link to conventions)* and sensible defaults &mdash; if we were starting from scratch, we wouldn't mind the default `/contact` URL. However, if the defaults don't work for us, it is no problem at all to customize Ember for our needs!

Once you have added the route and the template above, we should have the new page available to us at `http://localhost:4200/getting-in-touch`.

```run:command hidden=true cwd=super-rentals
git add app/templates/contact.hbs
```

<!-- TODO: screenshot? -->

Congratulations, you have completed your training as a master page-crafter!

```run:checkpoint cwd=super-rentals
Chapter 2
```
