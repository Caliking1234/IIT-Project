import React from 'react'
import Test from './Test'
import Simulation from './Simulation'
import Draw from './Draw'

const page = () => {
  return (
    <div className='lg:p-24 px-6'>
      <Test/>
      {/* <Simulation/> */}
      <Draw/>
    </div>
  )
}

export default page