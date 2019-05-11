/////
///// D3Nodes.js
/////
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
            });

        let circles = g_list.append('circle')
            .attr('cx', 100)
            .attr('cy', 90)
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
            .attr('fill', 'black')
            .attr('stroke', 'black')
            .attr('font-size', (d) => {
                return d.label.font.size;
            })
            .text((d) => { return d.label.text; })
            .on('click', (d) => {
                this._callback(d3.event, 'click-circle', d);
                d3.event.stopPropagation();
            });

        // g_list.append('text')
        //     .attr('class', 'node-label')
        //     .attr('fill', 'black')
        //     .attr('stroke', 'black')
        //     .attr('font-family', "helvetica, arial, 'hiragino kaku gothic pro', meiryo, 'ms pgothic', sans-serif")
        //     .attr('font-weight', 'lighter')
        //     .text((d) => { return d.name; });
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

/////
///// D3Edges.js
/////
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
            .attr('stroke', '#888888')
            .attr('stroke-width', 0.8);
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

/////
///// D3Simulator.js
/////
class D3Simulator {
    constructor(reducer) {}
    make() {
        let simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d._id; }))
            .force("charge", d3.forceManyBody())
            //.force("center", d3.forceCenter(0, 0))
            .alphaMin(0.001)
            .alphaTarget(0.002)
            .force("collide", d3.forceCollide(88));

        simulation.force("charge")
            .strength(function() { return -0.8; });

        return simulation;

    }
}

/////
///// D3Base.js
/////
class D3Base {
    constructor(reducer) {}
    draw(d3svg) {
        let gropus = [
            {_id:-1, name: 'rules'},
            {_id:-2, name: 'edges'},
            {_id:-3, name: 'nodes'}
        ];

        d3svg.Svg()
            .selectAll('g.data-group')
            .data(gropus, this._id)
            .enter()
            .append('g')
            .attr('class', (d)=>{
                return 'data-group ' + d.name;
            });
    }
}
