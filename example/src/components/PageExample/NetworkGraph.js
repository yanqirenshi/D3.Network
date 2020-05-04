import React, { useState, useEffect } from 'react';

import * as d3 from 'd3';

import D3Svg from '@yanqirenshi/d3.svg';

import D3Network, {
    D3NetworkNode,
    D3NetworkEdge
} from '@yanqirenshi/d3.network';

function NetworkGraph (props) {
    const [n_node] = useState(new D3NetworkNode());
    const [n_edge] = useState(new D3NetworkEdge());

    const style = {
        root: {
            background: '#f3f3f3',
            width: '100%',
            height: '333px',
        },
    };

    useEffect(() => {
        let d3_element = d3.select('#network-graph');

        let d3svg = new D3Svg({
            d3_element: d3_element,
            look: { at: { x:0, y:0 }, },
            scale: 2,
        });

        let network = new D3Network()
            .init({
                d3_element: d3_element,
                callbacks: {
                    node: {
                        click: (d) => { console.log(['Click node', d]); },
                    },
                },
            });

        network.draw({
            node: props.graph_data.nodes.map((d) => {
                return n_node.makeData(d);
            }),
            link: n_edge.makeData(props.graph_data.edges),
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
