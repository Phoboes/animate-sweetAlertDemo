## Animation libraries
____

#### What we are looking at:

  - [Sweet Alert](http://t4t5.github.io/sweetalert/)
  - [Animate.css](https://daneden.github.io/animate.css/)
   * Or: [Bounce.js](http://bouncejs.com/)
   
#### Why?

Animations are hard and time consuming, but they add a *lot* to your website. These libraries are easy to use, well documented and have easily accessible code, which you can easily tailor to your needs.

#### Getting started:

Download the animate and sweetalert libraries. Here's the quick way:

```
mkdir animationsDemo animationsDemo/css animationsDemo/js && cd animationsDemo && touch js/main.js css/style.css index.html && curl https://code.jquery.com/jquery-3.2.1.js > js/jQuery.js && curl https://raw.githubusercontent.com/daneden/animate.css/master/animate.css > css/animate.css && curl https://raw.githubusercontent.com/t4t5/sweetalert/master/dist/sweetalert.css > css/sweetalert.css && curl https://raw.githubusercontent.com/t4t5/sweetalert/master/dist/sweetalert.min.js > js/sweetalert.js
```
Link them all in the header of your HTML: 
`jQuery.js` should be the first JS library, followed by `sweetalert.js`, then `main.js`.
`animate.css` should be your first CSS file, followed by `sweetalert.css` and lastly `style.css`.

____

Next, we're going to make some elements to interact with. In `index.html`:

Make a div with the class of container, and 3 divs inside of it with the class of square, along with the classes of first, second and third.

```html
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
    <script src="js/jQuery.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/main.js"></script>
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/sweetalert.css">
    <link rel="stylesheet" href="css/style.css">
    </head>
  <body>

  <div class="container">
    <div class="square first"></div>
    <div class="square second"></div>
    <div class="square third"></div>
  </div>

  </body>
  </html>
  ```
  
  Next, some styles to make them visible. In `style.css`:
  
  ```css
.container {
  width: 80%;
  margin: auto;
  font-size: 0;
  padding-top: 40px;
}

.square {
  width: 33%;
  height: 245px;
  border: 1px solid rgb( 230, 230, 230 );
  background-color: rgb( 240, 240, 240 );
  display: inline-block;
}
```

![Boxes](http://i.imgur.com/kpXF8F8.png)

Sorted!

____

In our `main.js`:

Firstly, we want to make sure we start listening for events *after* our document has fully loaded. To do this, we are going to start our whole program in a function:

```js
$(document).ready( function(){
  console.log("Loaded!");
}); // end docReady
```

With all this out of the way, we can start animating our elements.

The way this is going to work, is we apply classes to our elements, the classes have CSS styles that are triggered when we add them to an element.
Looking at [animate.css's webpage](https://daneden.github.io/animate.css/), we can preview any of the animations the library gives us. 
I'm going to start with their default on that page: Bounce.

In `main.js`: 

```js
$(document).ready( function(){

  $('.square').on("click", function(){
    $(this).addClass("animated bounce");
    console.log(this);

  });
}); // end docready
```

If we save our changes and come back to our browser, refresh and click a box, we get this:

![Bouncing Box](http://i.imgur.com/4CBpIzH.gif)

Oh my god -- it does the thing. But there's a problem. If you click the box again, it does nothing.
Why? Lets inspect the element:

![Clashing class names](http://i.imgur.com/9viz2Ae.png)

The div already has those classes. If we click it again, it doesn't add them back on. How do we fix this?
The obvious remedy is to remove the classes after they've been added, the issue with trying to resolve it that way is that it will happen so fast that the animation never gets seen.
A `setTimeout` will work -- if you know how long the animation will take, and change it every time.

Fortunately there is a simpler solution: [jQuery's .one function](http://api.jquery.com/one/). 
`.one` says: Listen for this event one time, then execute a callback.
In the docs, they've very kindly offered us all the vendor prefixes we want to listen for:
*'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'*.
That's a horrible string to need to remember, you will also find most of those prefixes buried in the css file. 

Things like this are why libraries are awesome.

With that in mind, lets revisit the code:

```js
$(document).ready( function(){

// Store this horrible string in a variable so we never need to look at it again

  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  $('.square').on("click", function(){

    $(this).addClass("animated bounce")

            .one( animationEnd, function(){

              $(this).removeClass( "animated bounce" );
  });
}); // end docready
```

Now we can click until our heart's content.

Because of the way css works, I can only call one of these animations at a time, so, for instance if I have `$(this).addClass("animated bounce pulse")`, what I will actually see is this:

![Pulse](http://i.imgur.com/B43X6jt.gif)

The reason for this, is that CSS works by the last bit of information it saw. In this case, it only sees pulse as the animation, so it pulses. Bounce never existed.
This is also the reason I follow my libraries with my custom css file. If they have something named with the same selector as mine, I want mine to be the one that shows.

On the other hand, I **can** chain my `.one` events together.
I'm also going to start isolating my click events to individual squares, rather than a class wide style.

```js
  $('.second').on("click", function(){
    $(this).addClass("animated bounce")
            .one( animationEnd, function(){
              $(this).removeClass( "animated bounce" );
              $(this).addClass("animated pulse").one( animationEnd, function(){
                // Remove all residual classes
                $(this).removeClass( "animated pulse bounce" );
              });
            });
  });
```

This function now listens for the first animation to end, then immediately chains itself for another animation, and *then* removes all classes.

![bounce pulse](http://i.imgur.com/41tAm1d.gif)

This one is a really bad example, so lets try something a little more visually impressive. This time we're going to chain `flipOutX` and `flipInX`, and a colour change. 

To do this, we're basically going to copy our previous code, substitute `bounce` with `flipOutX` and `pulse` with `flipInX` (and insert a css change on the first bit).

```js
  $('.third').on("click", function(){
    $(this).addClass("animated flipOutX")
            .one( animationEnd, function(){
              $(this).removeClass( "animated flipOutX" );
              $(this).css( "background-color", "rgb(255, 220, 220)" );
              $(this).addClass("animated flipInX").one( animationEnd, function(){
                // Remove all residual classes
                $(this).removeClass( "animated flipInX bounce" );
              });
            });
  });
```

Tada!

![Flip in and out](http://i.imgur.com/qNrDxgq.gif)

____

"Well, that's *okay*, I guess... But I really wanted a sweet bouncePulse..."

Either: Combine the styles you like in animate.css into a new mega animation, or try [bounce.js](http://bouncejs.com/). 
The website has a pretty good constructor which you can use to build and see animations (jelly would be where I'd start in this instance).

____


## Sweet Alert

____

#### What and why?

Sweet alert is a library that gives you... sweet alerts?
Really though, alerts are ugly and annoying. Abusing them can be really annoying to people who are using your site.
With that said, if you *really* need to communicate something to a user, they can be really helpful. 

Sweet alert tries to meet in the middle ground by giving you fancy popups which are easily customiseable and a little less intrusive.

#### Let's begin:

Sweet alert on its most basic level works exactly the same as `alert`. It can be called with either `sweetAlert( "Text here" )` or `swal( text here )`.

From there, the world is your oyster.

`swal( "This is a title.", "Here is some subtext, and a fancy green tick.", "success" );`

That's the last of the most basic examples, from here on it becaomes easier to start passing in objects:

`swal({
  title: "This is another title.",
  text: "Here is some more subtext, oh, look. There's Bill!",
  imageUrl: "http://fillmurray.com/100/100"
});`

Sidenote: I would recommend using local files for images, otherwise you need to wait for them to load.

You can also responses, take inputs and customise themes:

```
swal({
  title: "This is bill.",
  text: "Do you like Bill?",
  imageUrl: "http://fillMurray.com/100/100",
  showCancelButton: true,
  cancelButtonText: "No.",
  confirmButtonText: "God, yes.",
  confirmButtonColor: "green",
  closeOnConfirm: false,
  closeOnCancel: false
}, function( isConfirm ){
  if( isConfirm ){
    swal({
      title: "You're goddamned right.",
      type: "success"
    })
  } else {
    location = "http://disney.com";
  }
})
```

![didneywurl](http://i.imgur.com/sdhoS4Z.gif)