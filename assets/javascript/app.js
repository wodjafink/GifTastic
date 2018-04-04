var topics = ["burgers", "burritos", "chow mein", "sushi", "pizza"]



function MakeGifButton(food){
    console.log("Adding " + food)
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
              for (var i=0; i<results.length;i++){
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var foodImage = $("<img>");
                foodImage.attr("src", results[i].images.fixed_height_still.url);
                foodImage.attr("src2",results[i].images.fixed_height.url)
                foodImage.on("click", function(){
                  var temp = foodImage.attr("src");
                  var temp2 = foodImage.attr("src2");
                  foodImage.attr("src", temp2)
                  foodImage.attr("src2",temp)
                })

                console.log(results[i].images)
                gifDiv.prepend(p);
                gifDiv.prepend(foodImage);

                $("#gifs-appear-here").prepend(gifDiv);
              }
            })
        }
      })
    newButton.text(food);
    // newButton.append($("#food-buttons"))
    $("#food-buttons").append(newButton);
}

$(document).ready(function() { 
  topics.forEach(function(food){
    MakeGifButton(food);
  })
})

$("button").on("click", function() {
  var person = $(this).attr("data-person");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});