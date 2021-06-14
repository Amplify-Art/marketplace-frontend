import React,{useState} from 'react';
import GeneralModal from '../../Components/Common/GeneralModal';
import AddShowCase from '../../Components/Parts/AddShowCase';

import showcaseImg from '../../assets/images/showcase.svg';
import './ShowCase.scss';

function ShowCase() {

    const [showShowCaseModal, toggleShowCaseModal] = useState(false);
    const showCaseData = [
        {
            image: showcaseImg,
            title: 'What is Love',
            description: 'Mint #1'
        },
        {
            image: showcaseImg,
            title: 'What is Love',
            description: 'Mint #1'
        },
        {
            image: showcaseImg,
            title: 'What is Love',
            description: 'Mint #1'
        },
        {
            image: showcaseImg,
            title: 'What is Love',
            description: 'Mint #1'
        },
        {
            image: showcaseImg,
            title: 'What is Love',
            description: 'Mint #1'
        },
        {
            image: showcaseImg,
            title: 'What is Love',
            description: 'Mint #1'
        },
        {
            image: showcaseImg,
            title: 'What is Love',
            description: 'Mint #1'
        },
        {
            image: showcaseImg,
            title: 'What is Love',
            description: 'Mint #1'
        },
    ];
    return(
        <div id='showcase'>
            <div>
                <button onClick={() => toggleShowCaseModal(!showShowCaseModal)}>Add to Showcase</button>
            </div>
            {showShowCaseModal && <GeneralModal
                headline="Add to Showcase"
                bodyChildren={<AddShowCase showCaseData={showCaseData}/>}
                closeModal={() => toggleShowCaseModal(!showShowCaseModal)}
            />
            }
        </div>
    )
};

export default ShowCase;