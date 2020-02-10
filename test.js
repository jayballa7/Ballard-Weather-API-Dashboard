let currentDay = moment().format("L"); //today's date

var cities = JSON.parse(localStorage.getItem("city")) || [];
var cityList = $("#city-list");
var value = localStorage.getItem("city");
var pvalue = JSON.parse(value);

if (pvalue != null) {
    for(var i=0; i <pvalue.length;i++) {
    cityList.prepend("<p>" + pvalue[i] + "</p>");
    //calling the weather for last searched city
    storageCity();
};
} else {
    console.log("There are no items in local storage");
}

//click event when user searches for a city. Generates weather forecast.
 $("#search").click(function(e) {
    e.preventDefault();

    var city = $("#city-search").val(); //user input city
    var cityBox = $("<p>").text(city);
       //prepend in a for loop. compare to see if city matches any local storage items. If it does then don't add it
    cityList.prepend(cityBox);
    cities.push(city);
    localStorage.setItem("city", JSON.stringify(cities));

/*function displayCard() {
if(pvalue = null) {
buildCard();
} else if (city == pvalue[pvalue.length-1]) {
    console.log("City is the same");
} else {
    buildCard();
}
};

displayCard(); */


//if card exists, create another function that deletes it and add to the new one
//need page load method
function buildCard() {
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
};

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

// weather for last searched city

function storageCity() {
    var card1 = $("<div/>");
    card1.addClass("card");
    var cardbody1 = $("<div/>");
    cardbody1.addClass("card-body");
    //var cardtitle1 = $("<h5/>").text(pvalue.charAt(0).toUpperCase() + pvalue.slice(1) + " " + "(" + currentDay + ")");
    var cardtitle1 = $("<h5/>").text(pvalue[pvalue.length - 1].charAt(0).toUpperCase() + pvalue[pvalue.length - 1].slice(1) + " " + "(" + currentDay + ")");
    cardtitle1.addClass("card-title");
    var conditionList = $("<ul/>");
    conditionList.addClass("list-group list-group-flush");


    $(".mainWeather").prepend(card1);
    card1.append(cardbody1, conditionList);
    cardbody1.append(cardtitle1); 

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + pvalue[pvalue.length - 1] + "&appid=775f213dfab0fee9670d3eb1a19750f0&units=imperial";


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
        q: pvalue[0],
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
};
