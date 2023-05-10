import React from 'react'

function Summary({ summary, original }) {
  return (
    <div className='summary'>
        <div className='nav'>
            <h1>Text Summarizer</h1>
        </div>
        <div className='parent'>
          <div className='child'>
            <h2 className='text-hadding'>Text File</h2>
            <div className='text'>{original}</div>
          </div>
          <div className='child'>
            <h2 className='summary-hadding'>Summary</h2>
            <div className='summary-text'>{summary}</div>
          </div>
        </div>
    </div>
  )
}

export default Summary
