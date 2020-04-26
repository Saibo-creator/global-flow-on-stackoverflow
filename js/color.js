

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
    var START_R = 0, START_G = 255, START_B = 0;
    var END_R = 255, END_G = 0, END_B = 0;
    scale %= 1;
    r = START_R * (1-scale) + END_R * (scale);
    g = START_G * (1-scale) + END_G * (scale);
    b = START_B * (1-scale) + END_B * (scale);
    return fullColorHex(r, g, b)
}


// Function to generate country color
function getCountryStyleString(d, i) {
    colorFloat = Math.abs(hashCode2(d.properties.name)) / 1000;
    colorString = getHeatMapColor(colorFloat);
    return "fill:" + colorString + ";"
}