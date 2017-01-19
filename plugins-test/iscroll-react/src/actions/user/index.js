
import * as types from '../../constants/ActionTypes'

const setUser = data => {
    return {
        type: types.SET_USER,
        data: data
    }
}

export default setUser