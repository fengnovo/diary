import React from 'react'

class UserDetailApp extends React.Component {
    constructor (props) {
        super (props)
        let {userId} = this.props.routeParams;
        console.log(userId);
    }
    render (){
        return (
            <div>UserDetailApp</div>
        )
    }
}

export default UserDetailApp