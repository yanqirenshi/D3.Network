import React, { useState, useEffect } from 'react';

import D3Network, { Rectum } from './libs/index.js';

import ExampleData from './data/ExampleData.js';

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

        setRectum(makeRectum({
            node: {
                click: (node)=> {
                    node.select = !node.select;
                    setGraphData({...graph_data});
                }
            }
        }));

    }, [rectum]);

    useEffect(()=> {
        if (rectum)
            rectum.data(graph_data);
    }, [rectum, graph_data]);

    if (!rectum) return null;

    const click = ()=> {
        const n = {
            id: 100,
            _class: 'NODE-A',
            x: 0,
            y: 0,
            label: {
                text: 'Node #1',
                font: { size: 48 },
            },
            circle: {
                r: 33,
                fill: '#eeeeee',
                stroke: { color: '#cccccc', width: 3 },
            },
        };
        const e = {
            id: 1000,
            source: 1,
            target: 100,
            line: {
                width: 8,
            },
        };

        const new_graph_data = {...graph_data};

        new_graph_data.nodes = [n].concat(new_graph_data.nodes);
        new_graph_data.edges = [e].concat(new_graph_data.edges);

        setGraphData(new_graph_data);
    };

    return (
        <div style={style}>
          <div style={style.graph_area}>
            <D3Network rectum={rectum} />
          </div>

          <div style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              textAlign: 'center',
              padding: 22,
          }}>
            <button onClick={click}>
              xxx
            </button>
          </div>
        </div>
    );
}

function makeRectum (callbacks) {
    return new Rectum({
        transform: { k: 0.7, x: 400.0, y: 400.0 },
        edge: { width: 6, color: '#333333' },
        callbacks: callbacks,
    });
}

// const rectum = new Rectum({
//     transform: {
//         k: 0.7,
//         x: 400.0,
//         y: 400.0,
//     },
//     callbacks: {
//         node: {
//             click: (d,e)=> {
//                 console.log('click');
//                 console.log([d,e]);
//             },
//             dblclick: (d,e)=> {
//                 console.log('dblclick');
//                 console.log([d,e]);
//             },
//         },
//     },
//     edge: {
//         width: 6,
//         color: '#333333',
//     },
// });
