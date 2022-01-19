var mockData = [
	{
		moodId: 2,
		sleep: "good",
		food: "Pizza",
		activities: "walk",
		created_at: new Date("2022-01-05"),
	},
	{
		moodId: 3,
		sleep: "bad",
		food: "broccoli and rice",
		activities: "none",
		created_at: new Date("2022-01-06"),
	},
	{
		moodId: 2,
		sleep: "good",
		food: "burger and fries",
		activities: "walk",
		created_at: new Date("2022-01-07"),
	},
	{
		moodId: 4,
		sleep: "ok",
		food: "chicken and veggies",
		activities: "run",
		created_at: new Date("2022-01-08"),
	},
	{
		moodId: 6,
		sleep: "great",
		food: "vegetables with something healthy",
		activities: "walk",
		created_at: new Date("2022-01-08"),
	},
	{
		moodId: 1,
		sleep: "really bad",
		food: "fried chicken",
		activities: "none",
		created_at: new Date("2022-01-09"),
	},
	{
		moodId: 5,
		sleep: "great",
		food: "steamed vegetables with beef",
		activities: "run",
		created_at: new Date("2022-01-11"),
	},
];

const data = d3.json(
	"http://localhost:3001/api/entries",
	function (error, data) {
		data = JSON.parse(data);
	}
);
// fetch to call api data
//// currently not working
// fetch("/api/entries/graph")
// 	.then((res) => res.json)
// 	.then((data) => {

//   // When reading the csv, I must format variables:
//   function(d){
//     console.log(d);
//     return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
//   }).then(

// parse data into day/month/date
// const dataParsed = { date:d3.timeParse("%B %d %Y")(d.created_at), value: d.moodId} ;

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
	width = 460 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
	.select("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);

// function(d){
//         return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
//       }).then(
// const dataParsed = d3.timeParse("%Y-%m-%d"(data.date));

// Add X axis --> it is a date format
const x = d3
	.scaleTime()
	.domain(
		d3.extent(data, function (d) {
			return d.created_at;
		})
	)
	.range([0, width]);

svg
	.append("g")
	.attr("transform", `translate(0, ${height})`)
	.call(d3.axisBottom(x));

// Max value observed:
const max = d3.max(data, function (d) {
	return +d.moodId;
});

// Add Y axis
const y = d3.scaleLinear().domain([0, 7]).range([height, 0]);
// way to change y axis labels
// .scaleBand()
// 	.domain(["mad", "energetic", "happy", "grumpy", "tired", "hungry"])
svg.append("g").call(d3.axisLeft(y).tickValues([0, 1, 2, 3, 4, 5, 6]));

// Set the gradient
svg
	.append("linearGradient")
	.attr("id", "line-gradient")
	.attr("gradientUnits", "userSpaceOnUse")
	.attr("x1", 0)
	.attr("y1", y(0))
	.attr("x2", 0)
	.attr("y2", y(max))
	.selectAll("stop")
	.data([
		{ offset: "20%", color: "blue" },
		{ offset: "35%", color: "green" },
		{ offset: "50%", color: "yellow" },
		{ offset: "75%", color: "orange" },
		{ offset: "80%", color: "red" },
		{ offset: "100%", color: "purple" },
	])
	.enter()
	.append("stop")
	.attr("offset", function (d) {
		return d.offset;
	})
	.attr("stop-color", function (d) {
		return d.color;
	});

// Add the line
svg
	.append("path")
	.datum(data)
	.attr("fill", "none") // replace 'none' with 'url(#line-gradient)
	.attr("stroke", "url(#line-gradient)")
	.attr("stroke-width", 2)
	.attr(
		"d",
		// line
		d3
			.line()
			.curve(d3.curveStep)
			.x((d) => x(d.created_at))
			.y((d) => y(d.moodId))
	);
