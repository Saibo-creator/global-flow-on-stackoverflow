

function rgbToHex(rgb) { 
    rgb = Math.round(rgb)
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
}

function fullColorHex(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return "#" + red+green+blue;
};

function hashCode2(str){
	var hash = 0;
	if (str.length == 0) return hash;
	for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);		
        hash = ((hash<<5)-hash)+char;		
        hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

/***
 * Function to retrieve a color hex for heat map
 * 
 * Input:
 *  scale: a float between 0 to 1
 * 
 * Output:
 *  Linearly interpolated color between specified START and END color with ratio specified by the input
 * 
 */
function getHeatMapColor(scale){
    // console.log(scale)
    if (!isFinite(scale) || scale < 0) {
        scale = 0
    }
    var START_R = 255, START_G = 255, START_B = 255;
    var END_R = 6*16+5, END_G = 0, END_B = 16;
    r = START_R * (1-scale) + END_R * (scale);
    g = START_G * (1-scale) + END_G * (scale);
    b = START_B * (1-scale) + END_B * (scale);
    return fullColorHex(r, g, b)
}


let max = Math.log(20949)
// Function to generate country color
function getCountryStyleString(surveyData, d, i, year) {
    let num = 0;
    try {
        if (year > 5) year = 5
        num = (1 - year%1) * surveyData[d.properties.iso_a3][Math.floor(year)]
        if (year < 5) {
            num += (year % 1) * surveyData[d.properties.iso_a3][Math.floor(year) + 1]
        }
    } catch (error) {
    }
    colorFloat = Math.log(num) / max;
    colorString = getHeatMapColor(colorFloat);
    if(num!=0) {return "fill:" + colorString + ";"}
    else{return "fill:" + colorString +";"+" stroke-width:1 !important ;"}
}