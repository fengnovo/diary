import React from 'react'

class UserList extends React.Component {
    constructor (props) {
        super (props)
    }
    render (){
        // console.log(this.props);
        let liArr = [], {users} = this.props
        users.map((item)=>{
            liArr.push(<li key={item.id}>{item.name}</li>)
        })
        return (
            <ul>
                {liArr}
            </ul>
        )
    }
}

export default UserList