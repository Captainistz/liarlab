import React from 'react'

const Title = () => {
  return (
    <div className='title'>
      <h2 initial={{ y: '-10vh' }} animate={{ y: '0vh' }} transition={{ duration: 0.5 }}>
        Liar's Lab
      </h2>
      <p initial={{ y: '-20vh' }} animate={{ y: '0vh' }} transition={{ delay: 0.3, duration: 0.6 }}>
        Liar. (n) : a person who tells lies.
      </p>
    </div>
  )
}

export default Title
