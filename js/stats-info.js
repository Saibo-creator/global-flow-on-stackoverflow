function showStat(c, d) {
    $('#countryName-holder').html('<p class=\'country-name\'>' + c.properties.name + '</p>');
    if (d != null) {
        $('#statistics-holder').html('<p>' + c.properties.name + '\'s statistic</p>' + '<br>' +
            '<p> The number of users is ' + d['user'] + '</p>' + '<br>' +
            '<p> The number of questions is ' + d['ques'] + '</p>' + '<br>' +
            '<p> The number of answers is ' + d['ans'] + '</p>'
        );
    } else {
        $('#statistics-holder').html("There is no information for this country.");
    }
}





function appendFlowStat(iso, flows, ) {
    console.log(flows);
    flows = flows.filter(function(v) { return v.ans_owner_country == iso; }).slice(0, 20);
    if (flows != null) {
        $('#statistics-holder').append(flows[0].ans_owner_country,
            "'s top20 most conneccetd user communities are(in descending order): ");
        flows.forEach(function(flow, i) {
            console.log(flow.ques_owner_country);
            $('#statistics-holder').append(flow.ques_owner_country, ', ')

        });
        $('#statistics-holder').append('</p>' + '<br>');
        $('#statistics-holder').append()

        $('#progress-bar-large').html('<div id="progress-bar-large"><p class="hbar-title">Top5 flows</p>')
        $('#progress-bar-large').append('<div id="progress-bar">');
        largest_flow_count = flows[0].count
        progress_bar_class=["progress-bar progress-bar-striped progress-bar-animated","progress-bar-animated progress-bar-striped bg-success","progress-bar-animated progress-bar-striped bg-info","progress-bar-animated progress-bar-striped bg-warning","progress-bar-animated progress-bar-striped bg-danger" ]
        flows.forEach(function(flow, i) {
            if (i <= 4) {
                $('#progress-bar').append('<div style="margin-top:30px;margin-bottom: 0 px; ">'+flow.ques_owner_country+':'+flow.count+'</div>')
                $('#progress-bar').append('<div class="progress progress-striped active">' +
                    '<div ' + 'id='+i+' role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:' + flow.count / largest_flow_count * 100 + '%' + ';">' +
                    '<span class="sr-only">90% 完成（成功）</span>' +
                    '</div>' +
                    '</div>');
                $('#'+i).addClass(progress_bar_class[i]);

            }


        });






    } else {
        $('#statistics-holder').html("There is no information for this country.");
    }
}