// @flow
import * as d3 from "d3";

const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50,
};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

const valueLine =
    d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close))
    ;

const svg =
    d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
    ;

type csv_entry = {
    date: Date;
    close: number;
};
d3.csv("data.csv", (error, parsed_entries: any[]) => {
    if (error) throw error;
    const parseTime = d3.timeParse("%d-%b-%y");
    const entries = parsed_entries.map(d => ({
        date: parseTime(d.date),
        close: +d.close,
    }));
    console.log(entries);
    x.domain(d3.extent(entries, d => d.date));
    y.domain([0, d3.max(entries, d => d.close)]);
    svg.append("path")
        .data([entries])
        .attr("class", "line")
        .attr("d", valueLine);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
    svg.append("g")
        .call(d3.axisLeft(y));
});
