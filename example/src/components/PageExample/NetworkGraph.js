import React, { useState, useEffect } from 'react';

import D3Svg from '@yanqirenshi/d3.svg';

import D3Network, {
    D3NetworkNode,
    D3NetworkEdge,
} from '@yanqirenshi/d3.network';

// import D3Network, {
//     D3NetworkNode,
//     D3NetworkEdge,
// } from './D3Network.js';

function NetworkGraph (props) {
    const [n_node] = useState(new D3NetworkNode());
    const [n_edge] = useState(new D3NetworkEdge());
    const [d3svg] = useState(new D3Svg());
    const [d3network] = useState(new D3Network());

    const style = {
        root: {
            background: '#f3f3f3',
            width: '100%',
            height: '333px',
        },
    };

    useEffect(() => {
        d3svg.init({
            d3_element: '#network-graph',
            w: 1024,
            h: 333,
            look: { at: { x:0, y:0 }, },
            scale: 2,
        });

        let callbacks = {
            node: {
                click: (d) => { console.log(['Click node', d]); },
            },
        };

        d3network.init({
            d3_element: d3svg.d3Element(),
            callbacks: callbacks,
        });

        let nodes = props.graph_data.nodes;
        let edges = props.graph_data.edges;

        d3network.draw({
            node: nodes.map((d) => { return n_node.makeData(d); }),
            link: edges.map((d) => { return n_edge.makeData(d); }),
        });
    });

    return (
        <div style={style.root}>
          <svg id='network-graph'
               width='1024px'
               height='333px' />
        </div>
    );
}

export default NetworkGraph;
