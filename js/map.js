// DEFINE VARIABLES
// Define size of map group
// Full world map is 2:1 ratio
// Using 12:5 because we will crop top and bottom of map
w = 3000;
h = 1250;
// variables for catching min and max zoom factors
var minZoom;
var maxZoom;

var infoWidth = $('body').width();
// DEFINE FUNCTIONS/OBJECTS
// Define map projection
var projection = d3.geoEquirectangular()
    .center([0, 15]) // set centre to further North as we are cropping more off bottom of map
    .scale([w / (2 * Math.PI)]) // scale to fit group width
    .translate([w  / 2, h / 2]); // ensure centred in group

// Define map path
var path = d3.geoPath()
    .projection(projection);

// Create function to apply zoom to countriesGroup
function zoomed() {
    t = d3.event.transform;
    countriesGroup.attr("transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")");
    countryLabelGroup.attr("transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")");
    flow.attr("transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")");
    circle.attr("transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")");
}
// Define map zoom behaviour
var zoom = d3.zoom()
    .on("zoom", zoomed);

function getTextBox(selection) {
    selection.each(function(d) {
        d.bbox = this
            .getBBox();
    });
}

// Function that calculates zoom/pan limits and sets zoom to default value 
function initiateZoom() {
    // Define a "minzoom" whereby the "Countries" is as small possible without leaving white space at top/bottom or sides
    minZoom = Math.max($("#map-holder").width() / w, $("#map-holder").height() / h);
    // set max zoom to a suitable factor of this value
    maxZoom = 20 * minZoom;
    // set extent of zoom to chosen values
    // set translate extent so that panning can't cause map to move out of viewport
    zoom.scaleExtent([minZoom, maxZoom])
        .translateExtent([
            [0, 0],
            [w, h]
        ]);
    // define X and Y offset for centre of map to be shown in centre of holder
    midX = ($("#map-holder").width() - minZoom * w) / 2;
    midY = ($("#map-holder").height() - minZoom * h) / 2;
    // change zoom transform to min zoom and centre offsets
    svg.call(zoom.transform, d3.zoomIdentity.translate(midX, midY).scale(minZoom));
}





//function used to sort data based on value
function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}



// on window resize
$(window).resize(function() {
    // Resize SVG
    svg.attr("width", $("#map-holder").width())
        .attr("height", $("#map-holder").height());
    initiateZoom();
});

// create an SVG
var svg = d3.select("#map-holder")
    .append("svg")
    // set to the same size as the "map-holder" div
    .attr("width", $("#map-holder").width())
    .attr("height", $("#map-holder").height())
    .attr("id", "svg")
    // add zoom functionality
    .call(zoom);

var top50 = ['USA', 'IND', 'GBR', 'DEU', 'CHN', 'CAN', 'BRA', 'FRA', 'RUS', 'AUS', 'PAK', 'POL', 'NLD', 'ESP', 'IDN', 'ITA', 'TUR', 'PHL', 'VNM', 'BGD', 'IRN',
    'UKR', 'SWE', 'EGY', 'MEX', 'ISR', 'ZAF', 'KOR', 'ROU', 'NGA', 'BEL', 'CHE', 'ARG', 'SGP', 'LKA', 'JPN', 'MYS', 'PRT', 'DNK', 'IRL', 'AUT',
    'COL', 'GRC', 'NZL', 'MAR', 'NOR', 'NPL', 'THA', 'CZE', 'HUN'
];
var countriesGroup = svg.append("g").attr("id", "countriesGroup");

var flow = svg.append('g')
    .attr('id', 'flow');

var circle = svg.append("g")
    .attr("id", "circle");

var barChart = svg.append("g")
    .attr("id", "barChart");

countryLabelGroup = svg.append("g").attr("id", "countryLabelGroup");

//add graphic objects defs
var defs = svg.append('defs')
    .attr("id", "defs");




localStorage.setItem("direction","out");

var countries
var surveyData = {}

$(document).ready(function() {
    //get country data
    let countryData, worldData;
    $.getJSON("data/country_data.json", function(data) {
        countryData = data
        worldData = countryData["WORLD"]
    });

    //let use choose direction
    $('#inward').on('click', function() { direction = 'in' })
    $('#outward').on('click', function() { direction = 'out' })



    d3.csv("./data/flow_betw_country.csv", function(data) {
        flows = data;
        flows.forEach(function(d) { d.count = +d.count; });

        // array is sorted by user in descending order
        flows.sort(compareValues('count', order = 'desc'));
        //Bind data and create one path per GeoJSON feature

    });

    d3.csv("./data/survey_particp_14_19.csv", function(data) {
        data.forEach(function(d) { 
            surveyData[d.iso3] = [parseInt(d['2014']),parseInt(d['2015']),parseInt(d['2016']),parseInt(d['2017']),parseInt(d['2018']),parseInt(d['2019'])]
        });

    });
    // get map data
    d3.json("data/world.geo.json", function(json) {
        //Bind data and create one path per GeoJSON feature
        // add a background rectangle
        countriesGroup.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", w)
            .attr("height", h);

        // draw a path for each feature/country
        countries = countriesGroup.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("id", function(d, i) {
                return "country" + d.properties.iso_a3;
            })
            .attr("class", "country")
            .attr("style", function(d, i) {
                return getCountryStyleString(surveyData, d, i, 0);
            })
            //      .attr("stroke-width", 10)
            //      .attr("stroke", "#ff0000")

            // add a mouseover action to show name label for feature/country
            .on("mouseover", function(d, i) {
                d3.select("#countryLabel" + d.properties.iso_a3).style("display", "block");
            })
            .on("mouseout", function(d, i) {
                d3.select("#countryLabel" + d.properties.iso_a3).style("display", "none");
            })
            // add an onclick action to zoom into clicked country
            .on("click", function(d, i) {
                let direction = localStorage.getItem("direction");

                d3.selectAll(".country").classed("country-on", false);
                d3.select(this).classed("country-on", true);
                if (d.properties.iso_a3 in countryData) {
                    let cData = countryData[d.properties.iso_a3]
                    showStat(d, cData,worldData,surveyData[d.properties.iso_a3]);
                } else {
                    showStat(d, null,worldData,surveyData[d.properties.iso_a3]);
                }
                //add flow effect (comment for test)
                flow.selectAll("line").remove();
                circle.selectAll("circle").remove();
                let iso = d.properties.iso_a3;
                $('.countryLabelOffmouseout').each(function () {
                    let id = "#" + this.id
                    d3.select(id).style("display", "none");
                    d3.select(id).on("mouseout",function(){
                        d3.select(id).style("display", "none");
                    })
                    d3.select(id).classed("countryLabelOffmouseout", false)
                });
                $('.countryOffmouseout').each(function () {
                    let id = "#countryLabel" + this.id.split('country')[1]
                    d3.select(id).style("display", "none");
                    d3.select(id).on("mouseout",function(){
                        d3.select(id).style("display", "none");
                    })
                    d3.select(id).classed("countryOffmouseout", false)
                });
                createFlow(iso, flows, direction);
                appendFlowStat(d.properties.iso_a3, flows,countryData);
            });



        // Add a label group to each feature/country. This will contain the country name and a background rectangle
        // Use CSS to have class "countryLabel" initially hidden


        countryLabels = countryLabelGroup.selectAll("g")
            .data(json.features)
            .enter()
            .append("g")
            .attr("class", "countryLabel")
            .attr("id", function(d) {
                return "countryLabel" + d.properties.iso_a3;
            })
            .attr("transform", function(d) {
                if (d.properties.iso_a3 == "USA") {
                    return (
                        "translate(" + (path.centroid(d)[0] + 100) + "," + (path.centroid(d)[1] + 50) + ")"
                    );
                } else {
                    return (
                        "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
                    );
                }
            })
            // add mouseover functionality to the label
            .on("mouseover", function(d, i) {
                d3.select(this).style("display", "block");
            })
            .on("mouseout", function(d, i) {
                d3.select(this).style("display", "none");

            })
            // add an onlcick action to zoom into clicked country
            .on("click", function(d, i) {
                d3.selectAll(".country").classed("country-on", false);
                d3.select("#country" + d.properties.iso_a3).classed("country-on", true);
                if (d.properties.iso_a3 in countryData) {
                    let cData = countryData[d.properties.iso_a3]
                    showStat(d, cData,worldData,surveyData[d.properties.iso_a3]);
                } else {
                    showStat(d, null,worldData,surveyData[d.properties.iso_a3]);
                }
                $('.countryLabelOffmouseout').each(function () {
                    let id = "#" + this.id
                    d3.select(id).style("display", "none");
                    d3.select(id).on("mouseout",function(){
                        d3.select(id).style("display", "none");
                    })
                    d3.select(id).classed("countryLabelOffmouseout", false)
                });
                
                $('.countryOffmouseout').each(function () {
                    let id = "#countryLabel" + this.id.split('country')[1]
                    d3.select(id).style("display", "none");
                    // console.log(id)
                    d3.select(id).on("mouseout",function(){
                        d3.select(id).style("display", "none");
                    })
                    d3.select(id).classed("countryOffmouseout", false)
                });
                // //add flow effect
                // flow.selectAll("line").remove();
                // createFlow(d.properties.iso_a3, flows);


            });
        // add the text to the label group showing country name
        countryLabels.append("text")
            .attr("class", "countryName")
            .style("text-anchor", "middle")
            .attr("dx", 0)
            .attr("dy", 0)
            .text(function(d) {
                return d.properties.name;
            })
            .call(getTextBox);

        // add a background rectangle the same size as the text
        countryLabels.insert("rect", "text")
            .attr("class", "countryLabelBg")
            .attr("transform", function(d) {
                return "translate(" + (d.bbox.x - 2) + "," + d.bbox.y + ")";
            })
            .attr("width", function(d) {
                return d.bbox.width + 4;
            })
            .attr("height", function(d) {
                return d.bbox.height;
            });
        initiateZoom();
    });

    d3.select('.countryNameSourceFlow').on("mouseover",function(e){
        console.log(e.target.id)
        d3.select(e.target.id).style("fill","white")
    })
    d3.select('.countryNameSourceFlow').on("mouseout", function(e){
        d3.select(e.target.id).style("fill","black")
    })
});


// $('.country').mouseover(function(){
//     $(this).style("display", "block");
// });

// $('.country').mouseout(function(){
//     $(this).style("display", "none");
// })