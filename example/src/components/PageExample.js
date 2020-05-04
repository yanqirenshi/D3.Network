import React, { useState } from 'react';

import ExampleDataNodes from '../js/ExampleDataNodes.js';
import ExampleDataEdges from '../js/ExampleDataEdges.js';

import Graph       from './PageExample/Graph';
import Tabs        from './PageExample/Tabs';
import TabContents from './PageExample/TabContents';

function PageExample () {
    const [selected_tab, setSelectedTab] = useState(0);
    const [graph_data, setGraphData] = useState({
        nodes: new ExampleDataNodes().makeData(),
        edges: new ExampleDataEdges().makeData(),
    });

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

    const callback = (action, data) => {
        if (action==='click-tab') {
            setSelectedTab(data);
            return;
        };
    };

    return (
        <div style={style.root}>

          <div style={style.graph_area}>
            <Graph />
          </div>

          <div>
            <div>
              <Tabs tabs={tabs}
                    selected_tab={selected_tab}
                    callback={callback} />
            </div>

            <div>
              <TabContents selected_tab={selected_tab}
                           graph_data={graph_data} />
            </div>
          </div>
        </div>
    );
}

export default PageExample;
