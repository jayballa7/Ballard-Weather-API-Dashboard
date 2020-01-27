
 $("#search").click(function(e) {
    e.preventDefault();

    var city = $("#city-search").val(); //user input city
    let currentDay = moment().format("L"); //today's date
    var day = document.getElementById("cityName"); //header to display city name and date
    day.textContent = city.charAt(0).toUpperCase() + city.slice(1) + " " + "(" + currentDay + ")";




var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=775f213dfab0fee9670d3eb1a19750f0&units=imperial";


$.ajax ( {
	url: queryURL,
    method: "GET",
}).then(function(response) {
    console.log(response);

    let lat = response["coord"]["lat"];
    let lon = response["coord"]["lon"];
    var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=1f612d8ce7686dee99196825b894d777&lat=" + lat + "&lon=" + lon + "&cnt=4";
    $.ajax ( {
        url: uvIndexURL,
        method: "GET",
    }).then(function(result) {
        console.log(result);
    


var stats = ["Temperature: " + response["main"]["temp"] + "°F", "Humidity: " + response["main"]["humidity"] + "%", "Windspeed: " + response["wind"]["speed"] + " MPH", "UV Index: " + result["0"]["value"]];
var conditionList = $("ul.conditions");
$.each(stats, function(i) {
    var li = $("<li/>")
        .addClass("list-group-item")
        .appendTo(conditionList);
    var aaa = $('<a/>')
        .text(stats[i])
        .appendTo(li);

})
})

})

var key = "5034b94cc960888f1f3bec4170780656";
var forecast = "https://api.openweathermap.org/data/2.5/forecast";


$.ajax( {
    url: forecast,
    method: "GET",
    data: {
        q: city,
        appid: key,
        units: "imperial",
        cnt: "5"
      },
      success: function(data) {
        console.log('Received data:', data) // For testing
        var forecastH3 = $("<h3/>").text("5 Day Forecast");
        $(".forecastHeader").append(forecastH3);
        $.each(data.list, function(index, val) {
            m = moment().add(1 + index, "days").format("L");  
            var colDiv = $("<div/>");
            colDiv.addClass("col-sm-2");
            var cardDiv = $("<div/>");
            cardDiv.addClass("card text-white bg-info mb-3");
            $(cardDiv).css("width", "10rem");
            var headerDiv = $("<div/>").text(m);
            headerDiv.addClass("card-header");
            var cardBody = $("<div/>");
            cardBody.addClass("card-body");
            var tempForecast = $("<p>").text("Temp: " + val.main.temp + "°F");
            var humidityForecast = $("<p>").text("Humidity: " + val.main.humidity + " %");
            
            $(".forecast5").append(colDiv);
            colDiv.append(cardDiv);
            cardDiv.append(headerDiv);
            cardDiv.append(cardBody);
            cardBody.append(tempForecast);
            cardBody.append(humidityForecast);
            



           /* tempForecast.appendTo(shortList);
            shortList.appendTo(cardBody);
            cardBody.appendTo(cardDiv);
            headerDiv.appendTo(cardDiv);
            cardDiv.appendTo(colDiv);
            colDiv.appendTo(row);
            console.log(tempForecast);*/  
        })
      }
})    



}); 


/*       success: function(data) {
        console.log('Received data:', data) // For testing
        var wf = "";
        wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
        $.each(data.list, function(index, val) {
          wf += "<p>" // Opening paragraph tag
          wf += "<b>Day " + index + "</b>: " // Day
          wf += val.main.temp + "&degC" // Temperature
          wf += "<span> | " + val.weather[0].description + "</span>"; // Description
          wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
          wf += "</p>" // Closing paragraph tag
        });
        var row = document.getElementsByClassName("forecast5");
        $(".forecast5").html(wf);
        console.log(row);
      } */

