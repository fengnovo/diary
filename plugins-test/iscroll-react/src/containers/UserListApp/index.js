import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userAction from '../../actions/user'
import axios from 'axios'
import { UserList } from '../../components'

const mapStateToProps = state => {
    return {
        users: state.user.users,
        usersById: state.user.userById
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        actions: bindActionCreators(userAction,dispatch)
    })
}

class UserListApp extends React.Component {
    constructor (props) {
        super (props)
        // this.state = {
        //     data: []
        // }
    }
    componentWillMount () {
        const {actions} = this.props
        //  console.log(this.props);
         let _this = this;
        axios.get('/mock/users.json')
            .then(ret=>{
                actions['default']({
                    type: 'SET_USER',
                    data: ret.data.userById
                })

                // actions({
                //     type: 'SET_USER',
                //     data: ret.data
                // })
                // console.log(ret.data);
                // _this.setState({
                //     data: ret.data.userById
                // })
            })
    }
    render (){
        return (
            <UserList {...this.props} />
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserListApp)