import {Colon} from '@yanqirenshi/assh0le';

import Node from './Node';
import Edge from './Edge';
import Simulation from './Simulation';

export {Node}
export {Edge}
export {Simulation}

export default class Rectum extends Colon {
    constructor (params) {
        super(params);

        this.node = new Node();
        this.edge = new Edge();

        this.selection_node = null;
        this.selection_edge = null;

        // TODO: 利用していないけど、このクラス自体がデータを管理すべきではないか。と。
        this.data_nodes = { ht:{}, list:[] };
        this.data_edges = { ht:{}, list:[] };

        this.simulation = null;

        // TODO: 整理が必要
        this._callbacks = {};
        this.callbacks = null;
        if (params.callbacks)
            this._callbacks = params.callbacks;


        // TODO: 回避措置コード。本来は line_color はデータに持たせるべき。
        this.line_color = params.line_color || null;
        this.edge.init({line_color: this.line_color});

        // simulation
        this.simulation = this.makeSimulator();

        // これはゴミちゃうかな。
        this._drawed_at = null;
        this._initialized_at = null;
        this._initialized_at = new Date();

        return this;
    }
    isInitialized () {
        return this._initialized_at ? true : false;
    }
    selector_setAfter () {
        this.edge.drawEdgeArrowhead(this.d3Element());
    }
    /* *********** */
    /*  Simulator  */
    /* *********** */
    makeSimulator () {
        return new Simulation(() => {
            this.node.tick(this.selection_node);
            this.edge.tick(this.selection_edge);
        });
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
    draw () {
        this.nodes(this._data.nodes);
        this.edges(this._data.edges);

        this._drawed_at = new Date();
        return this;
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

        let place = this.layer('foreground');

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

        let place = this.layer('background');

        let simulation = this.simulation;

        this.selection_edge = this.edge.draw(place, links_data);

        simulation.edges(links_data);

        return this;
    }
    addNode (data) {}
    addEdge (data) {}
}
