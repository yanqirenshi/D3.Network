import React from 'react';

import './TabContent.css';
import UsageDescription from './Usage/UsageDescription';
import UsageInstall     from './Usage/UsageInstall';
import UsageDirectories from './Usage/UsageDirectories';


function TabContentUsage () {
    const style = {
        root: {
        },
    };

    return (
        <div className='tab-content' style={style.root}>
          <UsageDescription />
          <UsageInstall />
          <UsageDirectories />
        </div>
    );
}

export default TabContentUsage;
