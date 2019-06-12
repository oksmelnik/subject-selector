import { SELECT, UNSELECT } from '../actions/select'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT:
      return [...state, ...action.payload]

      case UNSELECT:
        const unselected = action.payload
        const newState = state.filter(item => !unselected.includes(item))
        return newState

    default :
      return state
  }
}
