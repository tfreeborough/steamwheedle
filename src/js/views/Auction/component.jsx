// @flow
import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import type { AuctionProps, AuctionState } from './container';
import AuctionActions from '../../store/actions/auction.actions';
import css from './styles.module.scss';

import AuctionCategories from '../../ui/AuctionCategories/component';
import AuctionItems from '../../ui/AuctionItems/component';
import BuyItemModal from '../../widgets/BuyItemModal/container';

class Auction extends React.PureComponent<AuctionProps, AuctionState> {
  auctionActions = new AuctionActions();

  componentDidMount = () => {
    this.auctionActions.getAuctionCategories();
  };

  render() {
    const {
      auctionCategories, selectedAuctionCategories, auctionItems, currentUser,
    } = this.props;

    return (
      <div className={`${css.auction} animated fadeIn`}>
        <div className={css.topper}>
          <h1 className="title">The Auction House</h1>
          <h4 className="subtitle">The tastiest items at the tastiest prices!</h4>
        </div>
        <AuctionCategories
          auctionCategories={auctionCategories}
          selectedAuctionCategories={selectedAuctionCategories}
        />
        <AuctionItems
          selectedAuctionCategories={selectedAuctionCategories}
          auctionItems={auctionItems}
          currentUser={currentUser}
        />
      </div>
    );
  }
}

export default Auction;
