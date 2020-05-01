//function to create flow with animation
function createFlow(iso, flows) {

    flows = flows.filter(function(v) { return v.ans_owner_country == iso }).slice(0, 20);
    flow.selectAll("line")
        .data(flows)
        .enter()
        .append("line")
        .attr('class', 'line')
        .attr("x1", d => projection([d.long_ques, d.lat_ques])[0])
        .attr("y1", d => projection([d.long_ques, d.lat_ques])[1])
        .attr("x2", d => projection([d.long_ques, d.lat_ques])[0])
        .attr("y2", d => projection([d.long_ques, d.lat_ques])[1])
        .attr("stroke-width", 1)
        .attr("stroke", "pink")
        .attr("marker-end", "url(#arrow)");

    circle.selectAll("circle")
        .data(flows)
        .enter()
        .append("circle")
        .attr('class', 'circle')
        .attr('r',20)
        .attr('id',d=>'circle'+d.ques_owner_country);




circle.selectAll("circle").each(function(d,i){
    var circleTime=circle.select("#circle"+d.ques_owner_country);
    console.log("circleTime",circleTime);
    console.log(d,i);
    cx1=projection([d.long_ques, d.lat_ques])[0];
    cy1=projection([d.long_ques, d.lat_ques])[1];
    cx2=projection([d.long_ans, d.lat_ans])[0];
    cy2=projection([d.long_ans, d.lat_ans])[1];
    circleMouvement(circleTime,cx1,cy1,cx2,cy2);

});





    flow.selectAll("line")
        .data(flows)
        .transition()
        .duration(1000)
        .attr("x1", d => projection([d.long_ques, d.lat_ques])[0])
        .attr("y1", d => projection([d.long_ques, d.lat_ques])[1])
        .attr("x2", d => projection([d.long_ans, d.lat_ans])[0])
        .attr("y2", d => projection([d.long_ans, d.lat_ans])[1])
        .attr("stroke-width", d => (
            d.count / 4000 > 2 ? d.count / 4000 : 2))
        // })(order === 'desc') ? (comparison * -1) : comparison
        .attr("stroke", "pink")
        .attr("marker-end", "url(#arrow)");

        // circle.selectAll("circle")
        //     .data(flows)
        //     .transition()
        //     .duration(1000)
        //     .attr("cx", d => projection([d.long_ans, d.lat_ans])[0])
        //     .attr("cy", d => projection([d.long_ans, d.lat_ans])[1])
        //     .attr("r", d => (
        //         d.count / 4000 > 2 ? d.count / 4000 : 2));

        // circle.selectAll("circle")
        //     .data(flows)
        //     .transition()
        //     .duration(0)
        //     .attr("cx", d => projection([d.long_ques, d.lat_ques])[0])
        //     .attr("cy", d => projection([d.long_ques, d.lat_ques])[1])
        //     .attr("r", d => (
        //         d.count / 4000 > 2 ? d.count / 4000 : 2));






    for (var i = 0; i < flows.length; i++) {
        iso = flows[i].ques_owner_country;
        d3.select("#countryLabel" + iso).style("display", "block");
        if (iso != flows[i].ans_owner_country) {
            d3.select("#countryLabel" + iso).select('text').attr('class', 'countryNameSourceFlow');
        }
    }




}






function circleMouvement(circle,cx1,cy1,cx2,cy2) { 

    console.log(circle);
    repeat(circle,cx1,cy1,cx2,cy2);
    var n=0;
    function repeat(circle,cx1,cy1,cx2,cy2) {
      circle
        .attr('cx', cx1)      // position the circle at 40 on the x axis
        .attr('cy', cy1)     // position the circle at 250 on the y axis
        .transition()        // apply a transition
        .duration(2000)      // apply it over 2000 milliseconds
        .attr('cx', cx2)     // move the circle to 920 on the x axis
        .attr('cy', cy2)
        .transition()        // apply a transition
        .duration(2000)      // apply it over 2000 milliseconds
        .attr('cx', cx1)      // return the circle to 40 on the x axis
        .attr('cy', cy1);
        //.on("end", repeat(circle,cx1,cy1,cx2,cy2));  // when the transition finishes start again
        n+=1;
        if (n<4) {
            repeat(circle,cx1,cy1,cx2,cy2);
        }
    };

};
