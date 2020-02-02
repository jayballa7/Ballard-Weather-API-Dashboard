let currentDay = moment().format("L"); //today's date

var cityList = $("#city-list");
var value = localStorage.getItem("city");
cityList.prepend(value);

 $("#search").click(function(e) {
    e.preventDefault();


    var city = $("#city-search").val(); //user input city
    var cityBox = $("<p>").text(city);
    cityList.prepend(cityBox);

    localStorage.setItem("city", cityList[0].innerHTML);


    var card1 = $("<div/>");
    card1.addClass("card");
    var cardbody1 = $("<div/>");
    cardbody1.addClass("card-body");
    var cardtitle1 = $("<h5/>").text(city.charAt(0).toUpperCase() + city.slice(1) + " " + "(" + currentDay + ")");
    cardtitle1.addClass("card-title");
    var conditionList = $("<ul/>");
    conditionList.addClass("list-group list-group-flush");


    $(".mainWeather").prepend(card1);
    card1.append(cardbody1, conditionList);
    cardbody1.append(cardtitle1);

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=775f213dfab0fee9670d3eb1a19750f0&units=imperial";


$.ajax ( {
	url: queryURL,
    method: "GET",
    success: function(response) {
        let lat = response["coord"]["lat"];
        let lon = response["coord"]["lon"];
        var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=1f612d8ce7686dee99196825b894d777&lat=" + lat + "&lon=" + lon + "&cnt=4";
        
        $.ajax ( {
            url: uvIndexURL,
            method: "GET",
        }).then(function(result) {
            console.log(result);
        
    
    var stats = ["Temperature: " + response["main"]["temp"] + "°F", "Humidity: " + response["main"]["humidity"] + "%", "Windspeed: " + response["wind"]["speed"] + " MPH", "UV Index: " + result["0"]["value"]];
    $.each(stats, function(i) {
        var li = $("<li/>")
            .addClass("list-group-item")
            .appendTo(conditionList);
        var aaa = $('<a/>')
            .text(stats[i])
            .appendTo(li);
    })
    })
    }
})


$.ajax( {
    url: "https://api.openweathermap.org/data/2.5/forecast",
    method: "GET",
    data: {
        q: city,
        appid: "5034b94cc960888f1f3bec4170780656",
        units: "imperial",
        cnt: "5"
      },
      success: function(data) {
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
            $(headerDiv).css("font-weight", "bold");
            var cardBody = $("<div/>");
            cardBody.addClass("card-body");
            var img = $("<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>")
            var tempForecast = $("<p>").text("Temp: " + val.main.temp + "°F");
            var humidityForecast = $("<p>").text("Humidity: " + val.main.humidity + "%");
            
            $(".forecast5").append(colDiv);
            colDiv.append(cardDiv);
            cardDiv.append(headerDiv);
            cardDiv.append(cardBody);
            cardBody.append(img, tempForecast, humidityForecast);
            
        })
      }
})    



});

