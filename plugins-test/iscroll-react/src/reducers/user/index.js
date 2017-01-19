import * as types from '../../constants/ActionTypes'

const initalState = {
    users: [],
    usersById: []
}

const user = (state =  initalState, action) => {
    switch (action.type){
        case types.SET_USER:
            return {
                ...state,
                users: action.data.users,
                usersById: action.data.userById
            }
        default:
            return state
    }
}

export default user