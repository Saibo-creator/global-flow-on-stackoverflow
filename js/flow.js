//
function showUp(labelId){
    return function(){
        console.log(labelId + " mouseover bind again")
        d3.select(labelId).style("display", "block");
    }
}

function showOff(labelId){
    return function(){
        console.log(labelId + " mouseout bind again")
        d3.select(labelId).style("display", "none");
    }
}

function onFlowMouseOver(iso){
    return function(){
        d3.select("#countryLabel" + iso).select('text').style("fill", "#FFFAFF");
        d3.select("#country" + iso).style("stroke","#fff").style("stroke-width","1")
    }
    
}
function onFlowMouseOut(iso){
    return function(){
        d3.select("#countryLabel" + iso).select('text').style("fill", "black");
        d3.select("#country" + iso).style("stroke-width","0")
    }
   
}



//function to create flow with animation
function createFlow(iso, flows, direction) {
    //clear last state
    let relatedLabelid = []
    $('.countryLabelOffmouseout').each(function () {
        let id = "#" + this.id
        d3.select(id).select('text').classed("countryNameSourceFlow", false)
        d3.select(id).select('text').classed("countryName", true)
        d3.select(id).classed("countryLabelOffmouseout", false)
        
        d3.select(id).on("mouseout",showOff(id))
        d3.select(id).on("mouseover",showUp(id))
        d3.select(id).style("display", "none");
    });

    $('.countryOffmouseout').each(function () {
        let id = "#" + this.id
        let labelId = "#countryLabel" + this.id.split('country')[1]
        // d3.select(id).select('text').classed("countryNameSourceFlow", false)
        d3.select(id).classed("countryOffmouseout", false)
        d3.select(id).on("mouseout",showOff(labelId))
        d3.select(id).on("mouseover",showUp(labelId))
        // d3.select(labelId).style("display", "none");
    });

    //flow mouvement start state
    if (direction == "out") {

        flows = flows.filter(function(v) { return v.ques_owner_country == iso }).slice(0, 20);

        for (var i = 0; i < flows.length; i++) {
            iso = flows[i].ans_owner_country;
            
            if (iso != flows[i].ques_owner_country) {
                d3.select("#countryLabel" + iso).select('text').attr('class', 'countryNameSourceFlow');

                d3.select("#countryLabel" + iso).on("mouseout",onFlowMouseOut(iso))
                d3.select("#countryLabel" + iso).on("mouseover",onFlowMouseOver(iso))
                d3.select("#countryLabel" + iso).attr('class','countryLabelOffmouseout')

                d3.select("#country" + iso).on("mouseout",onFlowMouseOut(iso))
                d3.select("#country" + iso).on("mouseover",onFlowMouseOut(iso))
                d3.select("#country" + iso).attr('class','countryOffmouseout')
                d3.select("#countryLabel" + iso).style("display", "block");
            }
        }


    } else if (direction == "in") {

        flows = flows.filter(function(v) { return v.ans_owner_country == iso }).slice(0, 20);

        for (var i = 0; i < flows.length; i++) {
            iso = flows[i].ques_owner_country;
            if (iso != flows[i].ans_owner_country) {
                d3.select("#countryLabel" + iso).select('text').attr('class', 'countryNameSourceFlow');

                d3.select("#countryLabel" + iso).on("mouseout",onFlowMouseOut(iso))
                d3.select("#countryLabel" + iso).on("mouseover",onFlowMouseOver(iso))
                d3.select("#countryLabel" + iso).attr('class','countryLabelOffmouseout')
                
                d3.select("#country" + iso).on("mouseout",onFlowMouseOut(iso))
                d3.select("#country" + iso).on("mouseover",onFlowMouseOut(iso))
                d3.select("#country" + iso).attr('class','countryOffmouseout')
                d3.select("#countryLabel" + iso).style("display", "block");
            }
        }

    }

    flow.selectAll("line")
        .data(flows)
        .enter()
        .append("line")
        .attr('class', 'line')
        .attr("x1", d => projection([d.long_ques, d.lat_ques])[0])
        .attr("y1", d => projection([d.long_ques, d.lat_ques])[1])
        .attr("x2", d => projection([d.long_ques, d.lat_ques])[0])
        .attr("y2", d => projection([d.long_ques, d.lat_ques])[1])
        .attr("marker-end", function(d) {
            if (d.ques_owner_country != d.ans_owner_country) return "url(#arrow)";
            else return "none";
        });


    //circles intial state
    circle.selectAll("circle")
        .data(flows)
        .enter()
        .append("circle")
        .attr('class', 'circle')
        .attr("cx", d => projection([d.long_ques, d.lat_ques])[0])
        .attr("cy", d => projection([d.long_ques, d.lat_ques])[1])
        .attr('r', 40)
        .attr('id', d => 'circle' + d.ques_owner_country);






    flow.selectAll("line")
        .data(flows)
        .transition()
        .duration(1000)
        .attr("x1", d => projection([d.long_ques, d.lat_ques])[0])
        .attr("y1", d => projection([d.long_ques, d.lat_ques])[1])
        .attr("x2", d => projection([d.long_ans, d.lat_ans])[0])
        .attr("y2", d => projection([d.long_ans, d.lat_ans])[1])
        .attr("marker-end", function(d) {
            if (d.ques_owner_country != d.ans_owner_country) return "url(#arrow)";
            else return "none";
        });

    //circles final sate
    circle.selectAll("circle")
        .data(flows)
        .transition()
        .duration(1000)
        .attr("cx", d => projection([d.long_ans, d.lat_ans])[0])
        .attr("cy", d => projection([d.long_ans, d.lat_ans])[1])
        .attr("r", 2);

    // showing selected countries label on click







    //circle mouvement
    var subcircle = circle.append("g")
        .attr("id", "subcircle");

    var circleMove = subcircle.selectAll("circle")
        .data(flows)
        .enter()
        .append("circle")
        .attr('class', 'circle')
        .attr('r', 7)
        .attr('id', d => 'CircleMouve' + d.ques_owner_country);




    function circleMouvement() {

        circleMove
            .data(flows)
            .attr('cx', d => projection([d.long_ques, d.lat_ques])[0]) // position the circle at 40 on the x axis
            .attr('cy', d => projection([d.long_ques, d.lat_ques])[1]) // position the circle at 250 on the y axis
            .transition() // apply a transition
            .duration(2000) // apply it over 2000 milliseconds
            .ease(d3.easeLinear)
            .attr('cx', d => projection([d.long_ans, d.lat_ans])[0]) // move the circle to 920 on the x axis
            .attr('cy', d => projection([d.long_ans, d.lat_ans])[1])
            .attr("r", 7)
            .on("end", circleMouvement); // when the transition finishes start again
    }


    circleMouvement();





};