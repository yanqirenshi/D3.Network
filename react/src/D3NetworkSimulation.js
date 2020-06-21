import * as d3 from 'd3';

export default class D3NetworkSimulation {
    constructor (tick) {
        this.makeSimuration(tick);
    }
    makeSimuration (tick) {
        const collide = d3
              .forceCollide(88)
              .radius((d) => { return 111; });

        const link = d3
              .forceLink()
              .id((d) =>{ return d.id; });

        this.simulation = d3.forceSimulation()
            .alphaMin(0.001)
            .alphaTarget(0.002)
            .force('collide', collide)
            .force("link", link)
            .force("charge", d3.forceManyBody())
            .on("tick", tick);
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
    nodes (nodes_data) {
        this.simulation.nodes(nodes_data);
    }
    edges (edge_data) {
        this.simulation.force('link').links(edge_data);
    }
}
