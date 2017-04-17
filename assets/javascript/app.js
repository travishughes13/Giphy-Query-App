// This is the array that contains the buttons
var animals = ['dog', 'cat', 'turtle', 'bird', 'lion', 'tiger', 'bear'];


// This function renders the buttons
function renderButtons() {
    for (var i = 0; i < animals.length; i++) {
        $('#sloth').append('<button id="button" style="margin-right: 15px">' + animals[i] + '</button>');
    }
};


// This calls the buttons to be rendered
renderButtons();


// This grabs the input values from the form and creates the button
$("#giveittomebaby").on("click", function() {

        event.preventDefault();

        var entry = $('#takethis').val().trim();

        animals.push(entry);

        $('#sloth').append('<button id="button" style="margin-right: 15px">' + entry + '</button>');

        $("#takethis").val("");

});


// This creates the gif images and allows them to be played/paused
$(document).on("click", "button", function() {
      document.getElementById('putithere').innerHTML = "";
      var animal = $(this).text();
      console.log(animal);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=12";
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
        	var results = response.data;
        	for (var i = 0; i < 12; i++) {
            	var gifDiv = $("<div class='item'>");
            	var rating = results[i].rating;
            	var p = $("<p>").text("Rating: " + rating);
            	var animalImage = $("<img>");
            		animalImage.attr("src", results[i].images.fixed_height_still.url);
            		animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            		animalImage.attr("data-animate", results[i].images.fixed_height.url);
            		animalImage.attr("data-state", 'still');
            		animalImage.attr("id", 'gif');
            		gifDiv.attr("style", "float: left");
            		p.attr("id", "rating");
            		gifDiv.prepend(p);
            		gifDiv.prepend(animalImage);
            		$("#putithere").prepend(gifDiv);
        }
        // This animates the gif
 		$("img").on("click", function() {
    		var state = $(this).attr("data-state");
    		console.log(state);
    			if (state === "still") {
        			$(this).attr("src", $(this).attr("data-animate"));
        			$(this).attr("data-state", "animate");
    			} else {
        			$(this).attr("src", $(this).attr("data-still"));
        			$(this).attr("data-state", "still");
    	}
    });
        });
    });
