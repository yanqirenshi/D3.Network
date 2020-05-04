import React from 'react';

import './TabContent.css';

import ReactComponentCode from './ReactComponentCode';
import ReactComponentDescription from './ReactComponentDescription';

function TabContentReactComponent () {
    const style = {
        root: {
        },
    };

    return (
        <div className='tab-content' style={style.root}>
          <ReactComponentCode />
          <ReactComponentDescription />
        </div>
    );
}

export default TabContentReactComponent;
