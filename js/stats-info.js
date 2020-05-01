
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





function appendFlowStat(iso,flows,){
    console.log(flows);
    flows = flows.filter(function(v) { return v.ans_owner_country == iso ;}).slice(0, 20);
    if(flows != null){
        $('#statistics-holder').append(flows[0].ans_owner_country,
                                 "'s top20 most conneccetd user communities are(in descending order): ");
        flows.forEach(function(flow){console.log(flow.ques_owner_country);
            $('#statistics-holder').append(flow.ques_owner_country,', ')});

         $('#statistics-holder').append(","+ '</p>'+'<br>');
                                 // '<p> The number of questions is ' + d['ques'] + '</p>'+'<br>'+
                                 // '<p> The number of answers is ' + d['ans'] + '</p>'
    }
    else{
        $('#statistics-holder').html("There is no information for this country.");
    }
}