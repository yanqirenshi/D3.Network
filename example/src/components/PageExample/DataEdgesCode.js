import React from 'react';

import 'bulma/css/bulma.min.css';

function DataEdgesCode (props) {
    const style = {
        root: {},
    };

    const data = props.graph_data.edges;

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

export default DataEdgesCode;
