import React from 'react';

import './TabContent.css';
import Code from './DataEdges/Code';
import Description from './DataEdges/Description';

function TabContentDataEdges (props) {
    const style = {
        root: {
        },
    };

    return (
        <div className='tab-content' style={style.root}>
          <Code graph_data={props.graph_data} />
          <Description />
        </div>
    );
}

export default TabContentDataEdges;
