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
    edge: {
        width: 6,
        color: '#333333',
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
    const [rectum, setRectum] = useState(null);
    const [graph_data, setGraphData] = useState({
        nodes: exdata.makeData('nodes'),
        edges: exdata.makeData('edges'),
    });

    useEffect(()=> {
        if (rectum!==null) return;

        setRectum(new Rectum({
            transform: { k: 0.7, x: 400.0, y: 400.0 },
            edge: { width: 6, color: '#333333' },
            callbacks: {
                node: {
                    click: (node)=> {
                        node.select = !node.select;
                        setGraphData({...graph_data});
                    }
                }
            }
        }));
    }, [rectum]);

    useEffect(()=> {
        if (rectum)
            rectum.data(graph_data);
    }, [rectum, graph_data]);

    if (!rectum) return null;

    return (
        <div style={style}>
          <div style={style.graph_area}>
            <D3Network rectum={rectum} />
          </div>
        </div>
    );
}
