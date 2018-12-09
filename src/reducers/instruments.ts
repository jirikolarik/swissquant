import { isNil, reject } from 'ramda';
import { Reducer } from 'redux'
import { IInstrument, IInstrumentsState, InstrumentsActionTypes } from '../types'
import instruments from './instruments.json'

function normalize(data: Array<{ d: string, v: number }>, minValue: number, maxValue: number) {
  return data.map((item) => {
    const normalizedValue = (item.v - minValue) / (maxValue - minValue) * (100 - 0) + 0;
    return ({
      ...item,
      n: normalizedValue,
      v: item.v
    })
  })
}

function filter(data: IInstrument[], ids: number[], start: string, end: string, fromV: number, toV: number) {
  const result = data.filter((item) => ids.length > 0 ? ids.some(x => x === item.instrumentId) : true).map((instrument) => {
    const firstDateIndex = instrument.timeSeries.entries.findIndex((item) => item.d >= start)
    const lastDateIndex = instrument.timeSeries.entries.findIndex((item) => item.d >= end)
    const filtered = instrument.timeSeries.entries.slice(firstDateIndex, lastDateIndex + 1)
    const values = filtered.map((item) => item.v);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    if (maxValue < fromV || minValue > toV) {
      return null;
    }
    return ({
      ...instrument,
      timeSeries: {
        entries: normalize(filtered, minValue, maxValue)
      }
    })
  })

  return reject(isNil, result);
}

function toggleInstrument(instrumentId: number, instrumentList: number[]) {
  if (instrumentList.some((item) => item === instrumentId)) {
    return instrumentList.filter((item) => item !== instrumentId)
  }

  return [...instrumentList, instrumentId]
}

const startDate = instruments.mktData[0].timeSeries.entries[0].d;
const endDate = instruments.mktData[0].timeSeries.entries[instruments.mktData[0].timeSeries.entries.length - 1].d;
const from = 0;
const to = Infinity;

const initialState: IInstrumentsState = {
  activeInstruments: [],
  availableInstruments: instruments.mktData.map((item) => item.instrumentId),
  data: instruments.mktData,
  endDate,
  errors: undefined,
  filtered: filter(instruments.mktData, [], startDate, endDate, from, to),
  from,
  loading: false,
  startDate,
  to
}

const reducer: Reducer<IInstrumentsState> = (state = initialState, action) => {
  switch (action.type) {
    case InstrumentsActionTypes.VALUE_CHANGE: {
      return ({
        ...state,
        filtered: filter(instruments.mktData, state.activeInstruments, state.startDate, state.endDate, action.from || state.from, action.to || state.to),
        from: action.from || state.from,
        to: action.to || state.to
      })
    }
    case InstrumentsActionTypes.TOGGLE_INSTRUMENT: {
      const activeInstruments = toggleInstrument(action.instrumentId, state.activeInstruments);
      return ({
        ...state,
        activeInstruments,
        filtered: filter(instruments.mktData, activeInstruments, state.startDate, state.endDate, state.from, state.to)
      })
    }
    case InstrumentsActionTypes.CHANGE_DATE: {
      const formattedStart = action.startDate && action.startDate.format('YYYY-MM-DD') || state.startDate
      const formattedEnd = action.endDate && action.endDate.format('YYYY-MM-DD') || action.startDate.format('YYYY-MM-DD') || state.startDate
      return ({
        ...state,
        endDate: formattedEnd,
        filtered: filter(instruments.mktData, [], formattedStart, formattedEnd, state.from, state.to),
        startDate: formattedStart
      })
    }
    default: {
      return state
    }
  }
}

export default reducer;
