import { shallow } from 'enzyme'
import React from 'react'
import { Line } from 'recharts'
import Chart, { SimpleLineChart } from '../chart'

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

describe('Chart', () => {
  it('snapshot', () => {
    const wrapper = shallow(<Chart data={dummyData}  />);
    expect(wrapper).toMatchSnapshot();
  });

  it('is empty when no data are provided', () => {
    const wrapper = shallow(<Chart data={[]}  />);

    expect(wrapper.text()).toBeFalsy();
  });

  it('is empty when no data are provided', () => {
    const wrapper = shallow(<Chart data={dummyData} />);

    expect(wrapper.find(SimpleLineChart)).toBeTruthy();
  });
});

describe('SimpleLineChart', () => {
  it('is renders two lines', () => {
    const wrapper = shallow(<SimpleLineChart data={dummyData} dataKeys={[70, 73]} />);

    expect(wrapper.find(Line).length).toBe(2);
  });
});
