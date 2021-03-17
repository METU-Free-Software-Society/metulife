import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { invitesEnabled, version, repository, source_url } from 'flavours/glitch/util/initial_state';
import { signOutLink, securityLink } from 'flavours/glitch/util/backend_links';
import { logOut } from 'flavours/glitch/util/log_out';
import { openModal } from 'flavours/glitch/actions/modal';

const messages = defineMessages({
  logoutMessage: { id: 'confirmations.logout.message', defaultMessage: 'Are you sure you want to log out?' },
  logoutConfirm: { id: 'confirmations.logout.confirm', defaultMessage: 'Log out' },
});

const mapDispatchToProps = (dispatch, { intl }) => ({
  onLogout () {
    dispatch(openModal('CONFIRM', {
      message: intl.formatMessage(messages.logoutMessage),
      confirm: intl.formatMessage(messages.logoutConfirm),
      onConfirm: () => logOut(),
    }));
  },
});

export default @injectIntl
@connect(null, mapDispatchToProps)
class LinkFooter extends React.PureComponent {

  static propTypes = {
    onLogout: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  handleLogoutClick = e => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onLogout();
 
    return false;
  }

  render () {
    return (
      <div className='getting-started__footer'>
        <ul>
          {invitesEnabled && <li><a href='/invites' target='_blank'><FormattedMessage id='getting_started.invite' defaultMessage='Invite people' /></a> · </li>}
          <li><a href='/about/more' target='_blank'><FormattedMessage id='navigation_bar.info' defaultMessage='About this server' /></a> · </li>
          <li><a href='/apps/index.html' target='_blank'><FormattedMessage id='navigation_bar.apps' defaultMessage='Mobile apps' /></a> · </li>
          <li><a href='/terms' target='_blank'><FormattedMessage id='getting_started.terms' defaultMessage='Terms of service' /></a> · </li>
          <li><a href={signOutLink} onClick={this.handleLogoutClick}><FormattedMessage id='navigation_bar.logout' defaultMessage='Logout' /></a></li>
        </ul>

        <p>
          <FormattedMessage
            id='getting_started.open_source_notice'
            defaultMessage='Metu.Life is a free as in freedom software forked from {Mastodon}. View our {github}. You can donate at {patreon} to support us.'
            values={{
              github: <span><a href='https://git.oyd.org.tr/MetuFSS/metu.life' rel='noopener noreferrer' target='_blank'>source code</a> (v{version})</span>,
              Mastodon: <a href='https://github.com/glitch-soc/mastodon' rel='noopener noreferrer' target='_blank'>glitch-soc/mastodon</a>,
              patreon: <a href='https://patreon.com/MetuLife' rel='noopener noreferrer' target='_blank'>Patreon</a> }}
          />
        </p>
      </div>
    );
  }

};
