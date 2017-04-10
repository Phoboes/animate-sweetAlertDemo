$(document).ready( function(){

var endAnimation = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

$(".first").on("click", function(){
  $(this).addClass( "animated bounce" );
  $(this).one( endAnimation, function(){
    $(this).removeClass( "animated bounce" );
  } );
});

$('.second').on( "click", function(){
  $(this).addClass( "animated shake" );
  $(this).one( endAnimation, function(){
    $(this).removeClass( "animated shake" );
    $(this).addClass( "animated wobble" );
      $(this).one( endAnimation, function(){
      $(this).removeClass( "animated wobble" );
    });
  });
});

$('.third').on( "click", function(){
$(this).addClass( "animated flipOutX" );
  $(this).one( endAnimation, function(){
    $(this).css( "background-color", "red" );
    $(this).removeClass( "animated flipOutX" );
    $(this).addClass( "animated flipInX" );
      $(this).one( endAnimation, function(){
      $(this).removeClass( "animated flipInX" );
    });
  });
});

$('button').on( "click", function(){
  // swal( "Hello?", "I'm some subtext.", "error" );
  swal({
    title: "Do you love Bill?",
    text: "Like, really?",
    imageUrl: "http://fillmurray.com/100/100",
    // type: "success"
    showCancelButton: true,
    cancelButtonText: "No.",
    cancelButtonColor: "red",
    confirmButtonText: "God, yes.",
    confirmButtonColor: "green",
    closeOnConfirm: false,
    closeOnCancel: false
  }, function( confirm ){
    if( confirm ){
      swal( "Yes.", "You're goddamned right.", "success" );
    } else {
      swal( "No.", "You're an idiot.", "error" );
    }
  });
});


} ); // end docReady