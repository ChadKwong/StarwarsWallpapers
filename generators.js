//star generator
function starGenerator(count, starColor = "random"){
    for(var i=0; i<count; i++){
        var xpos = Math.random() * (w);
        var ypos = Math.random() * (h);
        var size = Math.random() * 3;
        var starCol;
        if(starColor = "random"){starCol = randomColor();}
        else if(starColor = "randomHSL"){starCol = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)"}
        else{starCol = starColor};

        
        if (size > 1){
            svg.append("circle")
            .attr("cx", xpos)
            .attr("cy", ypos)
            .attr("r", size)
            .attr("fill", "ffffff");
        } else if(size < 1){
            svg.append("circle")
                .attr("cx", xpos)
                .attr("cy", ypos)
                .attr("r", size)
                .attr("fill", starCol);
        } else{
            svg.append("circle")
            .attr("cx", xpos)
            .attr("cy", ypos)
            .attr("r", size)
            .attr("fill", "#ffffff");
        }
    }
}

let randcol = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)"

//spot generator function to be used for spots in planet generator  = Math.random() * (.75 * w)  = Math.random() * (.75 * h)
function spotGen(minSize = 1, sizeRange = 5, spotposx=w/2, spotposy=h/2, gradCol = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)", gradCol2 = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)"){
    var s;
    
        //testing getting random line color gradients
        let x1 = spotposx;
        let y1 = spotposy;

        //color gradients for planets obtained from https://www.freshconsulting.com/insights/blog/d3-js-gradients-the-easy-way/
            var defs = svg.append("defs");
            var col = gradCol
            var gradient = defs.append("linearGradient")
                .attr("id", "grad")
                .attr("x1", (10 + Math.random() * 50).toString() + "%")
                .attr("x2", (70 + Math.random() * 30).toString() + "%")
                .attr("y1", (5 + Math.random() * 50).toString() + "%")
                .attr("y2", (70 + Math.random() * 30).toString() + "%");

            gradient.append("stop")
                .attr("class", "start")
                .attr("offset", "0%")
                .attr("stop-color", gradCol)
                .attr("stop-opacity", 1);

            gradient.append("stop")
            .attr("class", "end")
            .attr("offset", "100%")
            //.attr("stop-color", "black")
            //playing with gradients setting end color to black
            //will allow more realistic appearances. To randomize the gradient entirely
            //uncomment the following line
            .attr("stop-color", gradCol2)
            .attr("stop-opacity", 1);


        var s = minSize + Math.random() * sizeRange;

        var col1 = "url(#grad)";
    
        //drawing the planets
        svg.append("circle")
            .attr("cx", x1)
            .attr("cy", y1)
            .attr("r", s)
            .attr("fill", col1)
            .attr("stroke", col)
            .attr("stroke-width", 1);
    
    

}

//planet generator function
function planetGenerator(count, lines = "mixed", realistic=true, minSize = 50, sizeRange = 300, spots = "none"){
    let colref;
    for(var i=0; i<count; i++){
        //testing getting random line color gradients

        colref = i;
        //colors for the stripes
        let colStripes1 = [];
        colStripes1[colref] = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)"
        let colStripes2 = [];
        colStripes2[colref] = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)"
        
        var gradCol = [];
        var gradCol2 = [];
        if(realistic==false){
            gradCol[colref] = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)"
            gradCol2[i] = randomColor();
        }
        else{
            gradCol[i] = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)"
            gradCol2[i] = "black";
        }

        //color gradients for planets obtained from https://www.freshconsulting.com/insights/blog/d3-js-gradients-the-easy-way/
            var defs = svg.append("defs");
            var gradient = defs.append("linearGradient")
                .attr("id", "svgGrad" + (i-1).toString())
                .attr("x1", (10 + Math.random() * 50).toString() + "%")
                .attr("x2", (70 + Math.random() * 30).toString() + "%")
                .attr("y1", (5 + Math.random() * 50).toString() + "%")
                .attr("y2", (70 + Math.random() * 30).toString() + "%");

            gradient.append("stop")
                .attr("class", "start")
                .attr("offset", "0%")
                .attr("stop-color", gradCol[colref])
                .attr("stop-opacity", 1);

            gradient.append("stop")
            .attr("class", "end")
            .attr("offset", "100%")
            //.attr("stop-color", "black")
            //playing with gradients setting end color to black
            //will allow more realistic appearances. To randomize the gradient entirely
            //uncomment the following line
            .attr("stop-color", gradCol2[i])
            .attr("stop-opacity", 1);

        //randomizing position and size
        pposx = Math.random() * (1 * w);
        pposy = Math.random() * (1 * h);
        s = minSize + Math.random() * sizeRange;

        //randomizing colors
        //var col1 = randomColor();

        var col1 = "url(#svgGrad" + (i-1).toString() + ")";
        

        //randomizing # of lines per planet
        var numLines = Math.round(3 +  Math.random() * 20);

        //drawing the planets
        svg.append("circle")
            .attr("cx", pposx)
            .attr("cy", pposy)
            .attr("r", s)
            .attr("fill", col1);

        
        var spotCol1 , spotCol2 = [];
        if(spots=="all"){
            var spotCount = s/5;
            var spotAngle1 , spotAngle2 ;
            var spotX , spotY ;
            
            for(var k = 0; k<spotCount; k++){
                spotAngle1 = Math.random()*2*Math.PI;
                spotAngle2 = Math.random()*2*Math.PI;
                spotCol1 = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)";
                spotCol2[colref] = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)";
                spotX = (pposx + Math.random() * (s-5)  * Math.cos(spotAngle1));
                spotY = (pposy + Math.random() * (s-5)  * Math.sin(spotAngle1));
                spotGen(1, 5, spotX, spotY, gradCol[colref], spotCol2[colref]);
            }
        }
        else if(spots=="mixed"){
            var randNum2 = Math.random();
            if(randNum2 > .4999){
                var spotCount = s/5;
                var spotAngle1 , spotAngle2 ;
                var spotX , spotY ;
                spotCol1 = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)";
                spotCol2[colref] = "hsl(" + (Math.random() * 360).toString() + ",100%,50%)";
                for(var k = 0; k<spotCount; k++){
                    spotAngle1 = Math.random()*2*Math.PI;
                    spotAngle2 = Math.random()*2*Math.PI;
                    spotX = (pposx + Math.random() * (s-5)  * Math.cos(spotAngle1));
                    spotY = (pposy + Math.random() * (s-5)  * Math.sin(spotAngle1));
                    spotGen(1, 5, spotX, spotY, spotCol1, spotCol2[colref]);
                }
            }
        }

        //creating the stripes on each planet
        if(lines == "all"){
            var gradient2;

            //spots on planets
            if(spots==true){
                var spotCount = 10;
                var spotAngle1 = [], spotAngle2 = [];
                var spotX = [], spotY = [];
                for(var k = 0; k<spotCount; k++){
                    spotAngle1[k] = Math.random()*2*Math.PI;
                    spotAngle2[k] = Math.random()*2*Math.PI;
                    spotX[k] = (pposx + Math.random() * s  * Math.cos(spotAngle1[k])).toString() - 5;
                    spotY[k] = (pposy + Math.random() * s  * Math.sin(spotAngle1[k])).toString() - 5;
                    spotGen(1, 1, 5, spotX[k], spotY[k]);
                }
            }

            for(var j=0; j<numLines; j++){
                

                //color gradients for lines
                defs2 = svg.append("defs");
                gradient2 = defs2.append("linearGradient")
                    .attr("id", "svgGradient")
                    .attr("x1", "0%")
                    .attr("x2", "100%")
                    .attr("y1", "0%")
                    .attr("y2", "100%");
    
                gradient2.append("stop")
                    .attr("class", "start")
                    .attr("offset", "0%")
                    //starting gradient color
                    .attr("stop-color", colStripes1[colref])
                    .attr("stop-opacity", 1);
    
                gradient2.append("stop")
                    .attr("class", "end")
                    .attr("offset", "100%")
                    //ending gradient color
                    .attr("stop-color", colStripes2[colref])
                    .attr("stop-opacity", 1);
    
                var angle1 = Math.random()*2*Math.PI;
                var angle2 = Math.random()*2*Math.PI;
                var lsx = (pposx + s  * Math.cos(angle1)).toString();
                var lsy = (pposy + s  * Math.sin(angle1)).toString();
                var lfx = (pposx + s  * Math.cos(angle2)).toString();
                var lfy = (pposy + s  * Math.sin(angle2)).toString();
    
                if (j % 2 == 0){
                    svg.append("line")
                        .attr("x1", lsx)
                        .attr("x2", lfx)
                        .attr("y1", lsy)
                        .attr("y2", lfy)
                        //testing getting random line color gradients
                        .attr("stroke", "url(#svgGradient)")
                        .attr("stroke-width", Math.random()*4);
                } else{
                    svg.append("line")
                        .attr("x1", lsx)
                        .attr("x2", lfx)
                        .attr("y1", lsy)
                        .attr("y2", lfy)
                        //testing getting random line color gradients
                        .attr("stroke", "url(#svgGradient)")
                        .attr("stroke-width", (s/100)*Math.random());
                }
            }
        }

        else if(lines == "mixed"){
            //spots on planets
            
            var randNum = Math.random();
            if(randNum >.49){
                for(var j=0; j<numLines; j++){
            

                    //color gradients for lines
                    var defs2 = svg.append("defs");
                    var gradient2 = defs2.append("linearGradient")
                        .attr("id", "svgGradient")
                        .attr("x1", "0%")
                        .attr("x2", "100%")
                        .attr("y1", "0%")
                        .attr("y2", "100%");
        
                    gradient2.append("stop")
                        .attr("class", "start")
                        .attr("offset", "0%")
                        //starting gradient color
                        .attr("stop-color", colStripes1[colref])
                        .attr("stop-opacity", 1);
        
                    gradient2.append("stop")
                        .attr("class", "end")
                        .attr("offset", "100%")
                        //ending gradient color
                        .attr("stop-color", colStripes2[colref])
                        .attr("stop-opacity", 1);
        
                    var angle1 = Math.random()*2*Math.PI;
                    var angle2 = Math.random()*2*Math.PI;
                    var lsx = (pposx + s  * Math.cos(angle1)).toString();
                    var lsy = (pposy + s  * Math.sin(angle1)).toString();
                    var lfx = (pposx + s  * Math.cos(angle2)).toString();
                    var lfy = (pposy + s  * Math.sin(angle2)).toString();
                    //testing getting random line color gradients
                    var scol1 = "url(#svgGradient" + (i-1).toString() + ")";
                    var scol2 = "url(#svgGradient" + (i).toString() + ")";
        
                    if (j % 2 == 0){
                        svg.append("line")
                            .attr("x1", lsx)
                            .attr("x2", lfx)
                            .attr("y1", lsy)
                            .attr("y2", lfy)
                            //testing getting random line color gradients
                            .attr("stroke", "url(#svgGradient)")
                            //.attr("stroke", scol1)
                            .attr("stroke-width", Math.random()*4);
                    } else{
                        svg.append("line")
                            .attr("x1", lsx)
                            .attr("x2", lfx)
                            .attr("y1", lsy)
                            .attr("y2", lfy)
                            //testing getting random line color gradients
                            .attr("stroke", "url(#svgGradient)")
                            //.attr("stroke", scol2)
                            .attr("stroke-width", Math.random()*4);
                    }
                    
                    
                    
                    
                }
            }
        }

        else{
            //spots on planets
            if(spots==true){
                var spotCount = 10;
                var spotAngle1 = [], spotAngle2 = [];
                var spotX = [], spotY = [];
                for(var k = 0; k<spotCount; k++){
                    spotAngle1[k] = Math.random()*2*Math.PI;
                    spotAngle2[k] = Math.random()*2*Math.PI;
                    spotX[k] = (pposx + Math.random() * s  * Math.cos(spotAngle1[k])).toString() - 5;
                    spotY[k] = (pposy + Math.random() * s  * Math.sin(spotAngle1[k])).toString() - 5;
                    planetGen(1, "none", false, 1, 5, spotX[k], spotY[k]);
                }
            }
        };
    
    }

}

//tie fighter generator (requires tiefighter.js)
function tieGenerator(count, minSize = 75, sizeRange = 75, abstractColor=false){
    for(var i=0; i<count; i++){
        var xpos = Math.random() * (.8 * w);
        var ypos = Math.random() * (.8 * h);
        var size = Math.random() * sizeRange + minSize;
        var fc = randomColor();
        var sc = randomColor();

        if(abstractColor == true){
            if(i%2==0){
                orent = "forward";
            } else{
                var num = Math.random()
                if (num>.5){orent = "left";}
                else{orent = "right";}
            }       
            tieFighter(xpos, ypos, size, orent, fc, sc);
        }
        else{
            if(i % 2 ==1){
                tieFighter(xpos, ypos, size, "left");
            } else if(i%3 == 0){
                tieFighter(xpos, ypos, size, "forward");
            } else{
                tieFighter(xpos, ypos, size, "right");
            }
        }
    }
}
