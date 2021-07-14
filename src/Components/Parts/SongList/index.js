import React from 'react';

const songHeader = () => (
    <div className="songlist-header">
        <label className="header-title">Song Title | Mints owned</label>
        <label className="header-title">album</label>
        <label className="header-title">Artist</label>
        <label className="header-title">For sale</label>
    </div>
)

function SongList() {
    return (
        <div>
            {songHeader()}
        </div>
    )
}

export default SongList;