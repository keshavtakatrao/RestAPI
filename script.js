let data = fetch("https://restcountries.eu/rest/v2/all");

data
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    var country = response;
    var totalCountry = country.length;
    var rowCount = Math.ceil(totalCountry / 3);
    var num = 0;
    for (i = 0; i < rowCount; i++) {
      var row = document.createElement("div");
      row.setAttribute("class", "row");

      for (j = num; j < num + 3 && num < totalCountry - 1; j++) {
        var col = card(country[j]);

        row.append(col);
      }
      document.getElementById("container").append(row);
      num = num + 3;
    }
  })
  .catch(function (err) {
    var error = document.createElement("h1");
    error.innerHTML = "Error Occured";
    document.body.append(err);
    console.log(err);
  });

function card(country) {
  var column = document.createElement("div");
  column.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");
  var card = document.createElement("div");
  card.setAttribute("class", "card");

  var img = document.createElement("img");
  img.setAttribute("src", country.flag);
  img.setAttribute("class", "card-img-top img-fluid");
  img.setAttribute("alt", country.name);

  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  var title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  title.innerHTML = country.name;

  var code = document.createElement("p");
  code.setAttribute("class", "card-text");
  code.innerHTML = "Country Code : " + country.alpha2Code;

  var capital = document.createElement("p");
  capital.setAttribute("class", "card-text");
  capital.innerHTML = "Capital : " + country.capital;

  var population = document.createElement("p");
  population.setAttribute("class", "card-text");
  population.innerHTML = "Capital : " + country.population;

  var region = document.createElement("p");
  region.setAttribute("class", "card-text");
  region.innerHTML = "Region : " + country.region;

  var btn = document.createElement("button");
  btn.setAttribute("class", "btn btn-primary");
  btn.innerHTML = " Get Weather Info";
  btn.addEventListener("click", function () {
    var Weather = fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        country.capital +
        "&units=metric&appid=f5e288dcda1759580ee479b64f045e0e"
    );

    Weather.then(function (res) {
      return res.json();
    }).then(function (res) {
      let weatherData = res;
      let weather = weatherData.weather[0].main;
      let temp = weatherData.main.temp;
      alert(country.name+"\nWeather : "+ weather+'\nTempreature : '+temp+'C');
    })
    .catch(function(err){
        alert('error fetching data')
    });
  });

  cardBody.append(title, code, capital, region, population, btn);
  card.append(img, cardBody);
  column.append(card);

  return column;
}
