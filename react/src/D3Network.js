import * as d3 from 'd3';

import D3NetworkNode from './D3NetworkNode';
import D3NetworkEdge from './D3NetworkEdge';
import D3NetworkSimulation from './D3NetworkSimulation';

export {D3NetworkNode}
export {D3NetworkEdge}
export {D3NetworkSimulation}

export default class D3Network {
    constructor () {
        this._d3_element = null;
        this._callbacks = {};
        this._behavior = {};

        this.node = null;
        this.edge = null;
        this.simulation = null;
    }
    init (params) {
        this._d3_element = params.d3_element || null;
        this._callbacks = params.callbacks || null;

        this._behavior = {};

        this.behavior(params.behavior || {});

        let d3_element = this._d3_element;

        // TODO: 回避措置コード。本来は line_color はデータに持たせるべき。
        this.line_color = params.line_color || null;

        this.node = new D3NetworkNode();
        // TODO: 回避措置コード。本来は line_color はデータに持たせるべき。
        this.edge = new D3NetworkEdge().init({line_color: this.line_color});
        this.simulation = new D3NetworkSimulation();


        return this;
    }
    behavior () {
        return this._behavior;
    }
    draw (data) {
        let place = this._d3_element;

        this.node.drawClipCircle(place, data);
        this.edge.drawEdgeArrowhead(place);

        let nodes_data = data.node;
        let links_data = data.link;

        let simulation = this.simulation;

        let callbacks = simulation.makeDragAndDropCallbacks(this._callbacks);

        let links = this.edge.draw(place, links_data);
        let nodes = this.node.draw(place, nodes_data, callbacks);

        simulation.settingNodes(nodes_data, links, nodes);
        simulation.settingEdges(links_data);
    }
}
