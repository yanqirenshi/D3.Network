class D3Edges {
    constructor(reducer) {}
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
            .attr('stroke', (d) => {
                if (!d.stroke || !d.stroke.color)
                    return '#888888';

                return d.stroke.color;
            })
            .attr('stroke-width', (d) => {
                if (!d.stroke || !d.stroke.w)
                    return 0.8;

                return d.stroke.w;
            });
    }
    draw(d3svg, edges, simulator) {
        let edges_list = (edges && edges.list) ? edges.list : [];

        simulator.force("link")
            .links(edges_list)
            .distance(function(){ return 222;})
            .strength(function(){ return 2; });

        this.drawEdge_Remove(d3svg, edges_list);
        this.drawEdge_Add(d3svg, edges_list);
    }
}
