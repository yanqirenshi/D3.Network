import React from 'react';

import 'bulma/css/bulma.min.css';

function Tabs (props) {
    const style = {
        root: {},
        first_tab : {
            marginLeft: '22px',
        }
    };

    const isSelected = (d) => {
        return d.id===props.selected_tab ? 'is-active' : '';
    };

    const isFirstTab = (i) => {
        return i===0; 
    };

    return (
        <div className="tabs is-boxed">
          <ul>
            {
                props.tabs.map((d,i) => {
                    return <li key={d.id}
                               className={isSelected(d)}
                               style={isFirstTab(i) ? style.first_tab : null}>
                             <a>
                               <span>{d.label}</span>
                             </a>
                           </li>;
                })
            }
            {/* <li className="is-active" style={style.first_tab}> */}
            {/*   <a> */}
            {/*     <span>React Component</span> */}
            {/*   </a> */}
            {/* </li> */}
            {/* <li> */}
            {/*   <a> */}
            {/*     <span>Data: Nodes</span> */}
            {/*   </a> */}
            {/* </li> */}
            {/* <li> */}
            {/*   <a> */}
            {/*     <span>Data: Edges</span> */}
            {/*   </a> */}
            {/* </li> */}
            {/* <li> */}
            {/*   <a> */}
            {/*     <span>Usage</span> */}
            {/*   </a> */}
            {/* </li> */}
          </ul>
        </div>
    );
}

export default Tabs;
