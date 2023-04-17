import React from 'react'

function Summary({ summary, original }) {
  return (
    <div className='summary'>
        <div className='nav'>
            <h1>Text Summarizer</h1>
        </div>
        <div className='between'></div>
        <div className='text'>
          {original}
        </div>
        <h2 className='summary-hadding'>Summary</h2>
        <div className='summary-text'>
        {summary}
        </div>
    </div>
  )
}

export default Summary