import React, { useState, useCallback, useEffect } from 'react'
import './Nominate.scss'
import moment from 'moment'
import { connect } from 'react-redux';
import { fetchUsersAction } from '../../redux/actions/UserAction'
import { addNominationAction, toggleNominateModal, toggleNominateCongratsModal } from '../../redux/actions/NominationAction'
import NominateModal from '../../Components/Parts/NominateModal';
import GeneralModal from '../../Components/Common/GeneralModal';
import ConfettiImage from '../../assets/images/confetti.png';
import _ from 'lodash';
import jwt from 'jsonwebtoken'

function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    _.debounce((...args) => callback(...args), delay),
    [delay] // will recreate if delay changes
  );
  return debouncedFn;
}

const Nominate = (props) => {
  let [search, setSearch] = useState('')
  let [selected, setSelected] = useState(null)
  let [nominateName, setNominateName] = useState('')
  let currentUser = jwt.decode(localStorage.getItem('amplify_app_token'));

  const getUsers = (s) => {
    props.fetchUsers({
      params: {
        search: s && s.replace('@', '')
      }
    })
  }
  const debouncedSave = useDebounce((nextValue) => getUsers(nextValue), 500);
  const onSearch = (e) => {
    const { value: nextValue } = e.target;
    if (nominateName === '') {
      setSelected(null)
    }
    setNominateName(nextValue)
    setSearch(nextValue)
    debouncedSave(nextValue);
  }
  const onSelect = user => {
    setSelected(user)
    setNominateName(user.username)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!selected) return
    props.addNomination({
      nominee: selected.id
    });
    setNominateName('')
    props.toggleNominateModal(false);
  }

  const handleGoHome = () => {
    props.history.push('/');
    props.toggleNominateCongratsModal(false);
  };

  return (
    <>
      {
        props.showNominationModal &&
        <GeneralModal
          bodyChildren={
            <NominateModal
              daysLeft={moment().daysInMonth() - moment().date()}
              onChange={onSearch}
              onClick={onSubmit}
              onClose={() => props.toggleNominateModal(false)}
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
              onClick: () => handleGoHome()
            }
          ]}
          className="centered"
        />
      }
    </>
  )
}

export default connect(state => {
  return {
    users: state.users.users,
    showNominationModal: state.nominations?.showNominationModal,
    showCongratsModal: state.nominations?.showCongratsModal,
  }
}, dispatch => {
  return {
    fetchUsers: (data) => dispatch(fetchUsersAction(data)),
    addNomination: (data) => dispatch(addNominationAction(data)),
    toggleNominateModal: (data) => dispatch(toggleNominateModal(data)),
    toggleNominateCongratsModal: (data) => dispatch(toggleNominateCongratsModal(data)),
  }
})(Nominate)