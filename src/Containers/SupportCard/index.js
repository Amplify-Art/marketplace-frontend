import React from 'react';
import Card1A from '../../assets/images/Card_1_A.png';
import Card1B from '../../assets/images/Card_1_B.png';
import Card1C from '../../assets/images/Card_1_C.png';
import Card2A from '../../assets/images/Card_2_A.png';
import Card2B from '../../assets/images/Card_2_B.png';
import Card2C from '../../assets/images/Card_2_C.png';
import Card3A from '../../assets/images/Card_3_A.png';
import Card3B from '../../assets/images/Card_3_B.png';
import Card3C from '../../assets/images/Card_3_C.png';

import './SupportCard.scss';

function SupportCard() {
     const CardData = [Card1A,Card1B,Card1C,Card2A,Card2B,Card2C,Card3A,Card3B,Card3C]; 
     const renderCards =() => {
         return CardData.map((card,index) =>(
             <div className="card-img" key={index}>
                 <img src={card} alt=""/>
             </div>
         ))
     }  
    return(
        <div className="container">
            <div className="card-title">You own 32 Support Cards</div>
            <div className="card-content">
                {renderCards()}
            </div>
        </div>
    )
} 

export default SupportCard;