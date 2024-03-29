import * as d3 from 'd3';

export default class Simulation {
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

        this.simulation = d3
            .forceSimulation()
            .alphaMin(0.001)
            .alphaTarget(0.002)
            .force('collide', collide)
            .force("link", link)
            .force("charge", d3.forceManyBody())
            .on("tick", tick);
    }
    makeDragAndDropCallbacks (callback) {
        let simulation = this.simulation;

        let dragStarted = (event, d) => {
            if (d.move==='freeze')
                return;

            if (d.move==='support') {
                d.fx_keep = d.fx;
                d.fy_keep = d.fy;
            }

            if(!event.active)
                simulation.alphaTarget(0.3).restart();

            d.fx = d.x;
            d.fy = d.y;

            if (callback && callback.node && callback.node.dragStarted)
                callback.node.dragStarted(d, event);

        };

        let dragged = (event, d) => {
            if (d.move==='freeze')
                return;

            d.fx = event.x;
            d.fy = event.y;

            if (callback && callback.node && callback.node.dragged)
                callback.node.dragged(d, event);
        };

        let dragEnded = (event, d) => {
            if (d.move==='freeze')
                return;

            if(!event.active)
                simulation.alphaTarget(0);

            if (d.move!=='support') {
                d.fx = null;
                d.fy = null;
            }

            if (callback && callback.node && callback.node.dragEnded)
                callback.node.dragEnded(d, event);
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
