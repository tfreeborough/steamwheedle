// @flow
import React from 'react';
import numeral from 'numeral';
import math from 'mathjs';
import css from './styles.module.scss';

import goldIcon from '../../../resources/images/ui/Gold.png';
import silverIcon from '../../../resources/images/ui/Silver.png';
import copperIcon from '../../../resources/images/ui/Copper.png';

type MoneyProps = {
  amount: number,
  size: string,
}

type MoneyState = {
  copper: number,
  silver: number,
  gold: number,
}

class Money extends React.PureComponent<MoneyProps, MoneyState> {
  state = {
    copper: 0,
    silver: 0,
    gold: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      copper: Money.setCopper(nextProps.amount),
      silver: Money.setSilver(nextProps.amount),
      gold: Money.setGold(nextProps.amount),
    };
  }

  static setCopper = (amount: number = 0): number => amount % 100;

  static setSilver = (amount: number = 0): number => math
    .floor(numeral(amount).divide(100).value() % 100);

  static setGold = (amount: number = 0): number => math
    .floor(numeral(amount).divide(10000).value());

  render() {
    const { size = 'small' } = this.props;
    const { copper, silver, gold } = this.state;

    return (
      <div className={`${css.money} ${size}`}>

        <div>
          {
            gold > 0
            && <React.Fragment>{ numeral(gold).format('0,0') } <img alt="Gold" src={goldIcon} /></React.Fragment>
          }
        </div>
        <div>
          {
            (gold > 0 || silver > 0)
            && <React.Fragment>{ silver } <img alt="Silver" src={silverIcon} /></React.Fragment>
          }

        </div>
        <div>
          { copper } <img alt="Copper" src={copperIcon} />
        </div>
      </div>
    );
  }
}

export default Money;
