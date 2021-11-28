# README: art-decor-web-site 
This project is an online store for a interior decor company. The project uses a combination of HTML5, CSS3, JS (jQuery) and makes use of a lot of Bootstrap 4 components to build a user experience that is intuitive and uncluttered.

## Table of Contents
1. Getting Started
2. How to Use
3. Links to the Author

## 1. Getting Started
To get started with this project or use any blocks of this code you can pull it straight from repo or simply copy the blocks you need. Paste the code into your IDE or text editor (which ever is our preferred workstation) and go from there. It is really not very complicated and you simply need to make sure that all the containing links pont to the correct directory on your server.
To do this, simply read through the code and where you find any href or src attributes, check the links to ensure that the directory/folder/file exists at the given url.

Also ensure that your imported links to jquery, bootstrap and other external libraries are in the same order as the master code in this repo. This greatly effects how your code is rendered and if/how your functions as well as layout is pushed to the UI.

### Dependencies

* jQuery, jQuery UI libraries
* Bootstrap 4, bootstrap icons libraries
* Google Fonts
* Inter browser - Chrome, Firefox, Safari, IE


## How to Use

### Installing

* As this is a web site, it doesn't require any detailed installation instructions. Simply note that you do require an up-to-date internet browser to run the site as intended.
* If you want/need to make any adjustments to the code, a feature rich text editor or preferabbly VS Code is recommended.

### Executing program

* To experience the website and its functionality as intended, start by opening the landingPage.html. Form there on you are free to explore as you wish.
* The artDeco page has a promo discount code which appears only on the first visit or unles you clear the localStorage. 
In order to use and test the promo code discount upon check-out, it is advised to start by opening the landing page first that the promo-code may be generated.
If you did not write down the promo code or lost your code, a copy of the code can be access in the localStorage and the code will also be in the console for the shopping cart page.
* The page contains some elements that are there for design and layout purposes only and are not yet functional. These will be updated with future versions.
* Here are the external sources, presented in the order as required by the page.
```
<!-- Note that these links need to be loaded in this specific order to ensure that all components function correctly. -->

  <!-- JQuery Libraries: Google hosted-->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <!-- Link to bootstrap -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css">

  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
    integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous">
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"
    integrity="sha384-VHvPCCyXqtD5DqJeNxl2dtTyhF78xXNXdkwX1CZeRusQfRKp+tA7hAShOK/B/fQ2" crossorigin="anonymous">
  </script>

  <!-- Link to CSS file -->
  <link rel="stylesheet" href="../artDecor.css" />

  <!-- Fonts imported from Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oi&family=Poiret+One&family=Yeseva+One&display=swap"
    rel="stylesheet">
```

* The catalogue page uses a strict combination of Bootstrap, HTML and CSS to super-impose the product information over the image with the click of a button. It requires bootstrap cards, checkbox and labels which are then edited in CSS.

HTML
```
<!-- Images in the catalogue section of the page use the img-thumbnail class. This gives the images a border of 1px and can be used with other classes such as the img-fluid class.
            For further reading see https://getbootstrap.com/docs/4.1/content/images/ -->
    <div id="catalogue" class="mt-5 pt-5">
      <h1 class="display-3">Our Product Catalogue</h1>
    </div>

    <!-- First section of products: sofas -->
    <div class="row sofas mt-5 pt-5">
      <div class="row mb-4 pb-1">
        <div class="col-4 align-self-center" id="productLabel">
          <div class="card bg-primary m-auto shadow-lg">
            <div class="card-body m-auto">
              <a href="#" class="btn btn-outline-light stretched-link mt-5"
                style="font-family: 'Yeseva One';"><br>Sofas</a>
            </div>
          </div>
        </div>

        <div class="col-4 prodimg prodItem">
          <div class="card bg-light text-white rounded-circle shadow">
            <img class="card-img rounded-circle shadow" src="images/sofas/freud-sofa-1.jpg"
              alt="Camel coloured, corduroy Freud sofa">
            <div class="card-img-overlay crdimg" id="">
              <input class="form-check-input d-none" type="checkbox" id="checkboxFreud" value="" aria-label="...">
              <label class="card-title form-check" for="checkboxFreud">
                <h3 class="prodName">Frued Sofa</h3>
              </label>
              <label class="card-text form-check" for="checkboxFreud">
                <p>This piece is the perfect fit to liven up any space.<br>A comfortable six-seater with durable
                  corduroy upholstery.<br><br>R<span class="price">56 988.00</span> (incl. VAT)<i
                    class="btn bi bi-cart-plus ml-4 addCart"></i></p>
              </label>
            </div>
          </div>
        </div>
```
CSS
```
/* Seperate styling for card elements */
.catalogue .card-title {
    margin: 0 1em;
    padding: 0.5em;
    position: absolute;
    top: 20%;
    transform: translate(0, -50%);
}

.catalogue .card-text {
    margin: 0.5em 2em;
    padding: 1em;
    position: absolute;
    top: 60%;
    transform: translate(0, -50%);
}

/* In order to create the effect that product info appears when it is slected, the card text and tile elements are 
connected as sibling elements with a hidden check-box. Upon 'checked' the card elements become visible. */
.catalogue .form-check-input:checked~.card-title,
.catalogue .form-check-input:checked~.card-text {
    background-color: rgba(154.0, 169.0, 179.0, 0.7);
    color: #fff;
    opacity: 1;
}
 /* Stying the buttons on the catalogue page */
.catalogue .btn {
    background-color: rgba(154.0, 169.0, 179.0, 0.3);
    border-color: silver;
}

/* Adding hover effect to the buttons on the catalogue page */
.catalogue .btn:hover {
    background-color: white;
    color: rgba(38, 49, 46, 0.7);
    border-color: silver;
}
```
This can be over-writen in JavaScript if it better suits you purposes.

* see below for how the card-checkbox work in action:
![Card-Checkbox1](https://github.com/JC03Ceige/art-decor-web-site/blob/master/artDecor/images/Art%20Decor%20-%20card_checbox1.png?raw=true)
![Card-Checkbox2](https://github.com/JC03Ceige/art-decor-web-site/blob/master/artDecor/images/Art%20Decor%20-%20card_checbox2.png?raw=true)
![Card-Checkbox3](https://github.com/JC03Ceige/art-decor-web-site/blob/master/artDecor/images/Art%20Decor%20-%20card_checbox3.png?raw=true)
![Card-Checkbox4](https://github.com/JC03Ceige/art-decor-web-site/blob/master/artDecor/images/Art%20Decor%20-%20card_checbox4.png?raw=true)


* You will notice that the shopping cart page makes use of a lot of modals and other dynamically loaded elements and functions. It is important to understand how the [bootstrap modals](https://getbootstrap.com/docs/4.0/components/modal/) operate in order to maninpulate them accoridng to your UX design. The order in which they appear on the HTML, especially when nested, has an impact on their accesibility.

* Also take note that many of the functions and events that run on this website, in particular the shopping cart, are trigered by dynamically loaded elements and that you need to be aware of the implications of changing selectors, arguments, etc on any of these.


## Help

When in doubt, remember that [Stackoverflow](https://stackoverflow.com/) is your friend and that the community is active 24/7.
And lastly, your greatest asset in debugging this project will forever be
```
console.log()
```

## Author

JC van der Merwe

 * ![Twitter]({https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white})[](https://twitter.com/JCvanderMerwe4)
 * [[LinkedIn]({https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white})](https://www.linkedin.com/in/jc-van-der-merwe-0a565860/) 
 * [[GitHub]({https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white})](https://github.com/JC03Ceige)

## Version History

* 0.1
    * Initial Release

## License

This project is unlicensed and part of the open-source community.
