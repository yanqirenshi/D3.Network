class D3Nodes {
    constructor() {
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

        if (d.fx && d.fy)
            d._fixed = true;

        d.fx = d.x;
        d.fy = d.y;
    }
    nodeDrag_dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    nodeDrag_end(d, simulator) {
        if (!d3.event.active) simulator.alphaTarget(0);

        if (d._fixed) {
            delete d._fixed;
        } else {
            d.fx = null;
            d.fy = null;
        }
    }
    /* ****************************************************************
     * Tick
     * **************************************************************** */
    tickedNodes(g) {
        g.selectAll('g.node')
            .attr("transform", function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });
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
            .data(nodes.list, (d) => { return d._id; })
            .exit()
            .remove();
    }
    drawNodes_Add (g, nodes, simulator) {
        let new_nodes = g.selectAll('g.node')
            .data(nodes.list, (d) => { return d._id; })
            .enter();

        let g_list = new_nodes
            .append('g')
            .attr('class', (d) => {
                return 'node ' + d._class;
            })
            .attr('transform', (d) => {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

        let circles = g_list.append('circle')
            .attr('r', (d) => { return d.circle.r; })
            .attr('fill', (d) => { return d.circle.fill; })
            .attr('stroke', (d) => { return d.circle.stroke.color; })
            .attr('stroke-width', (d) => { return d.circle.stroke.width; })
            .call(d3.drag()
                  .on("start", (d) => {
                      this.nodeDrag_start(d, simulator);
                      this._callback(d, d3.event, 'drag-start');
                      d3.event.sourceEvent.stopPropagation();
                  })
                  .on("drag", (d) => {
                      this.nodeDrag_dragged(d);
                      this._callback(d, d3.event, 'drag');
                      d3.event.sourceEvent.stopPropagation();
                  })
                  .on("end", (d) => {
                      this.nodeDrag_end(d, simulator);
                      this._callback(d, d3.event, 'drag-end');
                      d3.event.sourceEvent.stopPropagation();
                  }))
            .on('click', (d) => {
                this._callback(d, d3.event, 'click-circle');
                d3.event.stopPropagation();
            });


        g_list.append('text')
            .attr('class', 'circle-label')
            .attr('x', (d) => {
                return d.label.circle.position.x;
            })
            .attr('y', (d) => {
                return d.label.circle.position.y;
            })
            .attr('fill', 'black')
            .attr('stroke', 'black')
            .attr('font-size', (d) => {
                return d.label.circle.font.size;
            })
            .text((d) => { return d.label.circle.text; })
            .on('click', (d) => {
                this._callback(d3.event, 'click-circle', d);
                d3.event.stopPropagation();
            });

        g_list.append('text')
            .attr('class', 'node-label')
            .attr('x', (d) => {
                return 0;
            })
            .attr('y', (d) => {
                let r2 = d.circle.r * 2;
                let margin = 11;

                return d.label.node.position.y + r2 + margin;
            })
            .attr('fill', 'black')
            .attr('stroke', 'black')
            .attr('font-size', (d) => {
                return d.label.node.font.size;
            })
            .text((d) => { return d.label.node.text; });
    }
    drawNodes(d3svg, nodes, simulator) {
        let g = d3svg.Svg().select('g.data-group.nodes');

        this.drawNodes_Remove(g, nodes);
        this.drawNodes_Add(g, nodes, simulator);
    }
    draw(d3svg, nodes, simulator, callback) {
        let node_list = (nodes && nodes.list) ? nodes.list : [];

        simulator.nodes(node_list)
            .on("tick", () => {
                this.ticked(d3svg, nodes);
            });

        this._callback = callback;
        this.drawNodes(d3svg, nodes, simulator);
    }
}
