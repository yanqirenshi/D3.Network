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

        this.node = new D3NetworkNode(d3, d3_element);
        this.edge = new D3NetworkEdge(d3, d3_element);
        this.simulation = new D3NetworkSimulation(d3);

        return this;
    }
    behavior () {

        return this._behavior;
    }
    getCircleRList (data) {
        let list = [];

        for (let node of data.node) {
            let v = node.circle.r;
            if (list.indexOf(v)===-1)
                list.push(v);
        };

        return list;
    }
    makeClipCircle (data) {
        // http://bl.ocks.org/itagakishintaro/71a7c6779933c189c3ca

        let list = this.getCircleRList(data);

        var defs = this._d3_element.append('defs');

        defs
            .selectAll("circle")
            .data(list)
            .enter()
            .append('circle')
            .attr('id', (d) => { return 'circle-' + d; })
            .attr('r', (d) => { return d; });

        defs
            .selectAll("clipPath")
            .data(list)
            .enter()
            .append('clipPath')
            .attr('id', (d) => { return 'clip-' + d; })
            .append('use')
            .attr('xlink:href', (d) => { return '#circle-' + d; });
    }
    draw (data) {
        this.makeClipCircle(data);


        let nodes_data = data.node;
        let links_data = data.link;

        let simulation = this.simulation;

        let callbacks = simulation.makeDragAndDropCallbacks(this._callbacks);

        let link = this.edge.draw(links_data);
        let node = this.node.draw(nodes_data, callbacks);

        simulation.settingNodes(nodes_data, link, node);
        simulation.settingEdges(links_data);
    }
}
