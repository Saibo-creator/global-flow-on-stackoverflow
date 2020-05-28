function showStat(c, d,worldData,surveyData) {
    $('#countryName-holder').html('<i id="country-flag" ></i> <p class=\'country-name\'>' + c.properties.name + '</p>');
    var classes=[(c.properties.name.toLowerCase()),'flag']
    $("#country-flag").addClass(classes.join(" "));
    $('#countryName-holder').append('<button type="button" class="btn btn-primary btn-lg" id="switch">Switch Direction</button>');
    $('#switch').on('click', function() { 
        direction=switch_in_out(direction);
        //         flows.sort(compareValues('count', order = 'desc'));
        //add flow effect (comment for test)
        flow.selectAll("line").remove();
        circle.selectAll("circle").remove();
        createFlow(iso, flows, direction);
        //appendFlowStat
        console.log(direction)
        appendFlowStat(iso, flows, global.countryData, direction);});

    function switch_in_out(state) {
        return (state=='in' ? 'out' : 'in');
    }

    var country_name = c.properties.name
    if (d != null) {
        $('#statistics-holder').html('<div class=\"country-statistic\">'+
            '<div class=\"user_container\"> <span class=\"num_indicator\"><i class=\"fa fa-users\" aria-hidden=\"true\" style=\"color:white\"></i>&nbsp;&nbsp;Users</span><span class=\"num\">' + d['user'] + '</span></div>' +
            '<div class=\"num_container\">'+
            '<div> <span class=\"num_indicator\"><i class=\"fa fa-question-circle\" aria-hidden=\"true\" style=\"color:white\"></i>&nbsp;&nbsp;Questions</span> <span class=\"num\">' + d['ques'] + '</span></div>' + 
            '<div> <span class=\"num_indicator\"><i class=\"fa fa-comments-o\" aria-hidden=\"true\" style=\"color:white\"></i>&nbsp;&nbsp;Answers</span><span class=\"num\">' + d['ans'] + '</span></div>'+ 
            '</div>'+
            '</div>'
        );
        // console.log(surveyData==null)
        if(surveyData != null){
            $('#statistics-holder').append("<div id=\"userChangeLineChart\" ></div>")
            chartHeight = $('#userChangeLineChart').height()
            chartWidth = $('#userChangeLineChart').width()
            var chart = new CanvasJS.Chart("userChangeLineChart", {
                animationEnabled: true,
                width: chartWidth,
                height: chartHeight,
                // theme: "light2",
                backgroundColor: null,
                title:{
                    text: "Users' Population Over Years",
                    fontSize: 25,
                    fontWeight:"normal",
                    fontFamily: "cursive",
                    fontColor: "white",
                },
                axisX: {
                    title: "Year",
                    lineColor: "white",
                    labelFontColor: "white",
                    titleFontColor: "white",
                    valueFormatString:"####"
                },
                axisY:{
                    includeZero: false,
                    // title: "Population",
                    gridColor: "#f5f5f5",
                    lineColor: "#f5f5f5",
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data: [{        
                    type: "line",
                    lineColor: "#ebe306",
                    color:"#ff7373",
                    indexLabelFontSize: 10,
                    xValueFormatString:"Year ####",
                    dataPoints: [
                    { x: 2014, y: surveyData[0] },
                    { x: 2015, y: surveyData[1] },
                    { x: 2016, y: surveyData[2] },
                    { x: 2017, y: surveyData[3] },
                    { x: 2018, y: surveyData[4] },
                    { x: 2019, y: surveyData[5] },
                    ]
                }]
            });
            chart.render();
            }
        
            else{

                $('#statistics-holder').append("<div id=\"no-info\"><i class=\"fas fa-exclamation-circle\" style=\"color:#ff6666\"></i>&nbsp;&nbsp;There is no information about users' population changing over years for this country.</div>")
            }


        
    } else {
        $('#statistics-holder').append("<div id=\"no-info\"><i class=\"fas fa-exclamation-circle\" style=\"color:#ff6666\"></i>&nbsp;&nbsp;There is no information about users' population changing over years for this country.</div>")
    }
}








function appendFlowStat(iso, flows,countryData,direction ) {
  if (direction == 'in') { flows = flows.filter(function(v) { return v.ques_owner_country == iso; }).slice(0, 20); } else if (direction == 'out') { flows = flows.filter(function(v) { return v.ans_owner_country == iso; }).slice(0, 20); }

    if (flows.length > 0) {
        if (direction == 'in'){
            $('#progress-bar-large').html('<p class="hbar-title">Top 5 knowledge export partners</p><p>(porportional to the largest flow)</p>');
        }
        else {
            $('#progress-bar-large').html('<p class="hbar-title">Top 5 knowledge import partners</p><p>(porportional to the largest flow)</p>');
        }
        
        $('#progress-bar-large').append('<div id="progress-bar"></div>');

        largest_flow_count = flows[0].count;
        progress_bar_class = ["progress-bar progress-bar-animated progress-bar-striped", "progress-bar progress-bar-animated progress-bar-striped bg-success", "progress-bar progress-bar-animated progress-bar-striped bg-info", "progress-bar progress-bar-animated progress-bar-striped bg-warning", "progress-bar progress-bar-animated progress-bar-striped bg-danger"]
        flows.forEach(function(flow, i) {
            if (i <= 4) {
                if (direction == 'in') {
                    $('#progress-bar').append('<div style="margin-top:20px;margin-bottom: 0 px; "><i id="country-flow-flag-' + flow.ans_owner_country + '" ></i> ' + flow.ans_owner_country + ':&nbsp;&nbsp;' + flow.count +  ' Answers</div>');
                    var country_name = countryData[flow.ans_owner_country].Country;
                    // console.log(country_name)
                    var classes = [(country_name.toLowerCase()), 'flag'];
                    $("#country-flow-flag-" + flow.ans_owner_country).addClass(classes.join(" "));
                } else if (direction == 'out') {

                    $('#progress-bar').append('<div style="margin-top:20px;margin-bottom: 0 px; "><i id="country-flow-flag-' + flow.ques_owner_country + '" ></i> ' + flow.ques_owner_country + ':&nbsp;&nbsp;' + flow.count + ' Answers</div>');
                    var country_name = countryData[flow.ques_owner_country].Country;
                    // console.log(country_name)
                    var classes = [(country_name.toLowerCase()), 'flag'];
                    $("#country-flow-flag-" + flow.ques_owner_country).addClass(classes.join(" "));
                }

                

                $('#progress-bar').append('<div class="progress progress-striped active">' +
                    '<div ' + 'id=' + i + ' role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:' + "0%;>" +
                    '<span class="sr-only">' + (flow.count / largest_flow_count * 100).toFixed(1) + '%' + '</span>' +
                    '</div>' +
                    '</div>');
                $('#' + i).addClass(progress_bar_class[i]);
                $('#' + i).animate({ width: (flow.count / largest_flow_count * 100).toFixed(1) + '%' }, 1000);

            }

        });






    } else   {
        $('#progress-bar-large').html('<p class="hbar-title">Flow Information</p>');
        $('#progress-bar-large').append('<div id="progress-bar" style="margin-top:1.5em"></div>');
        $('#progress-bar').html(
            `<div class="alert alert-primary" role="alert">Programmers in the selected area have a relatively low activity rate, \
            thus no evident Q&A exchange flow with other countries was detected. An assumption would be the developers come \
            to Stack Overflow only to find answers to their questions, while not participate in the community by asking, \
            answering, voting for, or commenting on questions.  Hopefully, we will see incremental improvement in this \
            area year over year in terms of .</div>`);


    }
}