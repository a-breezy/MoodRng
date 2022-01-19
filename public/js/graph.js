// // Mood Chart
// import * as d3 from "d3"
// // to get data pull from sql (fetch())
//     // parse, stringify data (to show dynamically)
//     // put data into variables (ie. mood, date)

// // define svg to hold graph

// get entries of mood and created_at by user_id
let fetchUserData = (userId) => {
	// statement to replace localhost when routes are complete
	// let apiUrl = "https://secure-thicket-41238.herokuapp.com/entry/" + userId;

	// localhost is placeholder for the heroku route to api
	let apiUrl = "http://localhost:3001/entry/1";

	fetch(apiUrl).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				console.log(apiUrl);
				// function makeGraph will graph user's data
				// makeGraph(data.mood, data.created_at);
			});
		} else {
			console.log("error");
		}
	});
};

// var data = d3.json();

// // defining the data
//     // MUST BE REVISED USING SEQUELIZE TO INJECT USER DATA
// data = Object.assign(
// 	d3
// 		.csvParse(await FileAttachment("temperature.csv").text(), d3.autoType)
// 		.map(({ date, mood }) => ({ date, value: mood })),
// 	{ title: "Mood Over Time", y: " Mood" }
// );
// let data = () => {
// 	const parseDate = d3.utcParse("%Y-%m-%d");
// 	return Object.assign(
// 		d3.csvParse(
// 			await FileAttachment("FCM.txt").text(),
// 			({ valid, moodId, moodColor }) => {
// 				return moodId === "M"
// 					? null
// 					: {
// 							date: parseDate(valid),
// 							value: +moodId,
// 							condition: moodColor,
// 					  };
// 			}
// 		),
// 		//creates a key defining color to emotion
// 		{
// 			y: "Mood",
// 			conditions: ["YEL", "GRE", "BLU", "PUR", "RED", "ORA"],
// 			labels: ["Yellow", "Green", "Blue", "Purple", "Red", "Orange"],
// 			colors: ["yellow", "green", "blue", "purple", "red", "orange"],
// 		}
// 	);
// };

// data [mood, created_at]
var moodDate = [
	{ moodId: 2, date: "jan 5" },
	{ moodId: 3, date: "jan 6" },
	{ moodId: 2, date: "jan 7" },
	{ moodId: 4, date: "jan 8" },
	{ moodId: 6, date: "jan 9" },
	{ moodId: 1, date: "jan 10" },
	{ moodId: 5, date: "jan 11" },
];

var mockData = [
	{
		moodId: 2,
		sleep: "good",
		food: "Pizza",
		activities: "walk",
		date: "jan 5",
	},
	{
		moodId: 3,
		sleep: "bad",
		food: "broccoli and rice",
		activities: "none",
		date: "jan 6",
	},
	{
		moodId: 2,
		sleep: "good",
		food: "burger and fries",
		activities: "walk",
		date: "jan 7",
	},
	{
		moodId: 4,
		sleep: "ok",
		food: "chicken and veggies",
		activities: "run",
		date: "jan 8",
	},
	{
		moodId: 6,
		sleep: "great",
		food: "vegetables with something healthy",
		activities: "walk",
		date: "jan 9",
	},
	{
		moodId: 1,
		sleep: "really bad",
		food: "fried chicken",
		activities: "none",
		date: "jan 10",
	},
	{
		moodId: 5,
		sleep: "great",
		food: "steamed vegetables with beef",
		activities: "run",
		date: "jan 11",
	},
];

let data = mockData;

// create box of all user stats for specific date
d3.select("ul")
	.selectAll("li")
	.data(data)
	.enter()
	.append("li")
	.text(
		(data) => "Activities: " + data.activities + " " + "Food: " + data.food
	);

const xScale = d3
	.scaleBand()
	.domain(data.map((dataPoint) => dataPoint.date))
	.rangeRound([0, 250])
	.padding(0.1);
const yScale = d3.scaleLinear().domain([0, 7]).range([200, 0]);

const container = d3.select("svg").classed("container", true);

const bar = container
	.selectAll(".bar")
	.data(data)
	.enter()
	.append("rect")
	.classed("bar", true)
	.attr("width", xScale.bandwidth())
	.attr("height", (data) => 200 - yScale(data.moodId))
	.attr("x", (data) => xScale(data.date))
	.attr("y", (data) => yScale(data.moodId));

container
	.selectAll(".label")
	.data(data)
	.enter()
	.append("text")
	.text((data) => data.date)
	.attr("x", (data) => x(data.date) + x.bandwidth() / 2)
	.attr("y", (data) => y(data.moodId) - 20)
	.attr("text-anchor", "middle")
	.classed("label", true);

// console.log(d3);
// function chart() {
// 	const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
// 	console.log("chart");

// 	// what does DOM.uid() do?
// 	const gradient = DOM.uid();

// 	svg.append("g").call(xAxis);

// 	svg.append("g").call(yAxis);

// 	svg
// 		.append("linearGradient")
// 		.attr("id", gradient.id)
// 		.attr("gradientUnits", "userSpaceOnUse")
// 		.attr("x1", 0)
// 		.attr("y1", height - margin.bottom)
// 		.attr("x2", 0)
// 		.attr("y2", margin.top)
// 		.selectAll("stop")
// 		.data(d3.ticks(0, 1, 10))
// 		.join("stop")
// 		.attr("offset", (d) => d)
// 		.attr("stop-color", color.interpolator());

// 	svg
// 		.append("path")
// 		.datum(data)
// 		.attr("fill", "none")
// 		.attr("stroke", gradient)
// 		.attr("stroke-width", 1.5)
// 		.attr("stroke-linejoin", "round")
// 		.attr("stroke-linecap", "round")
// 		.attr("d", line);

// 	return svg.node();
// }

// width = 600;
// height = 500;
// margin = { top: 20, right: 30, bottom: 30, left: 40 };

// x = d3
// 	.scaleUtc()
// 	.domain(d3.extent(data, (d) => d.date))
// 	.range([margin.left, width - margin.right]);
// y = d3
// 	.scaleLinear()
// 	.domain(d3.extent(data, (d) => d.moodId))
// 	.nice()
// 	.range([height - margin.bottom, margin.top]);
// color = d3.scaleSequential(y.domain(), d3.interpolateTurbo);

// xAxis = (g) =>
// 	g
// 		.attr("transform", `translate(0,${height - margin.bottom})`)
// 		.call(
// 			d3
// 				.axisBottom(x)
// 				.ticks(width / 80)
// 				.tickSizeOuter(0)
// 		)
// 		.call((g) => g.select(".domain").remove());

// yAxis = (g) =>
// 	g
// 		.attr("transform", `translate(${margin.left},0)`)
// 		.call(d3.axisLeft(y))
// 		.call((g) => g.select(".domain").remove())
// 		.call((g) =>
// 			g.select(".tick:last-of-type text").append("tspan").text(data.y)
// 		);

// line = d3
// 	.line()
// 	.curve(d3.curveStep)
// 	.defined((d) => !isNaN(d.value))
// 	.x((d) => x(d.date))
// 	.y((d) => y(d.moodId));

chart();

// // set the dimensions and margins of the graph
// var margin = { top: 10, right: 30, bottom: 30, left: 60 },
// 	width = 460 - margin.left - margin.right,
// 	height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3
// 	.select("svg")
// 	.append("svg")
// 	.attr("width", width + margin.left + margin.right)
// 	.attr("height", height + margin.top + margin.bottom)
// 	.append("g")
// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// //Read the data
// d3.csv(
// 	"https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

// 	// When reading the csv, I must format variables:
// 	function (d) {
// 		return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
// 	},

// 	// Now I can use this dataset:
// 	function (data) {
// 		// Add X axis --> it is a date format
// 		var x = d3
// 			.scaleTime()
// 			.domain(
// 				d3.extent(data, function (d) {
// 					return d.date;
// 				})
// 			)
// 			.range([0, width]);
// 		svg
// 			.append("g")
// 			.attr("transform", "translate(0," + height + ")")
// 			.call(d3.axisBottom(x));

// 		// Add Y axis
// 		var y = d3
// 			.scaleLinear()
// 			.domain([
// 				0,
// 				d3.max(data, function (d) {
// 					return +d.value;
// 				}),
// 			])
// 			.range([height, 0]);
// 		svg.append("g").call(d3.axisLeft(y));

// 		// Add the line
// 		svg
// 			.append("path")
// 			.datum(data)
// 			.attr("fill", "none")
// 			.attr("stroke", "steelblue")
// 			.attr("stroke-width", 1.5)
// 			.attr(
// 				"d",
// 				d3
// 					.line()
// 					.x(function (d) {
// 						return x(d.date);
// 					})
// 					.y(function (d) {
// 						return y(d.value);
// 					})
// 			);
// 	}
// );
