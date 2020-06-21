import React, { useState, useEffect } from 'react';

import D3Network from '@yanqirenshi/d3.network';


function NetworkGraph (props) {
    const [d3network] = useState(new D3Network());
    const [selected_node, setSelectedNode] = useState(null);

    const style = {
        root: {
            background: '#f3f3f3',
            width: '100%',
            height: '333px',
        },
        operators: {
            marginTop: '11px',
        },
    };

    useEffect(() => {
        d3network.init({
            svg: {
                selector: '#network-graph',
                w: 1024,
                h: 333,
            },
            callbacks: {
                node: {
                    click: (d) => {
                        setSelectedNode(d.select ? d : null);
                    },
                },
            },
        });
    }, []);

    useEffect(() => {
        let data = props.graph_data;

        d3network
            .nodes(data.nodes)
            .edges(data.edges);
    });

    const clickAdd = () => {
        props.callback('add_node', selected_node);
    };

    return (
        <>
          <div style={style.root}>
            <svg id='network-graph'
                 width='1024px'
                 height='333px' />

          </div>
          <div style={style.operators}>
            <button className="button"
                    disabled={selected_node ? false : true}
                    onClick={clickAdd} >
              Add Node
            </button>

            <button className="button"
                    style={{marginLeft: '11px'}}
                    disabled={selected_node ? false : true}>
              Delete Node
            </button>
          </div>
        </>
    );
}

export default NetworkGraph;
