function drawCircles(id,data) {
    
    //Initiate the SVG
	var svg = d3.select(id).append('svg')
			.attr('width',  110)
			.attr('height', 110);
			
	//linear scale
	var linearScale = d3.scaleLinear()
	  .domain([1, 5000])
	  .range([0, 30]);

			
	svg.append('circle')
		.attr('cy', 55)
		.attr('cx', 55)
		.attr('r', linearScale(data.capacity))
		.style('fill', "#6F8B59")
		.style('opacity',0.3)
	
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
