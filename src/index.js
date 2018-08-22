class Main {
    constructor (d3svg) {
        this.d3svg = d3svg;
        this.simulator = new D3Simulator().make();
    }
    refreshSvgSize () {
        let tag = this.refs.svg;

        tag.setAttribute('width',window.innerWidth);
        tag.setAttribute('height',window.innerHeight);
    }
    draw (nodes, edges, rules) {
        return;

        if (!this.d3svg)
            return;

        let d3svg = this.d3svg;

        new D3Base().draw(d3svg);
        // new D3RuleLine().draw(d3svg, rules);
        new D3Nodes().draw(d3svg,
                           nodes,
                           this.simulator,
                           (type, data) => { return; });
        new D3Edges().draw(d3svg, edges, this.simulator);
    }
}

new Main(makeD3Svg()).draw([], [], null);
