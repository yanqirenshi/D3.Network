import D3NetworkNode from './D3NetworkNode';
import D3NetworkEdge from './D3NetworkEdge';
import D3NetworkSimulation from './D3NetworkSimulation';

export class D3Network {
    constructor (d3, svg, callback) {
        this.d3 = d3;
        this.svg = svg;
        this.callback = callback;

        this.node = new D3NetworkNode(d3, svg);
        this.edge = new D3NetworkEdge(d3, svg);
        this.simulation = new D3NetworkSimulation(d3);

        this.node.makeClipCircle (svg);
    }
    draw (data) {
        let nodes_data = data.node;
        let links_data = data.link;

        let simulation = this.simulation;

        let callbacks = simulation.makeDragAndDropCallbacks(this.callback);

        let link = this.edge.draw(links_data);
        let node = this.node.draw(nodes_data, callbacks);

        simulation.settingNodes(nodes_data, link, node);
        simulation.settingEdges(links_data);
    }
}
