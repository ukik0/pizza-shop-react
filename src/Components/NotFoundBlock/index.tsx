import React from 'react'
import cl from './NotFoundBlock.module.scss'
const NotFoundBlock:React.FC = () => {
  return (
    <h1 className={cl.root}>
        <span>😕</span>
        <br />
        Ничего не найдено
        <p>Но вы всегда можете вернуться на главную!</p>
    </h1>
  )
}

export default NotFoundBlock