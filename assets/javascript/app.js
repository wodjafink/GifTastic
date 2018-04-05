var topics = ["burgers", "burritos", "chow mein", "sushi", "pizza"]

var heightOfImages = 240;

function MakeGifButton(food){
  // jQuery create button element
  var newButton = $('<button/>', {
    text: food, 
    id: 'btn_'+food,
    // Click listener is where the magic happens
    click: function () { 
      // Ajax call in to the giPHY API here, searching for gifs of the food of choice
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response){

          // Empty the container where the gifs go
          $("#gifs-appear-here").empty();

          var results = response.data;
          var divWidth = $("#gifs-appear-here").width();
          var runningWidth = 0;
          var rowIncrement = 0;

          for (var i=0; i<results.length;i++){
            // Create div & associated rating text (easy part)
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            p.css("font-weight","Bold");

            // Create img tag for the gif
            var foodImage = $("<img>");

            // Set src in the beginning for the still, and a second src attribute stores the moving version
            foodImage.attr("src", results[i].images.fixed_height_still.url);
            foodImage.attr("src2",results[i].images.fixed_height.url);

            // The giPHY API returns the width of the gif, so I can use that to plot out the gifs in a grid
            var addingGifWidth = parseInt(results[i].images.fixed_height_still.width);

            // Add these elements
            gifDiv.prepend(foodImage);
            gifDiv.prepend(p);

            // This next part took some creativity
            // Two elements track the absolute position for the gif + surrounding text
            var topStyle = 0;
            var leftStyle = 0;

            // Will adding this image to the row override the width of the view pane?
            if((runningWidth + addingGifWidth + 40) < divWidth){
              // No, then set it to a runningWidth counter (adds up the widths of the gifs)
              leftStyle = runningWidth;
            } else{
              // Yes, then it goes on a new row
              runningWidth = 0;
              leftStyle = 0;
              rowIncrement++;
            }
            // Add in the top position (these are fixed height, but I set this in a global variable to get it how I wanted it)
            topStyle = rowIncrement * heightOfImages
            // Add in the current width to the runningWidth counter plus the margin
            runningWidth += addingGifWidth + 40;

            // Set style from all of the magical math above
            gifDiv.css({
              'position': 'absolute',
              'top': topStyle,
              'left': leftStyle,
              'margin': '20px',
              'margin-top' : '40px',
              'margin-bottom': '40px'
            })

            // Add to the gif view pane
            $("#gifs-appear-here").append(gifDiv);
          }
        })
      }
    })
  // Add button to the button area of the page
  newButton.text(food);
  newButton.attr('class', "btn btn-success")
  newButton.css({'margin' : '2px'})
  $("#food-buttons").append(newButton);
}

// Function takes topics array and creates buttons from each element
function MakeGifButtons(){
  $("#food-buttons").empty();
  topics.forEach(function(food){
    MakeGifButton(food);
  })
}

$(document).ready(function() { 

  MakeGifButtons();

  //Corresponds to the form button only!
  $("#submit-bid").on("click", function(e) {
    e.preventDefault();
    var newFood = $("#bidder-price").val().trim();
    topics.push(newFood)
    MakeGifButtons();
  });

  var gifsAppearHere = $("#gifs-appear-here");

  // click listener on any gif to animate / not animate (I thought this idea was slick personally)
  gifsAppearHere.on("click", "img", function(e){
    var foodImage = $(this);
    var temp = foodImage.attr("src");
    var temp2 = foodImage.attr("src2");
    foodImage.attr("src", temp2)
    foodImage.attr("src2",temp)
  })

})


