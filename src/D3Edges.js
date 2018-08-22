class D3Edges {
    constructor(reducer) {}
    /* ****************************************************************
     * Utility
     * **************************************************************** */
    _id (d) { return d._id; }
    /* ****************************************************************
     * Draw
     * **************************************************************** */
    draw(d3svg, edges, simulator) {
        let edges_list = (edges && edges.list) ? edges.list : [];

        simulator.force("link")
            .links(edges_list)
            .distance(function(){ return 222;})
            .strength(function(){ return 2; });

        d3svg.Svg()
            .select('g.edges')
            .selectAll('line.edge')
            .data(edges_list, this._id)
            .enter()
            .append('line')
            .attr('class', 'edge')
            .attr('stroke', '#888888')
            .attr('stroke-width', 0.8);
    }
}
