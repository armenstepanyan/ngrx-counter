export interface CounterState {
  counter: number;
  title: string;
}

export const initialState: CounterState = {
  counter: 0,
  title: 'Counter example'
}
