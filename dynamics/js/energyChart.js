/* global d3 */

var energyChart = function(rowData) {
  // this is the parent element that will contain the whole chart.
  let chartDiv = document.createElement('div');
  chartDiv.setAttribute('class', 'chartDiv')
  chartDiv.classList += ' energy' + rowData.code;
  chartDiv.classList += ' regionALL region' + rowData.region;
  $(chartDiv).data('sort', rowData.sort);
            
  let data = rowData.radar;
  let circleData = rowData.circle;
  
  let cfg = {
    w: 180,
    h: 180,
    margin: {top: 40, right: 40, bottom: 40, left: 40},
    maxValue: 2.5,
    minValue: -2.5,
    labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
    opacityArea: 0,  	//The opacity of the area of the blob
    levels: 0,
    dotRadius: 2,
    opacityCircles: 1, 	//The opacity of the circles of each blob
    strokeWidth: 1,
    axisColor: "#999999",
    axisStroke: ".25px",
    tooltipSize: "14px",
    tooltipColor: "#a8382d",
    legendSize: "12px",
    legendColor: "#a8382d",
    color: d3.scaleOrdinal().range(["#A65A46","#CC333F","#E8E3DD"])
  };
  
  let maxValue = cfg.maxValue; // trusting supplied value instead of checking actual data.
  
      // Names of each axis
  let allAxis = (data[0].map(function(i, j){return i.axis})),	
  
      // The number of different axes
      total = allAxis.length,				                              	
      
      // Radius of the outermost circle
      radius = Math.min(cfg.w/2, cfg.h/2), 	              
      
      // Decimal formatting
      Format = d3.format('.2f'),
      
      // The width in radians of each "slice"
      angleSlice = Math.PI * 2 / total;
	
	//Scale for the radius
	var rScale = d3.scaleLinear()
		.range([0, radius])
		.domain([cfg.minValue, maxValue]);

  // remove any .radarChart elements if they exist
  d3.select(chartDiv).select('.energyChart').remove(); 
  
  // add a new svg.radarChart element and set its width/height from cfg.
  let svg = d3.select(chartDiv).append('svg').attr('class', 'energyChart')
    .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
		.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom);
	
	// create a svg group (<g/>) and move it to the middle of the svg with a translate transform.
	let g = svg.append('g')
	  .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////
	
	// Wrapper for the axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	
	// Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis) // allAxis is an array containing all axis labels.
		.enter()
		.append("g")
		.attr("class", "axis");

	// Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", cfg.axisColor)
		.style("stroke-width", cfg.axisStroke);


	///////////////////////////////////////////////////
	//////// DRAW THE CIRCLE CHART ////////////////////
	///////////////////////////////////////////////////
	
	//linear scale
  var potlinearScale = d3.scaleLinear()
    .domain([0, 180])
    .range([0, 100]);
	   
  var caplinearScale = d3.scaleLinear()
    .domain([0, 40])
    .range([0, 25]);

  g.append('circle')
    .attr('r', potlinearScale(Math.sqrt(circleData.potential/Math.PI)))
    .style('fill', "#f0d9a6")
    .style('opacity',0.7)
	  .on('mouseover', function() {
			tooltip
				.attr('x', 0)
				.attr('y', -potlinearScale(Math.sqrt(circleData.potential/Math.PI)))
				.attr("text-anchor", "middle")
				.style("opacity",0)
				.text(circleData.potential + ' terawatts')
			  .transition().duration(500)
				.style('opacity', 1);
	  })
	  .on('mouseout', function() {
	    tooltip.transition().duration(500)
				.style("opacity", 0);
	  });


	g.append('circle')
	  .attr('r', caplinearScale(Math.sqrt(circleData.capacity/Math.PI)))
	  .style('fill', "#bcc1a0")
	  .style('opacity',0.7)
	  .on('mouseover', function() {
			tooltip
				.attr('x', 0)
				.attr('y', -caplinearScale(Math.sqrt(circleData.capacity/Math.PI)))
				.attr("text-anchor", "middle")
				.style("opacity",0)
				.text(circleData.capacity + ' megawatts')
				.transition().duration(500)
				.style('opacity', 1);
	  })
	  .on('mouseout', function() {
	    tooltip.transition().duration(500)
				.style("opacity", 0);
	  });

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////
	
	// The radial line function
	var radarLine = d3.radialLine()
  	.curve(d3.curveLinearClosed)
		.radius(function(d) { return rScale(d.value); })
		.angle(function(d,i) {	return i*angleSlice; });
		
	if (cfg.roundStrokes) {
		radarLine.curve(d3.curveLinearClosed);
	}
				
	// Create a wrapper for the blobs	
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");
	
	// Create the outlines (lines connecting circle points)
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(2); })
		.style("fill", "none")
		// .style("filter" , "url(#glow)");		
	
	// Append the circles (the points)
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", function(d,i) { return cfg.color(2); })
		.style("fill-opacity", 0.8);
  
  /////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////
	
	// Wrapper for the invisible circles on top
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");
		
	// Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius*4)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			let newX = parseFloat(d3.select(this).attr('cx')) - 10;
			let newY = parseFloat(d3.select(this).attr('cy')) - 10;
					
			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(Format(d.value))
				.transition().duration(300)
				.style('opacity', 1);
				
			// Append the labels at each axis
			axis.append("text")
				.attr("class", "legend")
				.style("font-size", cfg.legendSize)
				.style("fill", cfg.legendColor)
				.style("opacity", 0)
				.attr("text-anchor", "middle")
				.attr("dy", "0.35em")
				.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
				.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
				.text(function(d){return d})
			  .transition().duration(500)
			  .style("opacity", 1)
				.call(wrap, cfg.wrapWidth);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(500).style("opacity", 0);
			d3.selectAll(".legend").remove();
		});
  
	// Set up the small tooltip for when you onmouseover
	// This element is drawn last to be "on top"
	var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("font-size", cfg.tooltipSize)
		.style("fill", cfg.tooltipColor)
		.style("opacity", 0);	
		
	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
  			line.pop();
  			tspan.text(line.join(" "));
  			line = [word];
  			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap	
	
	
	let countryName = document.createElement('div');
	countryName.setAttribute('class', 'countryName');
  countryName.innerHTML = '<strong>'+rowData.country+'</strong>';
  chartDiv.appendChild(countryName);
  return chartDiv;
}