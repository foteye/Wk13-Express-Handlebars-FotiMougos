$(function() {
    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");

        var newDevouredState = {
            devoured: !newDevoured
        };
        
        $.ajax("/api/burgers/" + id, {
            type: "POST",
            data: newDevouredState
        }).then(
            function() {
              console.log("changed devoured to", newDevoured);
              location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
              console.log("created new burger");
              location.reload();
            }
        );
    });
});
