var topics = ["burgers", "burritos", "chow mein", "sushi", "pizza"]

var numberAcross = 4,
    widthOfImages = heightOfImages = 240;

function MakeGifButton(food){
    var newButton = $('<button/>', {
        text: food, //set text 1 to 10
        id: 'btn_'+food,
        click: function () { 
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            food + "&api_key=dc6zaTOxFJmzC&limit=10";

          $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response){
              $("#gifs-appear-here").empty();
              var results = response.data;
              var divWidth = $("#gifs-appear-here").width();
              // console.log("Working with " + divWidth)
              var runningWidth = 0;
              var rowIncrement = 0;
              for (var i=0; i<results.length;i++){

                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var foodImage = $("<img>");

                foodImage.attr("src", results[i].images.fixed_height_still.url);
                foodImage.attr("src2",results[i].images.fixed_height.url);

                var addingGifWidth = parseInt(results[i].images.fixed_height_still.width);

                gifDiv.prepend(foodImage);
                gifDiv.prepend(p);

                var topStyle = 0;
                var leftStyle = 0;

                if((runningWidth + addingGifWidth + 40) < divWidth){
                  console.log("Add to current row")
                  leftStyle = runningWidth;
                } else{
                  console.log("Add to next row")
                  runningWidth = 0;
                  leftStyle = 0;
                  rowIncrement++;
                }

                topStyle = rowIncrement * heightOfImages

                runningWidth += addingGifWidth + 40;

                gifDiv.css({
                  'position': 'absolute',
                  'top': topStyle,
                  'left': leftStyle,
                  'margin': '20px',
                  'margin-top' : '40px',
                  'margin-bottom': '40px'
                })

                $("#gifs-appear-here").append(gifDiv);
              }
            })
        }
      })
    newButton.text(food);
    newButton.attr('class', "btn btn-success")
    newButton.css({'margin' : '2px'})
    // newButton.append($("#food-buttons"))
    $("#food-buttons").append(newButton);
}

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
    // MakeGifButton(newFood)
    MakeGifButtons();
  });

  var gifsAppearHere = $("#gifs-appear-here");

  gifsAppearHere.on("click", "img", function(e){
    var foodImage = $(this);
    var temp = foodImage.attr("src");
    var temp2 = foodImage.attr("src2");
    foodImage.attr("src", temp2)
    foodImage.attr("src2",temp)
  })

})


