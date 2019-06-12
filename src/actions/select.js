export const SELECT = 'SELECT'
export const UNSELECT = 'UNSELECT'


export const select = (ids) => ({
  type: SELECT,
  payload: ids
})

export const unSelect = (ids) => ({
  type: UNSELECT,
  payload: ids
})
