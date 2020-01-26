$(document).ready(function() {
 




    $("#search").click(function(e) {
        e.preventDefault();

        var city = $("#city-search").val();
        var day = $("<h5>");
        day.append(city);
        day.addClass("card-title");
        var mainCard = document.getElementById("titleCard");
        mainCard.append(day);
        var list = document.getElementById("conditions");
        var listItems = $("<li>");
        listItems.addClass("list-group-item");
        console.log(city);


var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=775f213dfab0fee9670d3eb1a19750f0&units=metric";

$.ajax ( {
	url: queryURL,
    method: "GET",
    dataType: "json",
    success: function (response) {


        



    }
})
}); 

}); 
/*
            $.ajax({
                type: "POST",
                url: "http://api.openweathermap.org/data/2.5/weather?id=" + $("#citySelect").val() + "&appid=API-KEY&units=metric",
                dataType: "json",
                success: function (result, status, xhr) {
                    var table = $("<table><tr><th>Weather Description</th></tr>");
 
                    table.append("<tr><td>City:</td><td>" + result["name"] + "</td></tr>");
                    table.append("<tr><td>Country:</td><td>" + result["sys"]["country"] + "</td></tr>");
                    table.append("<tr><td>Current Temperature:</td><td>" + result["main"]["temp"] + "°C</td></tr>");
                    table.append("<tr><td>Humidity:</td><td>" + result["main"]["humidity"] + "</td></tr>");
                    table.append("<tr><td>Weather:</td><td>" + result["weather"][0]["description"] + "</td></tr>");
 
                    $("#message").html(table);
                },
                error: function (xhr, status, error) {
                    alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
        } 
    }); */ 