$( document ).ready(function() {

var anime = ["KUROKO NO BASKET", "BLACK BUTLER", "CARDCAPTOR", "ASSASSINATION CLASSROOM", "INUYASHA", "BLUE EXORCIST", "YONA OF THE DAWN", "YU YU HAKUSHO", "LOG HORIZON", "NIJIIRO DAYS", "MISS KOBAYASHI'S DRAGON MAID", "MY LITTLE MONSTER"];

function buttonMaking(){
// Delete the content inside the div prior to adding new movies
// (this is necessary otherwise you will have repeat buttons)
 $("#BTN").empty();
//for loop for the button already exsisting at the top.
    for(var i = 0; i< anime.length; i++){
//see if it works
	   console.log("test");
//adding the button varaiable and text to corresponding array	
	   var animeBtn = $("<button>");
//anding the shows name onto the buttons 
       animeBtn.text(anime[i]);
//adding the bootstrap class to each button. 	
	   animeBtn.addClass("btn btn-success");
// this class will be use to identify the button
       animeBtn.addClass("animeShows")
//adding an attribute to the button. It will be call on it in the GIF later
	   animeBtn.attr("data-name", anime[i]);
//attaching the button to the chosen div	
	   $("#BTN").append(animeBtn); 
    }
}

// calling the function to show the original buttons when the page first load
buttonMaking();
    
//on click function for user to enter thier own show    
$("#submit").on("click", function(event){
// Preventing the submit button from trying to submit the form
// We're optionally using a form so the user may hit Enter to search instead of clicking the button
//if not your button will appear and disappear becuse of default setting
event.preventDefault();
//taking the user input and making it into a button.Use the trim to remove the white space at the two ends.
var animeAdded = $("#animeShow").val().toUpperCase().trim();
//taking user input and adding it to the array anime
//if user did not typed anything in the input
  if(animeAdded === ""){
    alert("Please enter an anime show");
  }
//Preventing duplicates in array. If it is not in array then add it to the array. 
  else if (anime.indexOf(animeAdded) == -1){
    anime.push(animeAdded);
//after adding it to the array call the function to make it into a button in the designated spot
    buttonMaking();
  }
// prevent repeat entrys to be added to array 
  else{
    alert("Already have that anime enter a different one");
}
//clear the input box after input have been submitted
$("#animeShow").val("");
})

//this function is for gif images to show up on the page, corresponding to what the user has picked 
function getGif(){
//specify the button that the usser pick to run that one not all of them
	userPick = $(this).attr("data-name");
//the url to get gif to seach for the anime that was  pick and put it only show 10 results
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+userPick+"&limit=10&api_key=dc6zaTOxFJmzC";

  $.ajax({
      url: queryURL,
      method: "GET"
//It is a promise when the information finally gather that this function will deploy
    }).done(function(response) {
//making a variable for the response 	
    var results = response.data;
//clearing out the last gif so current gif could fill it up without the old ones there. 
  $("#theGIF").empty();
//a for loop to get all ten response from the gather gif.    
    for(var j = 0; j < results.length; j++){
// debugging purposes
      console.log(response);
//aking a div where all this will go
      var animeDiv = $("<div>")
//making an image
  	  var gifPic = $("<img>");
//creating atttributes 
  //this is the source of the gif that is getting
  	  gifPic.attr("src",results[j].images.fixed_height_still.url);
  //this is the gif when it is not moving 
  	  gifPic.attr('data-still', results[j].images.fixed_height_still.url);
  //this is when the image is moving
  	  gifPic.attr('data-animate', results[j].images.fixed_height.url);
  //this attribute will be call on later use as a way to refer to it
  	  gifPic.attr("data-state", "still");
  //adding a class to it to idenify the images 
      gifPic.addClass("GIF");
  //adding a bootstrap class to the new div. Help in not needing to use floats in the css
      animeDiv.addClass("show col-md-4");
  //adding the text ratings of the gif to the html
      $(animeDiv).append($("<p>").text("Rating: " + results[j].rating));
  //this will attach the gif to the assigned area.
      $(animeDiv).append(gifPic);
  //attaching the new div to the designated area.Better to get use to prepend because it will show up at the top.
      $("#theGIF").prepend(animeDiv);
  }  
});
 }

// Document Event Listeners
/* putting a on click event to the anime buttons. If you don't do it like this new buttons that where
added you wil not get the GIF of new buttons*/
//.animeShows is the class the buttons are and the getGif is the function to get the gif the button corrrespond to
$(document).on("click", ".animeShows", getGif);

/*putting an on click function to the gif images. If you don't do it this button added by the user will not 
have gif images that are animated*/
$(document).on('click', '.GIF', function(){
//making a variable refering to the specify image that the user just click
  var state = $(this).attr('data-state');
//stated that the gif the user click is not moving/still then animate it  
    if ( state == 'still'){
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
//stating that if the image is animating/moving to stop when user click it.      
    }else{
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    };
});

});

