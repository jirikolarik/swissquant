import { shallow } from 'enzyme'
import React from 'react'
import App from './app';
import Chart from './components/chart'
import InstrumentTable from './components/instrument-table'

describe('App', () => {
  it('snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders <Chart /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Chart)).toBeTruthy();
  });

  it('renders <InstrumentTable /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(InstrumentTable)).toBeTruthy();
  });
});
