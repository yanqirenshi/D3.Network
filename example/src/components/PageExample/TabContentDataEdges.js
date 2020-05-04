import React from 'react';

import './TabContent.css';
import Code from './DataEdges/Code';
import Description from './DataEdges/Description';

function TabContentDataEdges (props) {
    const style = {
        root: {
            display: 'flex',
        },
        left: {
            width: '488px',
        },
        right: {
            flexGrou: 1,
        },
    };

    return (
        <div className='tab-content' style={style.root}>
          <div style={style.left}>
            <Code graph_data={props.graph_data} />
          </div>

          <div style={style.right}>
            <Description />
          </div>
        </div>
    );
}

export default TabContentDataEdges;
