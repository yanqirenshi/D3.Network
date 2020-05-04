import React from 'react';

import './TabContent.css';

import DataNodesCode from './DataNodesCode';
import DataNodesDescription from './DataNodesDescription';

function TabContentDataNodes (props) {
    const style = {
        root: {
        },
    };

    return (
        <div className='tab-content' style={style.root}>
          <DataNodesCode graph_data={props.graph_data} />
          <DataNodesDescription />
        </div>
    );
}

export default TabContentDataNodes;
