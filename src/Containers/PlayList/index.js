import React,{useState} from 'react';
import GeneralModal from '../../Components/Common/GeneralModal';
import CreatePlayList from '../../Components/Parts/CreatePlayList';

import showcaseImg from '../../assets/images/showcase.svg';
import './PlayList.scss';

function PlayList() {

    const [showPlayListModal, togglePlayListModal] = useState(false);
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
        <div id='playlist'>
            <div>
                <button onClick={() => togglePlayListModal(!showPlayListModal)}>Create New Playlist</button>
            </div>
            {showPlayListModal && <GeneralModal
                headline="Create New Playlist"
                bodyChildren={<CreatePlayList showCaseData={showCaseData}/>}
                contentClassName="playlist-modal"
                closeModal={() => togglePlayListModal(!showPlayListModal)}
            />
            }
        </div>
    )
};

export default PlayList;