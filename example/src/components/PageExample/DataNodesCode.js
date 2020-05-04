import React from 'react';

import 'bulma/css/bulma.min.css';

function DataNodesCode (props) {
    const style = {
        root: {},
    };

    const data = props.graph_data.nodes;

    return (
        <section className="section" style={style.root}>
          <div className="container">
            <h1 className="title">Code</h1>
            <h2 className="subtitle"></h2>

            <div className="contents">
              <pre>{JSON.stringify(data, null, 4)}</pre>
            </div>
          </div>
        </section>
    );
}

export default DataNodesCode;
