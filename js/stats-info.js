
function showStat(c,d){
    $('#countryName-holder').html('<p class=\'country-name\'>'+c.properties.name+'</p>');
    if(d != null){
        $('#statistics-holder').html('<p>' + c.properties.name + '\'s statistic</p>'+ '<br>'+
                                 '<p> The number of users is ' + d['user'] + '</p>'+'<br>'+
                                 '<p> The number of questions is ' + d['ques'] + '</p>'+'<br>'+
                                 '<p> The number of answers is ' + d['ans'] + '</p>'
        );
    }
    else{
        $('#statistics-holder').html("There is no information for this country.");
    }
}