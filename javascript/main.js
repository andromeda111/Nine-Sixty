// DATE VARIABLES  and Conversion Functions-- GLOBAL
let getDay;
let getMonth;
let getDate;
let getYear;

function convertDay() {
    switch (getDay) {
        case 0:
            result = 'Sunday';
            break;
        case 1:
            result = 'Monday';
            break;
        case 2:
            result = 'Tuesday';
            break;
        case 3:
            result = 'Wednesday';
            break;
        case 4:
            result = 'Thursday';
            break;
        case 5:
            result = 'Friday';
            break;
        default:
            result = 'Saturday';
            break;
    }
    return result;
}

function convertMonth() {
    switch (getMonth) {
        case 0:
            result = 'January'
            break;
        case 1:
            result = 'February'
            break;
        case 2:
            result = 'March'
            break;
        case 3:
            result = 'April'
            break;
        case 4:
            result = 'May'
            break;
        case 5:
            result = 'June'
            break;
        case 6:
            result = 'July'
            break;
        case 7:
            result = 'August'
            break;
        case 8:
            result = 'September'
            break;
        case 9:
            result = 'October'
            break;
        case 10:
            result = 'November'
            break;
        default:
            result = 'December'
            break;
    }
    return result;
}

// Forismatic - Quote Generator --- WORKING
$.ajax({
    url: 'http://galvanize-cors-proxy.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
    method: 'GET'
}).then(function(result) {
    console.log(result.quoteAuthor);
    let quoteTxt = result.quoteText;
    let quoteAuth = result.quoteAuthor;
    $('.insp-quote-block').append(`<h3>"${quoteTxt}"</h3>`)
    $('.insp-quote-block').append(`<h4>${quoteAuth}</h4>`)
}).catch(function(error) {
    console.log('Error: ', error);
})


// Weather API - OpenWeatherMap --- WORKING
$('.zip-search').submit('click', function(e) {
    e.preventDefault();
    let value = $('#zip-search').val()
    console.log(value);
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather\?zip\=${value},us\&units=imperial\&appid\=51e7393da3b7bbeb87a0b2c743c768f9`,
        method: 'GET'
    }).then(function(result) {
        // Weather Variables
        let weatherTemp = Math.round(result.main.temp);
        let weatherTempMin = Math.round(result.main.temp_min);
        let weatherTempMax = Math.round(result.main.temp_max);
        let weatherDescription = result.weather[0].description;
        let weatherID = result.weather[0].id;
        let weatherIcon = result.weather[0].icon;
        let weatherSunrise = result.sys.sunrise;
        let weatherSunset = result.sys.sunset;
        // Time Variables
        let timestampRise = new Date(`${weatherSunrise}` * 1000);
        let timestampSet = new Date(`${weatherSunset}` * 1000);
        getDay = timestampRise.getDay();
        getMonth = timestampRise.getMonth();
        getDate = timestampRise.getDate();
        getYear = timestampRise.getFullYear();
        let getHoursRise = timestampRise.getHours();
        let getHoursSet = timestampSet.getHours() - 12;
        let getMinutesRise = timestampRise.getMinutes();
        let getMinutesSet = timestampSet.getMinutes();
        // Date Conversions
        let setDay = convertDay();
        let setMonth = convertMonth();
        // API Results
        console.log(result);
        // Append API Results to HTML
        // Date
        $('.intro-section').prepend(`<h1>${setMonth} ${getDate}, ${getYear}</h1>`)
        $('.intro-section').prepend(`<h1>Welcome to ${setDay}</h1>`)
        // Weather
        $('#w-temp').prepend(`<p>${weatherTemp}<sup>&#8457;</sup></p>`)
        $('#w-low').append(`<p>Low: ${weatherTempMin}<sup>&#8457;</sup</p>`)
        $('#w-high').append(`<p>High: ${weatherTempMax}<sup>&#8457;</sup></p>`)
        $('#w-icon').append(`<i class="owf owf-${weatherID} owf-5x">`)
        $('#w-icon').append(`<h4>${weatherDescription}</h4>`)
        $('#w-moon').prepend(`<p>moon phase here</p>`)
        $('#w-sunrise').append(`<p>Sunrise: ${getHoursRise}:${getMinutesRise} a.m.</p>`)
        $('#w-sunset').append(`<p>Sunset: ${getHoursSet}:${getMinutesSet} p.m.</p>`)
        console.log(`AJAX RUN ${getDate}`);
    }).catch(function(error) {
        console.log('Error: ', error);
    })
})


// GIPHY -- Random Gif --- WORKING
$('.zip-search').submit('click', function(e) {
    e.preventDefault();
    let value = $('#zip-search').val()
    console.log(value);
    $.ajax({
        url: `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${value}`,
        type: "GET",
        success: function(result1) {
            let gifUrl = result1.data.image_url;
            console.log(gifUrl);
            $('.gif-block').append(`<img src="${gifUrl}" alt="">`)
        }
    });
});


// Horiscope API - WORKING
$('.zip-search').submit('click', function(e) {
    e.preventDefault();
    let sunsign = $('#zip-search').val()
    console.log(sunsign);
    $.ajax({
        url: `http://galvanize-cors-proxy.herokuapp.com/http://theastrologer-api.herokuapp.com/api/horoscope/${sunsign}/today`,
        method: 'GET'
    }).then(function(result) {
        console.log(result);
        let horoText = result.horoscope;
        $('#h-sign').append(`<p>${sunsign}</p>`)
        $('#h-text').append(`<p>${horoText}</p>`)
        // $('#h-text').append(`<p>${horoAuth}</p>`)
    }).catch(function(error) {
        console.log('Error: ', error);
    })
})


// REDDIT SCRAPER Showerthoughts -- WORKING
$.ajax({
    dataType: "json",
    url: "https://www.reddit.com/r/showerthoughts/.json",
    success: function(result) {
        let current = 0;
        let thought = '';
        let url = result.data.children[0].data.url;
        console.log(result);
        console.log(result.data.children.length);
        console.log(result.data.children[0].data.ups);
        for (var i = 0; i < result.data.children.length; i++) {
            if (result.data.children[i].data.ups >= current) {
                current = result.data.children[i].data.ups;
                console.log(current);
                thought = result.data.children[i].data.title;
            }
        }
        $('#r-showerthought').append(`<p>${thought}</p>`)
        $('#r-showerthought').append(`<p>Via <a href="${url}">reddit.com/r/showerthoughts</a></p>`)
    }
});




console.log(`END OF DATA ${getDate}`);


// UNIX TIME to REAL TIME -- CONVERSION
// var sec = 1425909686;
// var date = new Date(sec * 1000);
// var timestr = date.toLocaleTimeString();
//
// console.log(date, timestr);
//
