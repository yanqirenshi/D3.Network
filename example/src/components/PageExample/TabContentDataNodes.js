import React from 'react';

import './TabContent.css';

import Code from './DataNodes/Code';
import Description from './DataNodes/Description';

function TabContentDataNodes (props) {
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

export default TabContentDataNodes;
