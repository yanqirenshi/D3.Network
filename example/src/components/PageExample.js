import React, { useState } from 'react';

import D3Network, {Camera} from '../libs/index.js';

import Explanation  from './PageExample/Explanation';
import ExampleData from '../data/ExampleData.js';

const style = {
    root: {
        background: '#ffffff',
        width: '1024px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    graph_area: {
        marginTop: '22px',
        marginBottom: '22px',
    },
    h1: {
        fontSize: '33px',
        fontWeight: 'bold',
        marginTop: '11px',
    },
};

function PageExample () {
    const [exdata] = useState(new ExampleData());
    const [graph_data, setGraphData] = useState({
        nodes: exdata.makeData('nodes'),
        edges: exdata.makeData('edges'),
    });
    const [camera] = useState(new Camera({
        look: {
            at: {x:0, y:0},
            scale: 2,
        },
    }));

    const callback = (action, data) => {
        if (action==='add_node') {
            let nodes = [...graph_data.nodes];
            let edges = [...graph_data.edges];

            let from_node = nodes.find((d) => {
                return d.id === data.id;
            });

            let new_node = exdata.makeNodeData();

            let new_edge = exdata.makeEdgeData(from_node, new_node);

            nodes.push(new_node);
            edges.push(new_edge);

            setGraphData({
                nodes: nodes,
                edges: edges,
            });
        }
    };

    return (
        <div style={style.root}>

          <div>
            <h1 style={style.h1}>Example of React</h1>
          </div>

          <div style={style.graph_area}>
            <D3Network source={graph_data}
                       camera={camera}
                       callback={callback} />
          </div>

          <div>
            <Explanation graph_data={graph_data}/>
          </div>
        </div>
    );
}

export default PageExample;
