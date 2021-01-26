class D3Edges {
    constructor(reducer) {
        let last_draw_time = null;
    }
    /* ****************************************************************
     * Utility
     * **************************************************************** */
    _id (d) { return d._id; }
    /* ****************************************************************
     * Draw
     * **************************************************************** */
    drawEdge_Remove (d3svg, edges) {
        let lines = d3svg.Svg()
            .select('g.edges')
            .selectAll('line.edge')
            .remove();

        // なぜか exit がエラーになる。。。ひとまず全部▼け
        //  .data(edges.list, (d) => { return d._id; }).exit().remove();
    }
    drawEdge_Add (d3svg, edges) {
        d3svg.Svg()
            .select('g.edges')
            .selectAll('line.edge')
            .data(edges, (d) => { return d._id; })
            .enter()
            .append('line')
            .attr('class', 'edge')
            .attr('stroke', '#888888')
            .attr('stroke-width', 0.8)
            .attr('marker-end', "url(#arrowhead)");
    }
    initMarker (d3svg) {
        let svg = d3svg.Svg();
        svg
            .append("defs")
            .append("marker")
            .attr('id', "arrowhead")
            .attr('refX', 0)
            .attr('refY', 2)
            .attr('markerWidth', 4)
            .attr('markerHeight', 4)
            .attr('orient', "auto")
            .attr( 'd', "M 0,0 V 4 L4,2 Z")
            .attr( 'fill', "steelblue");
    }
    draw(d3svg, edges, simulator) {
        if (!this.last_draw_time)
            this.initMarker(d3svg);

        let edges_list = (edges && edges.list) ? edges.list : [];

        simulator.force("link")
            .links(edges_list)
            .distance(function(){ return 222;})
            .strength(function(){ return 2; });

        this.drawEdge_Remove(d3svg, edges_list);
        this.drawEdge_Add(d3svg, edges_list);

        this.last_draw_time = new Date();
    }
}
