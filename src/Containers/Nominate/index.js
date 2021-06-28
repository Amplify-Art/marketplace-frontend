import React from 'react'
import './Nominate.scss'

const Nominate = (props) => {
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
                        <h1 className='heading'>5 Days Left Until Next Nomination</h1>
                        <div className="nominate">
                            <div>Nominate yourself for this month's voting period.</div>
                            <div>Enter early in the month for next exposure.</div>
                        </div>
                        <div className="submission">1 Submission per month per user</div>
                        <div className="search">
                            <input type="text" placeholder="@ Nominate New Artists" />
                            <button className="btn">Submit Artist</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nominate