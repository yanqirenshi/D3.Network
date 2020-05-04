import React from 'react';

import './TabContent.css';
import DataEdgesCode from './DataEdgesCode';
import DataEdgesDescription from './DataEdgesDescription';

function TabContentDataEdges () {
    const style = {
        root: {
        },
    };

    return (
        <div className='tab-content' style={style.root}>
          <DataEdgesCode />
          <DataEdgesDescription />
        </div>
    );
}

export default TabContentDataEdges;
