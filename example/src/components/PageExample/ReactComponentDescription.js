import React from 'react';

import 'bulma/css/bulma.min.css';

function ReactComponentDescription () {
    const style = {
        root: {
        },
    };

    return (
        <section className="section" style={style.root}>
          <div className="container">
            <h1 className="title">Description</h1>
            <h2 className="subtitle"></h2>
          </div>
        </section>
    );
}

export default ReactComponentDescription;
