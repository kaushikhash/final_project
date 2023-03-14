import optical from '../Assets/optical.webp'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../Store/Store'
const Home = () => {
  const textWhite = useStore(state => state.textWhite)

  useStore.setState({ textWhite: '#ffffff' })

  return (
    <div className='Home bg-[black] h-[100vh] flex'>
      <div className='Home-left-desc w-[60vw] flex flex-col items-center justify-center'>
        <h1 className='text-white font-black text-7xl '>GET ME THROUGH</h1>
        <p className='text-white items-center mt-4 font-semibold'>
          AN EVENT ORGANISING ASSISTANT
        </p>
        <button className='text-white border border-white border-2 px-4 py-2 mt-4'>
          <Link to='/register'>Register</Link>
        </button>
      </div>
      <div className='Home-right-pic w-[40vw] flex justify-center items-center'>
        <img src={optical} className='w-[50%]  invert ' />
      </div>
    </div>
  )
}

export default Home
