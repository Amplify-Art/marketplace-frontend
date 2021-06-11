import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import q from 'querystring'
import { LinkWallet } from '../../Api/Near'

const Success = ({ history }) => {
  useEffect(async () => {
    let parsed = q.parse(history.location.search)
    const update = await LinkWallet({
      account_id: parsed['?account_id'],
      near_public_key: parsed['public_key']
    })
    if (update.data.success) {
      localStorage.setItem('amplify_app_token', update.data.token)
      history.push('/')
      window.location.reload()
    }
  }, [])
  return (
    <div>Redirecting....</div>
  )
}

export default withRouter(Success)