// @flow
import React from 'react';
import numeral from 'numeral';
import uuidv4 from 'uuid/v4';
import type { XpBarProps, XpBarState } from './container';
import css from './styles.module.scss';
import { playSound } from '../../helpers/soundHelper';

class XpBar extends React.PureComponent<XpBarProps, XpBarState> {
  state = {
  };

  constructor(...args) {
    super(...args);

    const { currentUser } = this.props;
    this.state = { oldUser: currentUser };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentUser.level !== state.oldUser.level) {
      playSound('user/levelUp');
    }
    return {
      oldUser: props.currentUser,
    };
  }

  get currentXpWidth() {
    const { availableLevels, currentUser } = this.props;
    const { oldUser } = this.state;
    return numeral(100)
      .divide(availableLevels[currentUser.level])
      .multiply(currentUser.current_experience)
      .value();
  }

  buildSegments = () => {
    const segments = [];
    for (let i = 0; i < 19; i += 1) {
      segments.push(<div key={uuidv4()} className={css.segmentItem} />);
    }
    return segments;
  };

  render() {
    const { availableLevels, currentUser } = this.props;

    return (
      <div className={css.xpBar}>
        {
          availableLevels !== null
            && (
            <React.Fragment>
              <div className={css.segments}>
                { this.buildSegments() }
              </div>
              <div className={css.summary}>
                {
                  currentUser.level < 60
                    ? (
                      <span>
                        XP { currentUser.current_experience } /
                        &nbsp;{ availableLevels[currentUser.level] }
                        &nbsp;<strong>(Level { currentUser.level })</strong>
                      </span>
                    )
                    : <span>Level 60</span>
                }
              </div>
              {
                currentUser.level < 60
                  ? (
                    <div
                      className={css.currentxp}
                      style={{
                        width: `${this.currentXpWidth}%`,
                      }}
                    />
                  )
                  : (
                    <div
                      className={`${css.currentxp} ${css.maxlevel}`}
                      style={{
                        width: '100%',
                      }}
                    />
                  )
              }

              <div className={css.currentxpfade} />
            </React.Fragment>
            )
        }
      </div>
    );
  }
}

export default XpBar;
