
export interface IInstrument {
  instrumentId: number,
  timeSeries: {
    entries: Array<{
      d: string,
      v: number,
      n?: number
    }>
  }
}

export const enum InstrumentsActionTypes {
  VALUE_CHANGE = '@@instruments/VALUE_CHANGE',
  TOGGLE_INSTRUMENT = '@@instruments/TOGGLE_INSTRUMENT',
  CHANGE_DATE = '@@instruments/CHANGE_DATE'
}

export interface IInstrumentsState {
  readonly activeInstruments: number[]
  readonly availableInstruments: number[]
  readonly loading: boolean
  readonly data: IInstrument[]
  readonly filtered: IInstrument[]
  readonly errors?: string,
  readonly startDate: string,
  readonly endDate: string,
  readonly from: number,
  readonly to: number
}


export interface IState {
  readonly instruments: IInstrumentsState
}