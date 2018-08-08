class D3Nodes {
    constructor(reducer) {
    }
    /* ****************************************************************
     * Utility
     * **************************************************************** */
    _id (d) { return d._id; }
    /* ****************************************************************
     * Drag NODE
     * **************************************************************** */
    nodeDrag_start(d, simulator) {
        if (!d3.event.active) simulator.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    nodeDrag_dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    nodeDrag_end(d, simulator) {
        if (!d3.event.active) simulator.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    /* ****************************************************************
     * Tick
     * **************************************************************** */
    tickedNodes(g) {
        g.selectAll('g.node')
            .selectAll('circle')
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        g.selectAll('g.node')
            .selectAll('text.circle-label')
            .attr("x", function(d) {
                let cls = d._class;

                if (cls=='ALGORITHM') return d.x - 16;
                if (cls=='BOOK')      return d.x - 12;
                if (cls=='ARXIV')     return d.x - 10;

                return d.x - 12;
            })
            .attr("y", function(d) {
                let cls = d._class;

                if (cls=='ALGORITHM') return d.y + 12;
                if (cls=='BOOK')      return d.y + 4;
                if (cls=='ARXIV')     return d.y + 4;

                return d.y + 4;
            });

        g.selectAll('g.node')
            .selectAll('text.node-label')
            .attr("x", function(d) {
                return d.x + 33;
            })
            .attr("y", function(d) { return d.y + 4; });
    }
    tickedEdges(g) {
        g.selectAll('line.edge')
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) {
                return d.target.y;
            });

        return g;
    }
    ticked(d3svg, nodes) {
        let g_nodes = d3svg.Svg().select('g.data-group.nodes');
        let g_edges = d3svg.Svg().select('g.data-group.edges');

        this.tickedNodes(g_nodes);
        this.tickedEdges(g_edges);
    }
    /* ****************************************************************
     * Draw
     * **************************************************************** */
    drawNodes_Remove (g, nodes) {
        g.selectAll('g.node')
            .exit(nodes.list, this._id)
            .remove();
    }
    circle_r (d)  {
        let cls = d._class;

        if (cls=='ALGORITHM') return 55;
        if (cls=='BOOK')      return 33;
        if (cls=='ARXIV')     return 22;

        return 22;
    }
    circle_fill (d) {
        let cls = d._class;

        if (cls=='ALGORITHM') return '#fef4f4';
        if (cls=='BOOK')      return '#eaf4fc';
        if (cls=='ARXIV')     return '#e0ebaf';

        return '#fff';
    }
    circle_stroke (d) {
        let cls = d._class;

        if (cls=='ALGORITHM') return '#fdeff2';
        if (cls=='BOOK')      return '#89c3eb';
        if (cls=='ARXIV')     return '#c7dc68';

        return '#fff';
    }
    circle_strokeWidth (d) {
        let cls = d._class;

        if (cls=='ALGORITHM') return 8;
        if (cls=='BOOK')      return 4;
        if (cls=='ARXIV')     return 2;

        return 2;
    }
    circleLable_fontSize (d) {
        let cls = d._class;

        if (cls=='ALGORITHM') return 36;
        if (cls=='BOOK')      return 18;
        if (cls=='ARXIV')     return 14;

        return 14;
    }
    drawNodes_Add (g, nodes, simulator) {
        let new_nodes = g.selectAll('g.node')
            .data(nodes.list, this._id)
            .enter();

        let g_list = new_nodes
            .append('g')
            .attr('class', (d) => {
                return 'node ' + d._class;
            });

        let circles = g_list.append('circle')
            .attr('cx', 100)
            .attr('cy', 90)
            .attr('r', this.circle_r)
            .attr('fill', this.circle_fill)
            .attr('stroke', this.circle_stroke)
            .attr('stroke-width', this.circle_strokeWidth)
            .call(d3.drag()
                  .on("start", (d) => {
                      this.nodeDrag_start(d, simulator);
                  })
                  .on("drag", (d) => {
                      this.nodeDrag_dragged(d);
                  })
                  .on("end", (d) => {
                      this.nodeDrag_end(d, simulator);
                  }))
            .on('click', (d) => {
                this._callback('click-circle', d);
            });


        g_list.append('text')
            .attr('class', 'circle-label')
            .attr('fill', 'black')
            .attr('stroke', 'black')
            .attr('font-size', this.circleLable_fontSize)
            .text((d) => {
                let cls = d._class;

                d.label_length = 1;

                if (cls=='ALGORITHM') return 'ア';

                if (cls=='BOOK') return '書';
                if (cls=='ARXIV') {
                    d.label_length = 2;
                    return '論A';
                }

                return '?';
            })
            .on('click', (d) => {
                this._callback('click-circle', d);
            });

        // g_list.append('text')
        //     .attr('class', 'node-label')
        //     .attr('fill', 'black')
        //     .attr('stroke', 'black')
        //     .attr('font-family', "helvetica, arial, 'hiragino kaku gothic pro', meiryo, 'ms pgothic', sans-serif")
        //     .attr('font-weight', 'lighter')
        //     .text((d) => {
        //         let cls = d._class;

        //         if (cls=='ALGORITHM') return d.name;
        //         if (cls=='BOOK')      return d.title;
        //         if (cls=='ARXIV')     return d.title;

        //         return '?';
        //     });

    }
    drawNodes(d3svg, nodes, simulator) {
        let g = d3svg.Svg().select('g.data-group.nodes');

        this.drawNodes_Remove(g, nodes);
        this.drawNodes_Add(g, nodes, simulator);
    }
    draw(d3svg, nodes, simulator, callback) {
        simulator.nodes(nodes.list)
            .on("tick", () => {
                this.ticked(d3svg, nodes);
            });

        this._callback = callback;
        this.drawNodes(d3svg, nodes, simulator);
    }
}
