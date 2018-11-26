// @flow
import * as React from 'react';
import type { MainViewProps, MainViewState } from './container';
import css from './styles.module.scss';
import ApplicationActions from '../../store/actions/application.actions';

import Auction from '../Auction/container';

class MainView extends React.PureComponent<MainViewProps, MainViewState> {
  state = {

  };

  applicationActions = new ApplicationActions();

  renderView = (view: string): React.Node => {
    switch (view) {
      case 'auction':
        return <Auction />;
      default:
        return <h1>No View Found for {view}</h1>;
    }
  };


  componentDidMount = () => {
    this.applicationActions.setView('auction');
  };

  render() {
    const { view } = this.props;

    return (
      <React.Fragment className={css.mainView}>
        {
          this.renderView(view)
        }
      </React.Fragment>
    );
  }
}

export default MainView;