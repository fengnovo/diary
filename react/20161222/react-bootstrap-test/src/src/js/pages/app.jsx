import React from 'react';

const App = (props) => {
    return (
        <div className="content">
            {props.children}
        </div>      
    );
};

export default App;