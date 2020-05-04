import React, { useState } from 'react';

import Graph       from './PageExample/Graph';
import Tabs        from './PageExample/Tabs';
import TabContents from './PageExample/TabContents';

function PageExample () {
    const [selected_tab, setSelectedTab] = useState(0);

    const tabs = [
        { id: 0, label: 'React Componet' },
        { id: 1, label: 'Data: Ndoe' },
        { id: 2, label: 'Data: Edge' },
        { id: 3, label: 'Usage' },
    ];

    const style = {
        root: {
            background: '#ffffff',
            width: '1024px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        graph_area: {
            marginTop: '22px',
            marginBottom: '22px',
        }
    };

    return (
        <div style={style.root}>

          <div style={style.graph_area}>
            <Graph />
          </div>

          <div>
            <div>
              <Tabs tabs={tabs}
                    selected_tab={selected_tab} />
            </div>

            <div>
              <TabContents selected_tab={selected_tab} />
            </div>
          </div>
        </div>
    );
}

export default PageExample;
