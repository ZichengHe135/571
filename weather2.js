function send() {
    var data = document.forms["weather1"]
    var street = data["street"].value
    var city = data["city"].value
    var state = data["state"].value
    if (!data["auto"].checked) {
        if (street == "") {
            alert("Please input a street");
            return false;
        } else if (city == "") {
            alert("Please input a city");
            return false;
        } else if (state == "none") {
            alert("Please input state");
            return false;
        }
    }

    var x = new XMLHttpRequest();
    x.responseType = 'json';
    x.onreadystatechange = function () {
        if (x.readyState === 4 && x.status === 200) {
            console.log(x.response);
            obj = x.response
            write(obj);
        }
    };

    var ret = "?street=" + street + "&&city=" + city + "&&state=" + state;
    if (data["auto"].checked) {
        ret += "&&auto=True";
    } else {
        ret += "&&auto=False";
    }

    // x.open("GET", "http://Localhost:5000/weather" + ret, true);
    x.open("GET", "https://causal-root-328309.wl.r.appspot.com/weather" + ret, true);
    x.send();

    return true;
}

function write(obj) {
    var doc = "";
    doc += "<div class='card'>";
    doc += "<p>";
    doc += obj.card.location;
    doc += "</p>";
    doc += "<img src=\"Images/symbols/";
    var wea = chooseWeather(obj.card.weatherCode);
    doc += wea;
    doc += "\" width='20'>";
    doc += chooseWeather2(obj.card.weatherCode);

    doc += "<table id='cardtable'><tr><th>Humidity</th><th>Pressure</th><th>Wind Speed</th><th>Visibility</th>";
    doc += "<th>Cloud Cover</th><th>UV Level</th></tr>";
    doc += "<tr><td><img src='Images/humidity.png' width='20'></td>";
    doc += "<td><img src='Images/Pressure.png' width='20'></td>";
    doc += "<td><img src='Images/Wind_Speed.png' width='20'></td>";
    doc += "<td><img src='Images/Visibility.png' width='20'></td>";
    doc += "<td><img src='Images/Cloud_Cover.png' width='20'></td>";
    doc += "<td><img src='Images/UV_Level.png' width='20'></td>";
    doc += "</tr><tr>";
    doc += "<td>";
    doc += obj.card.humidity + "%";
    doc += "</td>";
    doc += "<td>";
    doc += obj.card.pressure + "inHg";
    doc += "</td>";
    doc += "<td>";
    doc += obj.card.windSpeed + "mph";
    doc += "</td>";
    doc += "<td>";
    doc += obj.card.visibility + "mi";
    doc += "</td>";
    doc += "<td>";
    doc += obj.card.cloudCover + "%";
    doc += "</td>";
    doc += "<td>";
    doc += obj.card.uvLevel;
    doc += "</td></tr></table>";
    doc += "</div>";

    doc += "<div class='forecast'>"
    doc += "<table>";
    doc += "<table id='forecasttable'><tr><th>Date</th><th>Status</th><th>Temp High</th><th>Temp Low</th>";
    doc += "<th>Wind Speed</th></tr>";
    for (let i = 0; i < obj.forecast.length; i++) {
        doc += "<tr>";
        doc += "<td>";
        doc += obj.forecast[i].date;
        doc += "</td>";
        doc += "<td>";
        doc += "<img src=\"Images/symbols/";
        var wea = chooseWeather(obj.forecast[i].Status);
        doc += wea;
        doc += "\" width='20'>";
        doc += chooseWeather2(obj.forecast[i].Status);
        doc += "</td>";
        doc += "<td>";
        doc += obj.forecast[i].tempHigh;
        doc += "</td>";
        doc += "<td>";
        doc += obj.forecast[i].tempLow;
        doc += "</td>";
        doc += "<td>";
        doc += obj.forecast[i].windSpeed;
        doc += "</td>";
        doc += "</tr>";
    }


    doc += "</table>";
    doc += "</div>";
    document.getElementById("result").innerHTML = doc;
}

function chooseWeather(code) {
    if (code == 4201) {
        return "rain_heavy.svg";
    } else if (code == 4001) {
        return "rain.svg";
    } else if (code == 4200) {
        return "rain_light.svg";
    } else if (code == 6201) {
        return "freezing_rain_heavy.svg";
    } else if (code == 6001) {
        return "freezing_rain.svg";
    } else if (code == 6200) {
        return "freezing_rain_light.svg";
    } else if (code == 6000) {
        return "freezing_drizzle.svg";
    } else if (code == 4000) {
        return "drizzle.svg";
    } else if (code == 7101) {
        return "ice_pellets_heavy.svg";
    } else if (code == 7000) {
        return "ice_pellets.svg";
    } else if (code == 7102) {
        return "ice_pellets_light.svg";
    } else if (code == 5101) {
        return "snow_heavy.svg";
    } else if (code == 5000) {
        return "snow.svg";
    } else if (code == 5100) {
        return "snow_light.svg";
    } else if (code == 5001) {
        return "flurries.svg";
    } else if (code == 8000) {
        return "tstorm.svg";
    } else if (code == 2100) {
        return "fog_light.svg";
    } else if (code == 2000) {
        return "fog.svg";
    } else if (code == 1001) {
        return "cloudy.svg";
    } else if (code == 1102) {
        return "mostly_cloudy.svg";
    } else if (code == 1101) {
        return "partly_cloudy_day.svg";
    } else if (code == 1100) {
        return "mostly_clear_day.svg";
    } else if (code == 1000) {
        return "clear_day.svg";
    }
}

function chooseWeather2(code) {
    if (code == 4201) {
        return "Heavy Rain";
    } else if (code == 4001) {
        return "Rain";
    } else if (code == 4200) {
        return "Light Rain";
    } else if (code == 6201) {
        return "Heavy Freezing Rain";
    } else if (code == 6001) {
        return "Freezing Rain";
    } else if (code == 6200) {
        return "Light Freezing Rain";
    } else if (code == 6000) {
        return "Freezing Drizzle";
    } else if (code == 4000) {
        return "Drizzle";
    } else if (code == 7101) {
        return "Heavy Ice Pellets";
    } else if (code == 7000) {
        return "Ice Pellets";
    } else if (code == 7102) {
        return "Light Ice Pellets";
    } else if (code == 5101) {
        return "Heavy Snow";
    } else if (code == 5000) {
        return "Snow";
    } else if (code == 5100) {
        return "Light Snow";
    } else if (code == 5001) {
        return "Flurries";
    } else if (code == 8000) {
        return "Thunderstorm";
    } else if (code == 2100) {
        return "Light Fog";
    } else if (code == 2000) {
        return "Fog";
    } else if (code == 1001) {
        return "Cloudy";
    } else if (code == 1102) {
        return "Mostly Cloudy";
    } else if (code == 1101) {
        return "Partly Cloudy";
    } else if (code == 1100) {
        return "Mostly Clear";
    } else if (code == 1000) {
        return "Clear";
    }
}

function resetPage() {
    document.getElementsByName("street")[0].value = "";
    document.getElementsByName("city")[0].value = "";
    document.forms["weather1"]["state"].value = "Select your state";
    document.getElementsByName("auto").checked = false;
    document.getElementById("result").innerHTML = "";
}
