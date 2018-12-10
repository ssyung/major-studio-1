function drawCircles(id,data) {
    
    //Initiate the SVG
	var svg = d3.select(id).append('svg')
			.attr('width',  260)
			.attr('height', 260);
			

	//linear scale
	 var potlinearScale = d3.scaleLinear()
	   .domain([1, 180])
	   .range([0, 75]);
	   
	 var caplinearScale = d3.scaleLinear()
	   .domain([1, 40])
	   .range([0, 25]);

	 svg.append('circle')
	  .attr('cy', 130)
	  .attr('cx', 130)
	  .attr('r', potlinearScale(Math.sqrt(data.potential/Math.PI)))
	  .style('fill', "#f0d9a6")
	  .style('opacity',0.7)

	 svg.append('circle')
	  .attr('cy', 130)
	  .attr('cx', 130)
	  .attr('r', caplinearScale(Math.sqrt(data.capacity/Math.PI)))
	  .style('fill', "#bcc1a0")
	  .style('opacity',0.7)


	// console.log(linearScale(data.capacity))
		
	// //Append a g element		
	// var circleGrid = svg.append("g")
	// 		.attr('width',  80)
	// 		.attr('height', 80);

	// //Draw Circles
	// var x = circleGrid.selectAll('g')
	//   .data(data)
	//   .enter()
	// 	.append('circle')
	// 	.attr('class', 'dataCircle')
	// 	.attr('r', function(d, i){return Math.sqrt(data.capacity)})
	// 	.style('fill', "#E8E3DD")
	// 	.style('stroke', "#E8E3DD");
	
	// console.log(x)

}
