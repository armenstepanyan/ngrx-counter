import { createReducer, on } from "@ngrx/store"
import { changeTitle, customIncrement, decrement, increment, reset } from "./counter.actions"
import { initialState } from "./counter.state"

const _counterReducer = createReducer(initialState,
  on(increment, state => {
    return {
      ...state,
      counter: state.counter + 1
    }
  }),
  on(decrement, state => {
    return {
      ...state,
      counter: state.counter - 1
    }
  }),
  on(reset, state => {
    return {
      ...state,
      counter: 0
    }
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
    counter: state.counter + action.count
    }
  }),
  on(changeTitle, (state, action) => {
    return {
      ...state,
      title: action.title
    }
  })
  )


export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action)
}
