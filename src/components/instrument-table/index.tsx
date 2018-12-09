import * as React from 'react';
import { IInstrument } from '../../types';
import './index.css';

interface IProps {
  instruments: IInstrument[]
}

class InstrumentTable extends React.Component<IProps> {
  public state = {
    active: null
  }

  public render() {
    if (!this.props.instruments[0]) {
      return null
    }

    return (
      <div className="c--instrument-table--table">
        <div className="c--instrument-table--header">
          <div className="c--instrument-table--header--item">Date</div>
          {this.props.instruments[0].timeSeries.entries.map((i) => <div className="c--instrument-table--header--item" key={i.d}>{i.d}</div>)}
        </div>
        {this.props.instruments.map((instrument) => (
          <div key={instrument.instrumentId} className="c--instrument-table--column">
            <div className="c--instrument-table--header--item">{instrument.instrumentId}</div>
            {instrument.timeSeries.entries.map((entry, i) => {
              const onMouseEnter = () => this.setState({ active: i })
              const className = i === this.state.active ? "c--instrument-table--item--active" : "c--instrument-table--item"
              return <div onMouseOver={onMouseEnter} className={className} key={entry.d}>{entry.v}</div>;
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default InstrumentTable;
