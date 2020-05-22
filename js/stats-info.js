function showStat(c, d) {
    $('#countryName-holder').html('<i id="country-flag" ></i> <p class=\'country-name\'>' + c.properties.name + '</p>');
    var classes=[(c.properties.name.toLowerCase()),'flag']
    $("#country-flag").addClass(classes.join(" "));
    $('#countryName-holder').append('<button type="button" class="btn btn-primary btn-lg" id="switch">Switch Direction</button>');
    $('#switch').on('click', function() { localStorage.setItem("direction", switch_in_out(localStorage.getItem("direction")));});
    // 获取值

    function switch_in_out(state) {
        return (state=='in' ? 'out' : 'in');
    }

    direc = localStorage.getItem("direction");
    console.log(direc);
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








function appendFlowStat(iso, flows ) {
    flows = flows.filter(function(v) { return v.ans_owner_country == iso; }).slice(0, 20);
    if (flows != null) {
        $('#statistics-holder').append(flows[0].ans_owner_country,
            "'s top20 most conneccetd user communities are(in descending order): ");
        flows.forEach(function(flow, i) {
            $('#statistics-holder').append(flow.ques_owner_country, ', ');

        });
        $('#statistics-holder').append('</p>' + '<br>');
        $('#statistics-holder').append();

        $('#progress-bar-large').html('<div id="progress-bar-large"><p class="hbar-title">Top5 flows</p>');
        $('#progress-bar-large').append('<div id="progress-bar">');
        largest_flow_count = flows[0].count;
        progress_bar_class = ["progress-bar progress-bar-animated progress-bar-striped", "progress-bar progress-bar-animated progress-bar-striped bg-success", "progress-bar progress-bar-animated progress-bar-striped bg-info", "progress-bar progress-bar-animated progress-bar-striped bg-warning", "progress-bar progress-bar-animated progress-bar-striped bg-danger"]
        flows.forEach(function(flow, i) {
            if (i <= 4) {
                $('#progress-bar').append('<div style="margin-top:30px;margin-bottom: 0 px; ">' + flow.ques_owner_country + ':' + flow.count + '</div>')
                $('#progress-bar').append('<div class="progress progress-striped active">' +
                    '<div ' + 'id=' + i + ' role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:' + "0%;>"+
                    '<span class="sr-only">'+(flow.count / largest_flow_count * 100).toFixed(1) + '%'+'</span>' +
                    '</div>' +
                    '</div>');
                $('#' + i).addClass(progress_bar_class[i]);
                $('#' + i).animate({width: (flow.count / largest_flow_count * 100).toFixed(1) + '%'  }, 1000);

            }


        });






    } else {
        $('#statistics-holder').html("There is no information for this country.");
    }
}