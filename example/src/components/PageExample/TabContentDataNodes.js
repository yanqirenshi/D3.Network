import React from 'react';

import './TabContent.css';

import DataNodesCode from './DataNodesCode';
import DataNodesDescription from './DataNodesDescription';

function TabContentDataNodes () {
    const style = {
        root: {
        },
    };

    return (
        <div className='tab-content' style={style.root}>
          <DataNodesCode />
          <DataNodesDescription />
        </div>
    );
}

export default TabContentDataNodes;
