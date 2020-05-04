import React from 'react';

import './TabContent.css';

import Code from './ReactComponent/Code';
import Description from './ReactComponent/Description';

function TabContentReactComponent () {
    const style = {
        root: {
        },
    };

    return (
        <div className='tab-content' style={style.root}>
          <Code />
          <Description />
        </div>
    );
}

export default TabContentReactComponent;
