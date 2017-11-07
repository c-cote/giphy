
      // Initial array of topics
      var topics = ["Inuyasha", "Sesshomaru", "Sango", "Kilala", "Kagome", "Kohaku"];

      // Function for dumping the JSON content for each button into the div
      function displayTopicInfo() {

        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var topicDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var topicImage = $("<img>");

            // Setting the src attribute of the image to a property pulled off the result item
            topicImage.attr("src", results[i].images.fixed_height.url);
            topicImage.attr("data-state", "animate");
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("class", "gif");

            // Appending the paragraph and image tag to the animalDiv
            topicDiv.append(p);
            topicDiv.append(topicImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#topics-view").prepend(topicDiv);
          }

          renderButtons();
        });
      }

      // Function for displaying topic data
      function renderButtons() {

        // Deleting the buttons prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of topic to our button
          a.addClass("topic btn-warning");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        // Adding the topic from the textbox to our array
        topics.push(topic);
        console.log(topics)

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
      });

      // Function for displaying the topic info
      // Using $(document).on instead of $(".topic").on to add event listenersto dynamically generated elements
      $(document).on("click", ".topic", displayTopicInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(document).on("click", ".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).data("state");
      console.log(this);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).data("state", "animate");
        console.log("Switched state: " +$(this).data("state"));
      } else {
        $(this).attr("src", $(this).data("still"));
        $(this).data("state", "still");
        console.log("Switched state: " + $(this).data("state"));
      }
    });

