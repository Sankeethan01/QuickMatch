import React from 'react'
import './PageTitle.css'

const PageTitle = ({heading}) => {
  return (
    <div className='page-title'>
       <h1>{heading}</h1>
    </div>
  )
}

export default PageTitle