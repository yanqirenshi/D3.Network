import React, { useState } from 'react';

import ExampleDataNodes from '../js/ExampleDataNodes.js';
import ExampleDataEdges from '../js/ExampleDataEdges.js';

import NetworkGraph from './PageExample/NetworkGraph';
import Explanation  from './PageExample/Explanation'; 

function PageExample () {
    const [graph_data, setGraphData] = useState({
        nodes: new ExampleDataNodes().makeData(),
        edges: new ExampleDataEdges().makeData(),
    });

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
        }
    };

    return (
        <div style={style.root}>

          <div style={style.graph_area}>
            <NetworkGraph graph_data={graph_data} />
          </div>

          <div>
            <Explanation graph_data={graph_data}/>
          </div>
        </div>
    );
}

export default PageExample;
