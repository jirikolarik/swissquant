import { shallow } from 'enzyme'
import React from 'react'
import InstrumentTable from '../instrument-table'

const dummyData = [
  {
    instrumentId: 70,
    timeSeries: {
      entries: [
        {
          d: "2010-01-01",
          n: 30,
          v: 6545.91
        },
        {
          d: "2010-01-04",
          n: 12,
          v: 6631.44
        },
      ]
    }
  },   {
    instrumentId: 73,
    timeSeries: {
      entries: [
        {
          d: "2010-01-01",
          n: 50,
          v: 645.91
        },
        {
          d: "2010-01-04",
          n: 42,
          v: 631.44
        },
      ]
    }
  }
]

describe('Instrument table', () => {
  it('snapshot', () => {
    const wrapper = shallow(<InstrumentTable instruments={dummyData}  />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all data', () => {
    const wrapper = shallow(<InstrumentTable instruments={dummyData}  />);

    expect(wrapper.text()).toEqual(expect.stringContaining('2010-01-01'));
    expect(wrapper.text()).toEqual(expect.stringContaining('2010-01-04'));
    expect(wrapper.text()).toEqual(expect.stringContaining('6545.91'));
    expect(wrapper.text()).toEqual(expect.stringContaining('6631.44'));
    expect(wrapper.text()).toEqual(expect.stringContaining('645.91'));
    expect(wrapper.text()).toEqual(expect.stringContaining('631.44'));
  });
});
