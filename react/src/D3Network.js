import D3Svg from '@yanqirenshi/d3.svg';

import D3NetworkNode from './D3NetworkNode';
import D3NetworkEdge from './D3NetworkEdge';
import D3NetworkSimulation from './D3NetworkSimulation';

export {D3NetworkNode}
export {D3NetworkEdge}
export {D3NetworkSimulation}

export default class D3Network {
    constructor () {
        this.selector = null;
        this.w = 0;
        this.h = 0;
        this.look = { at: { x:0, y:0 }, };
        this.scale = 1;

        this._d3svg = null;
        this._layerForeground = null;
        this._layerBackground = null;

        this.node = new D3NetworkNode();
        this.edge = new D3NetworkEdge();

        this.selection_node = null;
        this.selection_edge = null;

        // TODO: 利用していないけど、このクラス自体がデータを管理すべきではないか。と。
        this.data_nodes = { ht:{}, list:[] };
        this.data_edges = { ht:{}, list:[] };

        this.simulation = null;

        this._callbacks = {};
        this.callbacks = null;

        this._initialized_at = null;
        this._drawed_at = null;
    }
    init (params) {
        // D3SVG
        this.selector = params.svg.selector;
        this.w = params.svg.w || 0;
        this.h = params.svg.h || 0;
        this.look = params.svg.look || { at: { x:0, y:0 }, };
        this.scale = params.svg.scale || 1;

        // callbacks
        if (params.callbacks)
            this._callbacks = params.callbacks;

        // TODO: 回避措置コード。本来は line_color はデータに持たせるべき。
        this.line_color = params.line_color || null;
        this.edge.init({line_color: this.line_color});

        // simulation
        this.simulation = this.makeSimulator();

        // Arrowhead
        this.edge.drawEdgeArrowhead(this.getSvgElement());

        this._initialized_at = new Date();

        return this;
    }
    isInitialized () {
        return this._initialized_at ? true : false;
    }
    /* *********** */
    /*  Simulator  */
    /* *********** */
    makeSimulator () {
        return new D3NetworkSimulation(() => {
            this.node.tick(this.selection_node);
            this.edge.tick(this.selection_edge);
        });
    }
    /* ******** */
    /*  SVG     */
    /* ******** */
    makeSvg () {
        let d3svg = new D3Svg();

        d3svg.init({
            d3_element: this.selector,
            w:     this.w,
            h:     this.h,
            look:  this.look,
            scale: this.scale,
        });

        return d3svg;
    }
    getSvg () {
        if (this._d3svg)
            return this._d3svg;

        this._d3svg = this.makeSvg();

        this.makeLayers();

        return this._d3svg;
    }
    getSvgElement () {
        return this.getSvg().d3Element();
    }
    /* ******** */
    /*  Layers  */
    /* ******** */
    makeLayers () {
        const layers = [
            { id: 1, name: 'background' },
            { id: 2, name: 'foreground' },
        ];

        this.getSvgElement()
            .selectAll('g.layer')
            .data(layers, (d) => { return d.id; })
            .enter()
            .append('g')
            .attr('class', (d) => {
                return 'layer ' + d.name;
            });
    }
    getLayerForeground () {
        if (this._layerForeground)
            return this._layerForeground;

        let svg = this.getSvgElement();

        this._layerForeground = svg.select('g.layer.foreground');

        return this._layerForeground;
    }
    getLayerBackground () {
        if (this._layerBackground)
            return this._layerBackground;

        let svg = this.getSvgElement();

        this._layerBackground = svg.select('g.layer.background');

        return this._layerBackground;
    }
    /* ******** */
    /*  Others  */
    /* ******** */
    getCallbacks () {
        if (!this.callbacks) {
            let simulation = this.simulation;
            this.callbacks = simulation.makeDragAndDropCallbacks(this._callbacks);
        }

        return this.callbacks;
    }
    /* ******** */
    /*  Data    */
    /* ******** */
    data (data) {
        this.nodes(data.nodes);
        this.edges(data.edges);

        this._drawed_at = new Date();
    }
    drawedAt () {
        return this._drawed_at;
    }
    nodes (data) {
        if (!data || data.length===0)
            return this;

        let nodes_data = data.map((d) => {
            return this.node.makeData(d);
        });

        let place = this.getLayerForeground();

        // TODO: これは D3Network でデータを管理すべき。
        this.node.drawClipCircle(place, nodes_data);

        this.selection_node
            = this.node.draw(place,
                             nodes_data,
                             this.getCallbacks());

        this.simulation.nodes(nodes_data);

        return this;
    }
    edges (data) {
        if (!data || data.length===0)
            return this;

        let links_data = data.map((d) => {
            return this.edge.makeData(d);
        });

        let place = this.getLayerBackground();

        let simulation = this.simulation;

        this.selection_edge = this.edge.draw(place, links_data);

        simulation.edges(links_data);

        return this;
    }
    addNode (data) {}
    addEdge (data) {}
}
