import React, { useState } from 'react';

import D3Network, {Camera} from './libs/index.js';

import ExampleData from './data/ExampleData.js';

function App() {
    const [exdata] = useState(new ExampleData());
    const [graph_data, setGraphData] = useState({
        nodes: exdata.makeData('nodes'),
        edges: exdata.makeData('edges'),
    });
    const [camera] = useState(new Camera({
        look: {
            at: {x:0, y:0},
            scale: 1,
        },
    }));

    return (
        <div style={{padding: 22}}>
          <div style={{height:555, border: '1px solid #eee'}}>
            <D3Network source={graph_data} camera={camera} />
          </div>
        </div>
    );
}

export default App;
