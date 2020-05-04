import React from 'react';

import './App.css';

import PageExample from './components/PageExample';

function App() {
    const style = {
        root: {
            background: '#fefefe',
        },
    };

    return (
        <div className="App" style={style.root}>
          <PageExample />
        </div>
    );
}

export default App;
