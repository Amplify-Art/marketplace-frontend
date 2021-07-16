import React, { useState, useEffect, useCallback } from 'react'
import './Nominate.scss'
import moment from 'moment'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsersAction } from '../../redux/actions/UserAction'
import { addNominationAction } from '../../redux/actions/NominationAction'
import _ from 'lodash';

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
  let [nominateName,setNominateName] = useState('')
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
    if(nominateName===''){
      setSelected(null)
    }
    console.log(nextValue)
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
    })
  }
  return (
    <div id="nominate-container">
      <div className='container'>
        <div className='nominate-banner'>Nomination</div>


        <div className="nominet_border1">
          <div className="nominet_border2">
          </div>
        </div>
        <div className='nominate_wrapp'>
          <div className='content'>
            <h1 className='heading'>{moment().daysInMonth() - moment().date()} Days Left Until Next Nomination</h1>
            <div className="nominate">
              <div>Nominate yourself for this month's voting period.</div>
              <div>Enter early in the month for next exposure.</div>
            </div>
            <div className="submission">1 Submission per month per user</div>
            <div className="search">
              <input type="text" placeholder="@ Nominate New Artists" onChange={onSearch} value={nominateName} />
              <button className="btn" onClick={onSubmit}>Submit Artist</button>
            </div>
            {search && !selected &&
              <div className="user-list" >
                <div className="user-inner" id="modalScrolling">
                  {props.users.map(u => <span onClick={() => onSelect(u)}>@{u.username}</span>)}
                  </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(state => {
  return {
    users: state.users.users
  }
}, dispatch => {
  return {
    fetchUsers: (data) => dispatch(fetchUsersAction(data)),
    addNomination: (data) => dispatch(addNominationAction(data)),
  }
})(Nominate)