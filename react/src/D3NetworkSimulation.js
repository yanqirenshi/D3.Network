import * as d3 from 'd3';

import D3NetworkNode from './D3NetworkNode.js';
import D3NetworkEdge from './D3NetworkEdge.js';

export default class D3NetworkSimulation {
    constructor () {
        this.simulation = d3
            .forceSimulation()
            .alphaMin(0.001)
            .alphaTarget(0.002)
            .force(
                "collide",
                d3.forceCollide(88).radius(function(d) { return 111; })
            )
            .force("link", d3.forceLink().id(function(d) {
                return d._id;
            }))
            .force("charge", d3.forceManyBody());
    }
    makeDragAndDropCallbacks (callback) {
        let simulation = this.simulation;

        let dragStarted = (d) => {
            if (d.move==='freeze')
                return;

            if (d.move==='support') {
                d.fx_keep = d.fx;
                d.fy_keep = d.fy;
            }

            if(!d3.event.active)
                simulation.alphaTarget(0.3).restart();

            d.fx = d.x;
            d.fy = d.y;
        };

        let dragged = (d) => {
            if (d.move==='freeze')
                return;

            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        let dragEnded = (d) => {
            if (d.move==='freeze')
                return;

            if(!d3.event.active)
                simulation.alphaTarget(0);

            if (d.move!=='support') {
                d.fx = null;
                d.fy = null;
            }
        };

        let out = {
            dragStarted: dragStarted,
            dragged: dragged,
            dragEnded: dragEnded,
            node: {
                click: null,
            }
        };

        if (callback && callback.node && callback.node.click)
            out.node.click = callback.node.click;

        return out;
    }
    settingNodes (nodes_data, link, nodes) {
        const n_node = new D3NetworkNode();
        const n_edge = new D3NetworkEdge();

        this.simulation
            .nodes(nodes_data)
            .on("tick", () => {
                n_edge.tick(link);
                n_node.tick(nodes);
            });
    }
    settingEdges (links_data) {
        this.simulation
            .force("link")
            .links(links_data);
    }
}
