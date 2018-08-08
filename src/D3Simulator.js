class D3Simulator {
    constructor(reducer) {}
    make() {
        return d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d._id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(0, 0))
            .alphaMin(0.001)
            .alphaTarget(0.002)
            .force("collide", d3.forceCollide(22));
    }
}
