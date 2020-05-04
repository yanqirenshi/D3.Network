import React from 'react';

import 'bulma/css/bulma.min.css';

function Code (props) {
    const style = {
        root: {
            paddingTop: '0px',
        },
        pre: {
            fontSize: '14px',
            lineHeight: '16px',
        }
    };

    const data = props.graph_data.nodes;

    return (
        <section className="section" style={style.root}>
          <div className="container">
            <div className="contents">
              <pre style={style.pre}>
                {JSON.stringify(data, null, 4)}
              </pre>
            </div>
          </div>
        </section>
    );
}

export default Code;
