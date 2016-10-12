import React from 'react';

let i = 1;
let myStyle = {
    'fontSize': '16px'
}

class Div1 extends React.Component {

    render (){
        return(
            <div>
                <h1>{1+3}</h1>
                <h1>{i === 1 ? 'True!' : 'False'}</h1>
                <h1 style = {myStyle}>菜鸟教程</h1>
                {/*注释...*/}
            </div>
        );
    }
}

export default Div1;