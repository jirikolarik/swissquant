import { Button, ControlGroup, FormGroup, NumericInput } from "@blueprintjs/core";
import moment from 'moment';
import * as React from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Action from './actions/instruments';
import './app.css';
import Chart from './components/chart';
import InstrumentTable from './components/instrument-table';
import logo from './logo.png';
import { IState } from './types';

interface IStateProps {
  activeInstruments: IState['instruments']['activeInstruments'],
  availableInstruments: IState['instruments']['availableInstruments'],
  data: IState['instruments']['filtered'],
  startDate: IState['instruments']['startDate'],
  endDate: IState['instruments']['endDate'],
  from: IState['instruments']['from'],
  to: IState['instruments']['to']
}

type Props = IStateProps & { dispatch: Dispatch }

class App extends React.Component<Props, any> {
  public state = {
    endDate: null,
    focusedInput: null,
    startDate: null
  }

  public render() {
    return (
      <div className="app">
        <header className="app--header">
          <img src={logo} className="app--logo" alt="logo" />
        </header>
        <div className="app--layout">
          <div className="app--heading">
            <div className="app--instruments">
              <h2>Available instruments</h2>
              <div className="app--buttons">
                {this.props.availableInstruments.map((item) => {
                  const onClick = () => this.onToggleButton(item);
                  const active = this.props.activeInstruments.some((instrumentId) => instrumentId === item);
                  return (
                    <Button className="app--button" onClick={onClick} key={item} text={item} active={active} />
                  );
                })}
              </div>
            </div>
            <div className="app--filter">
              <h2>Value filter</h2>
              <ControlGroup>
                <FormGroup label="From" inline={true}>
                    <NumericInput placeholder="From" value={this.props.from} onValueChange={this.onFromChange} />
                </FormGroup>
                <FormGroup label="To" inline={true} className="app--filter--to">
                  <NumericInput placeholder="To" value={this.props.to} onValueChange={this.onToChange} />
                </FormGroup>
              </ControlGroup>
            </div>
          </div>
          <div className="app--chart">
            <Chart data={this.props.data} />
            <div className="app--daterange">
              <DateRangePicker
                startDate={moment(this.props.startDate)}
                startDateId="start_date_id"
                endDate={moment(this.props.endDate)}
                endDateId="end_date_id"
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.focusedInput}
                onFocusChange={this.setFocus}
                isOutsideRange={this.isOutsideRange}
              />
            </div>
          </div>
          <InstrumentTable instruments={this.props.data} />
        </div>
      </div>
    );
  }

  private onFromChange = (value: any) => {
    this.props.dispatch(Action.fromValueChange(value))
  }

  private onToChange = (value: any) => {
    this.props.dispatch(Action.toValueChange(value))
  }

  private isOutsideRange() {
    return false
  }

  private onToggleButton = (instrumentId: any) => {
    this.props.dispatch(Action.toggleInstrument(instrumentId))
  }

  private onDatesChange = ({ startDate, endDate }: any) => {
    this.props.dispatch(Action.changeDate(startDate, endDate))
  }

  private setFocus = (focusedInput: any) => {
    this.setState({ focusedInput })
  }
}

const mapStateToProps = (state: IState, ownProps: {}) => ({
  activeInstruments: state.instruments.activeInstruments,
  availableInstruments: state.instruments.availableInstruments,
  data: state.instruments.filtered,
  endDate: state.instruments.endDate,
  from: state.instruments.from,
  startDate: state.instruments.startDate,
  to: state.instruments.to
});

export default connect<IStateProps, {}, {}>(mapStateToProps)(App);