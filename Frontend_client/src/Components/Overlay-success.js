import useStore from '../Store/Store'
import profile from '../Assets/profile.jpg'

const Success = () => {
  const success = useStore(state => state.success)

  return (
    <div className='Overlay-success h-[80vh] w-[80vw] absolute top-[50%] left-[50%] bg-white z-[1002] border bg-gradient-to-r from-black to-slate-200'>
      <div className='OS-left'>
        <div className='profile-pic-div h-[200px] w-[200px] mb-8 relative overflow-hidden border border-2 border-black rounded-full'>
          <img src={profile} id='photo' />
        </div>
      </div>
      <div className='OS-right'>
        <button
          type='submit'
          className=' border-2 border-black border border-2 px-4 py-2 mt-2'
          onClick={() => {
            useStore.setState({ success: false })
          }}
        >
          Honse
        </button>
      </div>
    </div>
  )
}

export default Success
