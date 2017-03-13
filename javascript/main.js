
// REDDIT SCRAPER Showerthoughts -- WORKING
// $.ajax({
//   dataType: "json",
//   url: "https://www.reddit.com/r/showerthoughts/.json",
//   success: function(result){
//     console.log(result);
//     console.log(result.data.children.length);
//     console.log(result.data.children[0].data.ups);
//     let current = 0;
//     for (var i = 0; i < result.data.children.length; i++) {
//       if (result.data.children[i].data.ups >= current) {
//         current = result.data.children[i].data.ups;
//         console.log(current);
//         console.log(result.data.children[i].data.title);
//       }
//     }
//   }
// });

// Horiscope API - WORKING
// $('.zip-search').submit('click', function(e){
//   e.preventDefault();
//   let sunsign = $('#zip-search').val()
//   console.log(sunsign);
// $.ajax({
//   url: `http://galvanize-cors-proxy.herokuapp.com/http://theastrologer-api.herokuapp.com/api/horoscope/${sunsign}/today`,
//   method: 'GET'
// }).then(function(result) {
//   console.log(result);
//   let horo = result.horoscope;
//   $('.test').append(`<h3>${horo}</h3>`)
//   // $('.test').append(`<h4>${quoteAuth}</h4>`)
// }).catch(function(error) {
//   console.log('Error: ', error);
// })
// })

//
// Forismatic - Quote Generator --- WORKING
// $.ajax({
//   url: 'http://galvanize-cors-proxy.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
//   method: 'GET'
// }).then(function(result) {
//   console.log(result.quoteAuthor);
//   let quoteTxt = result.quoteText;
//   let quoteAuth = result.quoteAuthor;
//   // $('.test').append(`<h3>${quoteTxt}</h3>`)
//   // $('.test').append(`<h4>${quoteAuth}</h4>`)
// }).catch(function(error) {
//   console.log('Error: ', error);
// })


// Weather API - OpenWeatherMap --- WORKING
// $('.zip-search').submit('click', function(e){
//   e.preventDefault();
//   let value = $('#zip-search').val()
//   console.log(value);
//   $.ajax({
//     url: `http://api.openweathermap.org/data/2.5/weather\?zip\=${value},us\&units=imperial\&appid\=51e7393da3b7bbeb87a0b2c743c768f9`,
//     method: 'GET'
//   }).then(function(result) {
//     let weatherTemp = result.main.temp;
//     let weatherTempMin = result.main.temp_min;
//     let weatherTempMax = result.main.temp_max;
//     let weatherDescription = result.weather[0].description;
//     let weatherID = result.weather[0].id;
//     let weatherIcon = result.weather[0].icon;
//     let weatherSunrise = result.sys.sunrise;
//     let weatherSunset = result.sys.sunset;
//     console.log(result);
//     $('.test').append(`<h3>${weatherTemp}</h3>`)
//     $('.test').append(`<h3>${weatherDescription}</h3>`)
//     $('.test').append(`<h3>${weatherIcon}</h3><img src="http://openweathermap.org/img/w/${weatherIcon}.png">`)
//     $('.test').append(`<h3>${weatherID}</h3><i class="owf owf-${weatherID} owf-5x"></i>`)
//     $('.test').append(`<h3>${weatherSunset}</h3>`)
//   }).catch(function(error) {
//     console.log('Error: ', error);
//   })
//
// })


// // GIPHY -- Random Gif --- WORKING
// $('.zip-search').submit('click', function(e){
//   e.preventDefault();
//   let value = $('#zip-search').val()
//   console.log(value);
// $.ajax({
//     url: `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${value}`,
//     type: "GET",
//     success: function(result1) {
//       let gifUrl = result1.data.image_url;
//       console.log(gifUrl);
//       $('.test').append(`<img src="${gifUrl}" alt="">`)
//     }
// });
// });



// UNIX TIME to REAL TIME -- CONVERSION
// var sec = 1425909686;
// var date = new Date(sec * 1000);
// var timestr = date.toLocaleTimeString();
//
// console.log(date, timestr);
//
