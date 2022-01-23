import React, { useState, useEffect } from 'react';

import D3Network, { Rectum } from './libs/index.js';

import ExampleData from './data/ExampleData.js';

const rectum = new Rectum({
    transform: {
        k: 0.7,
        x: 400.0,
        y: 400.0,
    },
    callbacks: {
        node: {
            click: (d,e)=> {
                console.log('click');
                console.log([d,e]);
            },
            dblclick: (d,e)=> {
                console.log('dblclick');
                console.log([d,e]);
            },
        },
    },
});

const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    graph_area: {
        width:  800 + (22*2),
        height: 600 + (22*2),
        background: '#eee',
        padding: 22,
        borderRadius: 5,
    },
};

const exdata = new ExampleData();

export default function App() {
    const [graph_data, setGraphData] = useState({
        nodes: exdata.makeData('nodes'),
        edges: exdata.makeData('edges'),
    });

    useEffect(()=> rectum.data(graph_data), [graph_data]);

    return (
        <div style={style}>
          <div style={style.graph_area}>
            <D3Network rectum={rectum} />
          </div>
        </div>
    );
}
