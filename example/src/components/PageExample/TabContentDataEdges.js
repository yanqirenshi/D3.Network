import React from 'react';

import './TabContent.css';
import DataEdgesCode from './DataEdgesCode';
import DataEdgesDescription from './DataEdgesDescription';

function TabContentDataEdges (props) {
    const style = {
        root: {
        },
    };

    return (
        <div className='tab-content' style={style.root}>
          <DataEdgesCode graph_data={props.graph_data} />
          <DataEdgesDescription />
        </div>
    );
}

export default TabContentDataEdges;
