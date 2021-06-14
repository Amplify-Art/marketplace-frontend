import React from 'react';
import './AddShowCase.scss';

function AddShowCase({showCaseData}) {
    return(
        <div id="addshowcase">
            {
                showCaseData && showCaseData.length > 0 && showCaseData.map((showcase,item) => (
                    <div className="row">
                        <img src={showcase.image} alt=""/>
                        <div className="row-wrap">
                            <div className="row-title">{showcase.title}</div>
                            <div className="row-desc">{showcase.description}</div>
                        </div>
                        <button className="add-btn">Add</button>
                    </div>
                ))
            }
        </div>
    )
};

export default AddShowCase;