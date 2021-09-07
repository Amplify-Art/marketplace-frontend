import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';

import './MainSideNav.scss';
import * as playListAction from '../../../redux/actions/PlaylistAction'
import useDebounce from '../UseDebounce';
import ConfettiImage from '../../../assets/images/confetti.png';
import GeneralModal from '../GeneralModal';
import NominateModal from '../../Parts/NominateModal';
import { addNominationAction, toggleNominateCongratsModal } from '../../../redux/actions/NominationAction';
import { fetchUsersAction } from '../../../redux/actions/UserAction';


function MainSideNav(props) {
  const [showNominateModal, setShowNominateModal] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [nominateName, setNominateName] = useState('');

  const debouncedSearchTerm = useDebounce(search, 500);
  const { toggleWalletSidebar, showMobileMenu } = props;
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));
  let currentUser = jwt.decode(localStorage.getItem('amplify_app_token'));
  // const isNominate = useSelector(state => state.searchRes?.isAlbumSelected || false);

  const onLogout = () => {
    localStorage.removeItem('amplify_app_token')
    sessionStorage.removeItem('activePlaylist')
    props.clearCurrentPlayList()
    // history.push("/")
  };

  const getUsers = (s) => {
    props.fetchUsers({
      params: {
        search: s && s.replace('@', '')
      }
    })
  };

  const onSearch = (e) => {
    const { value: nextValue } = e.target;
    if (nominateName === '') {
      setSelected(null)
    }
    setNominateName(nextValue)
    setSearch(nextValue);
  };

  const onSelect = user => {
    setSelected(user)
    setNominateName(user.username)
  };

  const onSubmit = (e) => {
    e.preventDefault()
    if (!selected) return
    props.addNomination({
      nominee: selected.id
    });
    setNominateName('')
    setShowNominateModal(false);
  };

  const handleGoHome = () => {
    props.history.push('/');
    props.toggleNominateCongratsModal(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length !== 0 || debouncedSearchTerm.trim() !== '') {
      getUsers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div id="main-side-nav" className={`${showMobileMenu && 'mobile-open'}`}>
        <ul>
          <li><a href="/">Home</a></li>

          <li className="nav-header">Discover</li>
          {/* <li><a href="#">New Releases</a></li> */}
          {/* <li><a href="#">Top Charts</a></li> */}
          <li><NavLink to="/artists" activeClassName="current">Artists</NavLink></li>

          <li className="nav-header">Store</li>
          {/* <li><NavLink to="#">Coming Soon</NavLink></li> */}
          <li><NavLink to="/albums" activeClassName="current">Albums</NavLink></li>
          <li><NavLink to="/marketplace" activeClassName="current">Songs</NavLink></li>

          <li className="nav-header">Profile</li>
          <li><NavLink to="/my-profile" activeClassName="current">Profile</NavLink></li>
          <li className=""><span onClick={() => setShowNominateModal(true)}>Nominate</span></li>
          <li><NavLink to="/wallet" activeClassName="current">Wallet</NavLink></li>
          <li><NavLink to="/" onClick={() => onLogout()}>Logout</NavLink></li>
          {user && user.type === 'artist' &&
            <>
              <li className="nav-header">Artist</li>
              <li><NavLink to="/artist-dashboard">Dashboard</NavLink></li>
            </>
          }
        </ul>
      </div>
      {
        showNominateModal &&
        <GeneralModal
          bodyChildren={
            <NominateModal
              daysLeft={moment().daysInMonth() - moment().date()}
              onChange={onSearch}
              onClick={onSubmit}
              onClose={() => setShowNominateModal(false)}
              inputValue={nominateName}
              suggestion={props.users}
              search={search}
              selected={selected}
              currentUser={currentUser}
              onSelect={onSelect}
            />
          }
        />
      }
      {
        props.showCongratsModal &&
        <GeneralModal
          topIcon={ConfettiImage}
          headline="Thank You For Your Nomination"
          buttons={[
            {
              type: 'solid go-home',
              text: 'Go Home',
              onClick: () => handleGoHome(),
            }
          ]}
          className="centered"
        />
      }
    </>
  );
}

export default connect(state => {
  return {
    users: state.users.users,
    showCongratsModal: state.nominations?.showCongratsModal,
  }
}, dispatch => {
  return {
    fetchUsers: (data) => dispatch(fetchUsersAction(data)),
    addNomination: (data) => dispatch(addNominationAction(data)),
    toggleNominateCongratsModal: (data) => dispatch(toggleNominateCongratsModal(data)),
    clearCurrentPlayList: () => dispatch(playListAction.clearCurrentPlayList()),
  }
})(MainSideNav);
