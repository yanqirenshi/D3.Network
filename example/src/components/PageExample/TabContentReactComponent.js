import React from 'react';

import './TabContent.css';

import Code from './ReactComponent/Code';
import Description from './ReactComponent/Description';

function TabContentReactComponent () {
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
            <Code />
          </div>

          <div style={style.right}>
            <Description />
          </div>
        </div>
    );
}

export default TabContentReactComponent;
