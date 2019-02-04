 // Event listener for all button elements
 $("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var animal = $(this).attr("data-animal");

    // Constructing a URL to search Giphy for the name of the animal
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=YFUpAINZjnFoplJMjUd67mwccCauvrU3&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div class='images'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var animalImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and animalImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(animalImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });

    






//animate or still gif


  $(document).on("click", ".images", function() {
    var state = $(this).attr("data-state")
    
    if (state === "still") {
        $(this).attr("data-state", "animate")
        $(this).attr("src", $(this).attr("data-animate"))
        
        
      } else if (state === "animate") {
        $(this).attr("data-state", "still")
        $(this).attr("src", $(this).attr("data-still"))
      }
})