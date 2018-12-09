import { InstrumentsActionTypes } from '../types'

export const changeDate = (startDate: any, endDate: any) => ({
  endDate,
  startDate,
  type: InstrumentsActionTypes.CHANGE_DATE
})

export const toggleInstrument = (instrumentId: number) => ({
  instrumentId,
  type: InstrumentsActionTypes.TOGGLE_INSTRUMENT
})

export const fromValueChange = (value: number) => ({
  from: value,
  type: InstrumentsActionTypes.VALUE_CHANGE
})


export const toValueChange = (value: number) => ({
  to: value,
  type: InstrumentsActionTypes.VALUE_CHANGE
})
