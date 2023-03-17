import { Link } from 'react-router-dom'
import logo from '../Assets/logo.jpg'
import useStore from '../Store/Store'
const Navbar = () => {
  const textWhite = useStore(state => state.textWhite)
  console.log(textWhite)
  return (
    <nav className='navbar bg-transperent flex items-center p-6 justify-center absolute w-full text-white font-medium text-lg'>
      <Link to='/'>
        {/* <h1 className='text-white font-bold text-lg'>G</h1> */}
      </Link>
      <div className='links flex' style={{ color: textWhite }}>
        <Link to='/'>
          <h3
            className='px-2'
          // onClick={useStore.setState({ textWhite: 'white' })}
          >
            Home
          </h3>
        </Link>
        <Link to='/register'>
          <h3 className='px-2 ml-4'>Register</h3>
        </Link>
        {/* <Link to='/scan'>
          <h3 className='px-2 ml-4'>Scan</h3>
        </Link> */}
        <Link to='/qr'>
          <h3 className='px-2 ml-4'>QR</h3>
        </Link>
        <Link to='/events'>
          <h3 className='px-2 ml-4'>Events</h3>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
