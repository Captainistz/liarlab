import React from 'react'
import { motion } from 'framer-motion'

const Modal = ({ selectedImg, setSelectedImg }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null)
    }
  }

  return (
    <motion.div
      className='backdrop'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClick}>
      <motion.img
        src={selectedImg.url}
        alt='enlarged'
        initial={{ y: '-100vh' }}
        animate={{ y: '0vh' }}
        transition={{ type: 'spring', delay: 0.3, duration: 0.4 }}
      />
    </motion.div>
  )
}

export default Modal
