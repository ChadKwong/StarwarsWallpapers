

//Random Color Function obtained from https://gist.github.com/jdarling/06019d16cb5fd6795edf
var randomColor = (function(){
    var golden_ratio_conjugate = 0.618033988749895;
    var hue = Math.random();

    var hslToRgb = function (hue, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, hue + 1/3);
            g = hue2rgb(p, q, hue);
            b = hue2rgb(p, q, hue - 1/3);
        }

        return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
    };
    
    return function(){
        hue += golden_ratio_conjugate;
        hue %= 1;
        return hslToRgb(hue, 0.5, 0.60);
    };
})();

//Poly function
function poly(xpos, ypos, sides, size, fillColor, strokeColor, strokeWeight){
    var Pts = "";
    var x = xpos, y = ypos;
    var rad = size;
    var ptCount = sides;
    var rot = Math.PI * 2 / ptCount;
    var theta = 0;

    for(var i=0; i<ptCount; i++){
        if(i<ptCount-1){
            Pts += (x + rad*Math.cos(theta)).toString() + ",";
            Pts += (y + rad*Math.sin(theta)).toString() + ",";
        }else{
            Pts += (x + rad*Math.cos(theta)).toString() + ",";
            Pts += (y + rad*Math.sin(theta)).toString();
        }
        theta += rot;
    }
    svg.append("polygon")
        .attr("points", Pts)
        .attr("fill", fillColor)
        .attr("stroke", strokeColor)
        .attr("stroke-width",strokeWeight);
}

//wing function 
function wing(xpos, ypos, size, scale = 1, fillColor = "#101314", strokeColor = "#495B67", strokeWeight = size/20){
    
    //creating wings
    var lWingPts = "";
    var rWingPts = "";
    var x = xpos, y = ypos;
    var rad = size;
    var ptCount = 6;
    var rot = Math.PI * 2 / ptCount;
    var theta = 0;
    //wing outline shape
    for(var i=0; i<ptCount; i++){
        //lWingPts += (100+Math.cos(theta)*40).toString() + ",";
        if(i<ptCount-1){
            //lWingPts += (x + rad*Math.sin(theta)).toString() + ",";
            lWingPts += (x + scale * rad*Math.cos(theta)).toString() + ",";
            lWingPts += (y + rad*Math.sin(theta)).toString() + ",";
        }else{
            //lWingPts += (y + rad*Math.sin(theta)).toString();
            lWingPts += (x + scale * rad*Math.cos(theta)).toString() + ",";
            lWingPts += (y + rad*Math.sin(theta)).toString();
        }
        theta += rot;
    }
    svg.append("polygon")
        .attr("points", lWingPts)
        .attr("fill", fillColor)
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWeight)

    
    //wing inner pattern
    var lWingLines = [];
    //data.push([200+Math.random()*200, 200+Math.random()*200]);
    for(var i=0; i<ptCount/2; i++){
        lWingLines.push(
            (x + scale * rad * Math.cos(theta)).toString() + "," + 
            (y + rad * Math.sin(theta)).toString() + "," + 
            (x + scale * rad * Math.cos(theta + 3 * rot)).toString() + "," + 
            (y + rad * Math.sin(theta + 3 * rot)).toString()
        );
        theta += rot;
        var tieLines = svg.append("polyline")
        .attr("points", lWingLines[i])
        .attr("fill", "none")
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWeight/2);
    };
}
//tie fighter function
function tieFighter(xpos, ypos, size, orientation = "forward", fillColor = "#101314", strokeColor = "#495B67", exhaust = 90){
    

    //Outline color for poly shape
    var polyCol = "#000000";
    polyCol = fillColor;



    //facing slightly right
    if(orientation == "right"){
        //left wing
        wing(xpos - size*.7,ypos, 1.01*size, .25, fillColor, fillColor);
        wing(xpos - size*.7,ypos, size, .25, fillColor, strokeColor);

        //center 
            poly(xpos, ypos, 8, size/3, strokeColor, polyCol, 1);

            //left arm connecting to wing
            var leftArm = "";
                var leftArm2 = "";
                var leftWing = "";
                var leftWing2 = "";
                //leftarm1
                    leftArm += (xpos + size/2.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/1.45 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    //middle point
                    leftArm += (xpos + size/1.4 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos).toString() + ",";

                    leftArm += (xpos + size/1.45 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos + size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos + size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos + size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.7 * Math.cos(7 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3 * Math.sin(7 * Math.PI / 6)).toString();

                //leftarm2
                    //upper
                    leftArm2 += (xpos + size/2.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos - size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos - size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos - size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos - size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos - size*.09).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos - size*.11).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos - size*.125).toString() + ",";

                    leftArm2 += (xpos - size*.7).toString() + ",";
                    leftArm2 += (ypos - size*.15).toString() + ",";

                    //middle point
                    leftArm2 += (xpos - size*.75).toString() + ",";
                    leftArm2 += (ypos - size*.09).toString() + ",";

                    leftArm2 += (xpos - size*.75).toString() + ",";
                    leftArm2 += (ypos + size*.09).toString() + ",";

                    //lower
                    leftArm2 += (xpos - size*.7).toString() + ",";
                    leftArm2 += (ypos + size*.15).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos + size*.125).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos + size*.11).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos + size*.09).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos + size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos + size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos + size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos + size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString() + ",";

                    leftArm2 += (xpos + size/2.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString();

                //circle on the wing
                svg.append("circle")
                    .attr("cx", (xpos - size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", fillColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/40)
                    .attr("r", size/10);
                svg.append("polygon")
                    .attr("points", leftArm)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("polygon")
                    .attr("points", leftArm2)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("circle")
                    .attr("cx", (xpos - size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", strokeColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/40)
                    .attr("r", size/20);


            //right arm connecting to wing
            var rightArm = "";
            var rightArm2 = "";
            var rightWing = "";
            var rightWing2 = "";

                //rightarm1
                    rightArm += (xpos - size/3.95 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/1.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    //middle point
                    rightArm += (xpos - size/1.65 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos).toString() + ",";

                    rightArm += (xpos - size/1.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos + size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos + size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos + size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3.95 * Math.cos(7 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3 * Math.sin(7 * Math.PI / 6)).toString();

                //rightarm2
                    //upper
                    rightArm2 += (xpos - size/3.95 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos - size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos - size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos - size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos - size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos - size*.09).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos - size*.11).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos - size*.125).toString() + ",";

                    rightArm2 += (xpos + size*.7).toString() + ",";
                    rightArm2 += (ypos - size*.15).toString() + ",";

                    //middle point
                    rightArm2 += (xpos + size*.75).toString() + ",";
                    rightArm2 += (ypos - size*.09).toString() + ",";

                    rightArm2 += (xpos + size*.75).toString() + ",";
                    rightArm2 += (ypos + size*.09).toString() + ",";

                    //lower
                    rightArm2 += (xpos + size*.7).toString() + ",";
                    rightArm2 += (ypos + size*.15).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos + size*.125).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos + size*.11).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos + size*.09).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos + size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos + size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos + size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos + size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString() + ",";

                    rightArm2 += (xpos - size/3.95 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString();

                //circle on the wing
                svg.append("circle")
                    .attr("cx", (xpos + size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", fillColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/40)
                    .attr("r", size/10);
                svg.append("polygon")
                    .attr("points", rightArm)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("polygon")
                    .attr("points", rightArm2)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("circle")
                    .attr("cx", (xpos + size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", strokeColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/40)
                    .attr("r", size/20);
                
        //center 
            //outline shape
            poly(xpos, ypos, 40, size/3, strokeColor, polyCol, 1);
            var center = [];

                center += (xpos).toString() + ",";
                center += (ypos + size * .06).toString() + ",";

                center += (xpos + size * .09).toString() + ",";
                center += (ypos + size * .025).toString() + ",";

                center += (xpos + size * .09).toString() + ",";
                center += (ypos - size * .025).toString() + ",";

                center += (xpos).toString() + ",";
                center += (ypos - size * .06).toString() + ",";

                center += (xpos - size * .09).toString() + ",";
                center += (ypos - size * .025).toString() + ",";

                center += (xpos - size * .09).toString() + ",";
                center += (ypos + size * .025).toString() + ",";

                center += (xpos).toString() + ",";
                center += (ypos + size * .06).toString();
            svg.append("circle")
                .attr("cx", xpos)
                .attr("cy", ypos)
                .attr("r", size * .175)
                .attr("fill", fillColor)
                .attr("stroke", polyCol)
                .attr("stroke-width", 1);
            svg.append("circle")
                .attr("cx", xpos)
                .attr("cy", ypos)
                .attr("r", size * .15)
                .attr("fill", strokeColor)
                .attr("stroke", polyCol)
                .attr("stroke-width", 1);
            svg.append("polygon")
                .attr("points", center)
                .attr("fill", "#263640")
                .attr("stroke", "red")
                .attr("stroke-width", size/exhaust);

        //right wing
        wing(xpos + size*.7,ypos, size*1.01, .25, fillColor, fillColor);
        wing(xpos + size*.7,ypos, size, .25, fillColor, strokeColor);
    }


    //facing slightly left
    if(orientation == "left"){
        
        //right wing
        wing(xpos + size*.7,ypos, size*1.01, .25, fillColor, fillColor);
        wing(xpos + size*.7,ypos, size, .25, fillColor, strokeColor);


        //center 
            poly(xpos, ypos, 8, size/3, strokeColor, polyCol, 1);                  

            //left arm connecting to wing
            var leftArm = "";
                var leftArm2 = "";
                var leftWing = "";
                var leftWing2 = "";
                //leftarm1
                    leftArm += (xpos + size/2.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/1.45 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    //middle point
                    leftArm += (xpos + size/1.4 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos).toString() + ",";

                    leftArm += (xpos + size/1.45 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos + size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos + size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos + size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.7 * Math.cos(7 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3 * Math.sin(7 * Math.PI / 6)).toString();

                //leftarm2
                    //upper
                    leftArm2 += (xpos + size/2.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos - size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos - size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos - size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos - size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos - size*.09).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos - size*.11).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos - size*.125).toString() + ",";

                    leftArm2 += (xpos - size*.7).toString() + ",";
                    leftArm2 += (ypos - size*.15).toString() + ",";

                    //middle point
                    leftArm2 += (xpos - size*.75).toString() + ",";
                    leftArm2 += (ypos - size*.09).toString() + ",";

                    leftArm2 += (xpos - size*.75).toString() + ",";
                    leftArm2 += (ypos + size*.09).toString() + ",";

                    //lower
                    leftArm2 += (xpos - size*.7).toString() + ",";
                    leftArm2 += (ypos + size*.15).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos + size*.125).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos + size*.11).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos + size*.09).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos + size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos + size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos + size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos + size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString() + ",";

                    leftArm2 += (xpos + size/2.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString();

                //circle on the wing
                svg.append("circle")
                    .attr("cx", (xpos - size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", fillColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/40)
                    .attr("r", size/10);
                svg.append("polygon")
                    .attr("points", leftArm)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("polygon")
                    .attr("points", leftArm2)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("circle")
                    .attr("cx", (xpos - size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", strokeColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/40)
                    .attr("r", size/20);
                
            //right arm connecting to the wing
            
            //right arm connecting to wing
            var rightArm = "";
            var rightArm2 = "";
            var rightWing = "";
            var rightWing2 = "";

                //rightarm1
                    rightArm += (xpos - size/3.95 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/1.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    //middle point
                    rightArm += (xpos - size/1.65 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos).toString() + ",";

                    rightArm += (xpos - size/1.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos + size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos + size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos + size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3.95 * Math.cos(7 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3 * Math.sin(7 * Math.PI / 6)).toString();

                //rightarm2
                    //upper
                    rightArm2 += (xpos - size/3.95 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos - size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos - size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos - size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos - size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos - size*.09).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos - size*.11).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos - size*.125).toString() + ",";

                    rightArm2 += (xpos + size*.7).toString() + ",";
                    rightArm2 += (ypos - size*.15).toString() + ",";

                    //middle point
                    rightArm2 += (xpos + size*.75).toString() + ",";
                    rightArm2 += (ypos - size*.09).toString() + ",";

                    rightArm2 += (xpos + size*.75).toString() + ",";
                    rightArm2 += (ypos + size*.09).toString() + ",";

                    //lower
                    rightArm2 += (xpos + size*.7).toString() + ",";
                    rightArm2 += (ypos + size*.15).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos + size*.125).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos + size*.11).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos + size*.09).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos + size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos + size*.075).toString() + ",";

                    // rightArm2 += (xpos + size*.645).toString() + ",";
                    // rightArm2 += (ypos + size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos + size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos + size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString() + ",";

                    rightArm2 += (xpos - size/3.95 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString();

                //circle on the wing
                svg.append("circle")
                    .attr("cx", (xpos + size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", fillColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/40)
                    .attr("r", size/10);
                svg.append("polygon")
                    .attr("points", rightArm)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("polygon")
                    .attr("points", rightArm2)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("circle")
                    .attr("cx", (xpos + size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", strokeColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/40)
                    .attr("r", size/20);

        
        //center 
            //outline shape
            poly(xpos, ypos, 40, size/3, strokeColor, polyCol, 1);
            var center = [];

                center += (xpos).toString() + ",";
                center += (ypos + size * .06).toString() + ",";

                center += (xpos + size * .09).toString() + ",";
                center += (ypos + size * .025).toString() + ",";

                center += (xpos + size * .09).toString() + ",";
                center += (ypos - size * .025).toString() + ",";

                center += (xpos).toString() + ",";
                center += (ypos - size * .06).toString() + ",";

                center += (xpos - size * .09).toString() + ",";
                center += (ypos - size * .025).toString() + ",";

                center += (xpos - size * .09).toString() + ",";
                center += (ypos + size * .025).toString() + ",";

                center += (xpos).toString() + ",";
                center += (ypos + size * .06).toString();
            svg.append("circle")
                .attr("cx", xpos)
                .attr("cy", ypos)
                .attr("r", size * .175)
                .attr("fill", fillColor)
                .attr("stroke", polyCol)
                .attr("stroke-width", 1);
            svg.append("circle")
                .attr("cx", xpos)
                .attr("cy", ypos)
                .attr("r", size * .15)
                .attr("fill", strokeColor)
                .attr("stroke", polyCol)
                .attr("stroke-width", 1);
            svg.append("polygon")
                .attr("points", center)
                .attr("fill", "#263640")
                .attr("stroke", "red")
                .attr("stroke-width", size/exhaust);
                

        //left wing
        wing(xpos - size*.7,ypos, 1.01*size, .25, fillColor, fillColor);
        wing(xpos - size*.7,ypos, size, .25, fillColor, strokeColor);
    }
        
    //facing forward
    if(orientation == "forward"){

            //left arm connecting to wing
                var leftArm = "";
                var leftArm2 = "";
                var leftWing = "";
                var leftWing2 = "";
                //leftarm1
                    leftArm += (xpos + size/2.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/1.45 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    //middle point
                    leftArm += (xpos + size/1.4 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos).toString() + ",";

                    leftArm += (xpos + size/1.45 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos + size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos + size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos + size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    leftArm += (xpos + size/2.7 * Math.cos(7 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm += (ypos - size/3 * Math.sin(7 * Math.PI / 6)).toString();

                //leftarm2
                    //upper
                    leftArm2 += (xpos + size/2.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos - size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos - size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos - size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos - size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos - size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos - size*.09).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos - size*.11).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos - size*.125).toString() + ",";

                    leftArm2 += (xpos - size*.7).toString() + ",";
                    leftArm2 += (ypos - size*.15).toString() + ",";

                    //middle point
                    leftArm2 += (xpos - size*.75).toString() + ",";
                    leftArm2 += (ypos - size*.09).toString() + ",";

                    leftArm2 += (xpos - size*.75).toString() + ",";
                    leftArm2 += (ypos + size*.09).toString() + ",";

                    //lower
                    leftArm2 += (xpos - size*.7).toString() + ",";
                    leftArm2 += (ypos + size*.15).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos + size*.125).toString() + ",";

                    leftArm2 += (xpos - size*.675).toString() + ",";
                    leftArm2 += (ypos + size*.11).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos + size*.09).toString() + ",";

                    leftArm2 += (xpos - size*.66).toString() + ",";
                    leftArm2 += (ypos + size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos + size*.075).toString() + ",";

                    leftArm2 += (xpos - size*.645).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString() + ",";

                    leftArm2 += (xpos - size*.635).toString() + ",";
                    leftArm2 += (ypos + size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos + size*.06).toString() + ",";

                    leftArm2 += (xpos - size*.61).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString() + ",";

                    leftArm2 += (xpos + size/2.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    leftArm2 += (ypos + size*.05).toString();

                // left Wing
                    leftWing += (xpos - size * .695).toString() + ",";
                    leftWing += (ypos - size * .85).toString() + ",";

                    leftWing += (xpos - size * .715).toString() + ",";
                    leftWing += (ypos - size * .86).toString() + ",";

                    leftWing += (xpos - size * .735).toString() + ",";
                    leftWing += (ypos - size * .85).toString() + ",";

                    leftWing += (xpos - size * .735).toString() + ",";
                    leftWing += (ypos + size * .85).toString() + ",";

                    leftWing += (xpos - size * .715).toString() + ",";
                    leftWing += (ypos + size * .86).toString() + ",";

                    leftWing += (xpos - size * .695).toString() + ",";
                    leftWing += (ypos + size * .85).toString() + ",";

                    leftWing += (xpos - size * .695).toString() + ",";
                    leftWing += (ypos - size * .85).toString();
                
                // left Wing 2
                    leftWing2 += (xpos - size * .705).toString() + ",";
                    leftWing2 += (ypos - size * .9).toString() + ",";

                    leftWing2 += (xpos - size * .725).toString() + ",";
                    leftWing2 += (ypos - size * .9).toString() + ",";

                    leftWing2 += (xpos - size * .725).toString() + ",";
                    leftWing2 += (ypos + size * .9).toString() + ",";

                    leftWing2 += (xpos - size * .705).toString() + ",";
                    leftWing2 += (ypos + size * .9).toString() + ",";

                    leftWing2 += (xpos - size * .705).toString() + ",";
                    leftWing2 += (ypos - size * .9).toString();

                svg.append("polygon")
                    .attr("points", leftArm)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("polygon")
                    .attr("points", leftArm2)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("polygon")
                    .attr("points", leftWing)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("polygon")
                    .attr("points", leftWing2)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                

            //right arm connecting to wing
                var rightArm = "";
                var rightArm2 = "";
                var rightWing = "";
                var rightWing2 = "";

                //rightarm1
                    rightArm += (xpos - size/3.95 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/1.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    //middle point
                    rightArm += (xpos - size/1.65 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos).toString() + ",";

                    rightArm += (xpos - size/1.7 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos + size/5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos + size/3.5 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3.2 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos + size/3 * Math.sin(5 * Math.PI / 6)).toString() + ",";

                    rightArm += (xpos - size/3.95 * Math.cos(7 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm += (ypos - size/3 * Math.sin(7 * Math.PI / 6)).toString();

                //rightarm2
                    //upper
                    rightArm2 += (xpos - size/3.95 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos - size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos - size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos - size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos - size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos - size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos - size*.09).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos - size*.11).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos - size*.125).toString() + ",";

                    rightArm2 += (xpos + size*.7).toString() + ",";
                    rightArm2 += (ypos - size*.15).toString() + ",";

                    //middle point
                    rightArm2 += (xpos + size*.75).toString() + ",";
                    rightArm2 += (ypos - size*.09).toString() + ",";

                    rightArm2 += (xpos + size*.75).toString() + ",";
                    rightArm2 += (ypos + size*.09).toString() + ",";

                    //lower
                    rightArm2 += (xpos + size*.7).toString() + ",";
                    rightArm2 += (ypos + size*.15).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos + size*.125).toString() + ",";

                    rightArm2 += (xpos + size*.675).toString() + ",";
                    rightArm2 += (ypos + size*.11).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos + size*.09).toString() + ",";

                    rightArm2 += (xpos + size*.66).toString() + ",";
                    rightArm2 += (ypos + size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos + size*.075).toString() + ",";

                    rightArm2 += (xpos + size*.645).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString() + ",";

                    rightArm2 += (xpos + size*.635).toString() + ",";
                    rightArm2 += (ypos + size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos + size*.06).toString() + ",";

                    rightArm2 += (xpos + size*.61).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString() + ",";

                    rightArm2 += (xpos - size/3.95 * Math.cos(5 * Math.PI / 6) + size/20).toString() + ",";
                    rightArm2 += (ypos + size*.05).toString();

                // right Wing
                    rightWing += (xpos + size * .695).toString() + ",";
                    rightWing += (ypos - size * .85).toString() + ",";

                    rightWing += (xpos + size * .715).toString() + ",";
                    rightWing += (ypos - size * .86).toString() + ",";

                    rightWing += (xpos + size * .735).toString() + ",";
                    rightWing += (ypos - size * .85).toString() + ",";

                    rightWing += (xpos + size * .735).toString() + ",";
                    rightWing += (ypos + size * .85).toString() + ",";

                    rightWing += (xpos + size * .715).toString() + ",";
                    rightWing += (ypos + size * .86).toString() + ",";

                    rightWing += (xpos + size * .695).toString() + ",";
                    rightWing += (ypos + size * .85).toString() + ",";

                    //this xpos is causing an error but is still displaying shape correctly
                    rightWing += (xpos + .695 * size).toString() + ",";
                    rightWing += (ypos).toString();
                    console.log(rightWing);
                
                // right Wing 2
                    rightWing2 += (xpos + size * .705).toString() + ",";
                    rightWing2 += (ypos - size * .9).toString() + ",";

                    rightWing2 += (xpos + size * .725).toString() + ",";
                    rightWing2 += (ypos - size * .9).toString() + ",";

                    rightWing2 += (xpos + size * .725).toString() + ",";
                    rightWing2 += (ypos + size * .9).toString() + ",";

                    rightWing2 += (xpos + size * .705).toString() + ",";
                    rightWing2 += (ypos + size * .9).toString() + ",";

                    rightWing2 += (xpos + size * .705).toString() + ",";
                    rightWing2 += (ypos - size * .9).toString();
                //circle on the wing
                svg.append("ellipse")
                    .attr("cx", (xpos + size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", fillColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/90)
                    .attr("rx", size/100)
                    .attr("ry", size/10);
                svg.append("polygon")
                    .attr("points", rightArm)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("polygon")
                    .attr("points", rightArm2)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("ellipse")
                    .attr("cx", (xpos + size*.7).toString())
                    .attr("cy", ypos.toString())
                    .attr("fill", strokeColor)
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", size/90)
                    .attr("rx", size/100)
                    .attr("ry", size/10);
                svg.append("polygon")
                    .attr("points", rightWing)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);
                svg.append("polygon")
                    .attr("points", rightWing2)
                    .attr("fill", strokeColor)
                    .attr("stroke", polyCol)
                    .attr("stroke-width", 1);

        //center 
            //outline shape
            poly(xpos, ypos, 40, size/3, strokeColor, polyCol, 1);
            var center = [];

                center += (xpos).toString() + ",";
                center += (ypos + size * .06).toString() + ",";

                center += (xpos + size * .09).toString() + ",";
                center += (ypos + size * .025).toString() + ",";

                center += (xpos + size * .09).toString() + ",";
                center += (ypos - size * .025).toString() + ",";

                center += (xpos).toString() + ",";
                center += (ypos - size * .06).toString() + ",";

                center += (xpos - size * .09).toString() + ",";
                center += (ypos - size * .025).toString() + ",";

                center += (xpos - size * .09).toString() + ",";
                center += (ypos + size * .025).toString() + ",";

                center += (xpos).toString() + ",";
                center += (ypos + size * .06).toString();
            svg.append("circle")
                .attr("cx", xpos)
                .attr("cy", ypos)
                .attr("r", size * .175)
                .attr("fill", fillColor)
                .attr("stroke", polyCol)
                .attr("stroke-width", 1);
            svg.append("circle")
                .attr("cx", xpos)
                .attr("cy", ypos)
                .attr("r", size * .15)
                .attr("fill", strokeColor)
                .attr("stroke", polyCol)
                .attr("stroke-width", 1);
            svg.append("polygon")
                .attr("points", center)
                .attr("fill", "#263640")
                .attr("stroke", "red")
                .attr("stroke-width", size/exhaust);
    }

    

}

//ring planet function

//xwing function
