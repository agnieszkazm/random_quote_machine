var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&key=867576&format=jsonp&lang=en&jsonp=?";

function getQuote() {
    $.getJSON(quoteUrl, createTweet);
}
//tworzymy tweeta i podpinamy pod buttona do tweetowania
function createTweet(input) {
    var tweetText = "Quote of the day - " + input.quoteText + " Author: " + input.quoteAuthor;
    if (!input.quoteAuthor.length) { //tu bedzie wartosc true jako zaprzeczenie false, a false byłby tylko w wypadku gdyby bylo 0 - czyli brak autora
        input.quoteAuthor = "Unknown author";
    }

    if (tweetText.length > 140) { //max dlugosc dla tweetera
        getQuote(); //generujemy nowe haslo, skoro poprzednie jest za dlugie
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText); //link do generowania nowych tweetow i samego tekstu tweeta
        $('.quote').text(input.quoteText);
        $('.author').text("Author: " + input.quoteAuthor);
        $('.tweet').attr('href', tweet); //wybieramy klase .tweet i modyfikujemy zawartosc atrybutu 'href' na URL tweeta
    }
}

$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    })

});