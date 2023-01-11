import React from 'react';
import './ProgressBar.scss'

function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-new">
      <div className="progress" style={{ width: progress }} />
    </div>
  )
}

export default ProgressBar