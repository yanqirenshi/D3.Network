import React from 'react';

import TabContentReactComponent from './TabContentReactComponent';
import TabContentDataNodes from './TabContentDataNodes';
import TabContentDataEdges from './TabContentDataEdges';
import TabContentUsage from './TabContentUsage';

function TabContents (props) {
    const style = {
        root: {
        },
    };

    return (
        <div style={style.root}>
          {props.selected_tab===0 && <TabContentReactComponent />}
          {props.selected_tab===1 && <TabContentDataNodes graph_data={props.graph_data} />}
          {props.selected_tab===2 && <TabContentDataEdges graph_data={props.graph_data} />}
          {props.selected_tab===3 && <TabContentUsage />}
        </div>
    );
}

export default TabContents;