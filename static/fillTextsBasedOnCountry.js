/**
 * Created by Iurii Sergiichuk on 31.05.2015.
 */
var textIsSet = false;
var userCountry = null;
var fullfillTextDiv = function (country_data) {
    $(data['blockId']).text('');
    $.each(country_data, function (key, value) {
        $(data['blockId']).append($("<p></p>").text(value));
    });
};
$.ajax({
    url: '//www.telize.com/geoip',
    type: 'POST',
    cache: false,
    dataType: 'jsonp',
    success: function (location) {
        var country_code = location.country_code;
        if (userCountry == null)
            userCountry = location.country;
        var country_data = data[country_code];
        if (!textIsSet && country_data != null) {
            fullfillTextDiv(country_data);
            textIsSet = true;
        }
    }
});
$.ajax({
    url: '//ip-api.com/json',
    type: 'POST',
    cache: false,
    dataType: 'jsonp',
    success: function (location) {
        var country_code = location.countryCode;
        if (userCountry == null)
            userCountry = location.country;
        var country_data = data[country_code];
        if (!textIsSet && country_data != null) {
            fullfillTextDiv(country_data);
            textIsSet = true;
        }
    }
});
$.ajax({
    url: '//freegeoip.net/json/',
    type: 'POST',
    cache: false,
    dataType: 'jsonp',
    success: function (location) {
        var country_code = location.country_code;
        var country_data = data[country_code];
        if (userCountry == null)
            userCountry = location.country;
        if (!textIsSet && country_data != null) {
            fullfillTextDiv(country_data);
            textIsSet = true;
        }
    }
});
// show error if there is no user info in 5 seconds
setTimeout(function () {
    if (!textIsSet) {
        textIsSet = true;
        $(data['blockId']).append($("<p></p>").text(error_text + userCountry));
    }
}, 10000);