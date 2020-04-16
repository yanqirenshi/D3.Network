class D3NetworkEdgeCore {
    makeDataLine (data) {
    }
    makeData (data) {
        return data;
    }
}

export default class D3NetworkEdge extends D3NetworkEdgeCore {
    constructor (d3, svg) {
        super();

        this.d3 = d3;
        this.svg = svg;

        this.elements = null;
    }
    draw (data) {
        this.elements =
            this.svg
            .selectAll("line")
            .data(data, (d) => { return d._id; })
            .enter()
            .append("line")
            .attr("stroke-width", 8)
            .attr("stroke", "#aacf53");

        return this.elements;
    }
}
