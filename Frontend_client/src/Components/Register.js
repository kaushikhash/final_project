import { useState } from 'react'
import { Link } from 'react-router-dom'
import profile from '../Assets/profile.jpg'
import Success from './Overlay-success'
import useStore from '../Store/Store'
import Axios from 'axios'
const Register = () => {
  const [name, setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone, setPhone] = useState(0)
  const success = useStore(state => state.success)
  setTimeout(() => {
    const imgDiv = document.querySelector('.profile-pic-div')
    const img = document.querySelector('#photo')
    const file = document.querySelector('#file')
    const uploadBtn = document.querySelector('#uploadBtn')

    imgDiv.addEventListener('mouseenter', function () {
      uploadBtn.style.display = 'block'
    })

    imgDiv.addEventListener('mouseleave', function () {
      uploadBtn.style.display = 'none'
    })

    file.addEventListener('change', function () {
      const choosedFile = this.files[0]

      if (choosedFile) {
        const reader = new FileReader()

        reader.addEventListener('load', function () {
          img.setAttribute('src', reader.result)
        })

        reader.readAsDataURL(choosedFile)
      }
    })
  })

  return (
    <div className='Register justify-center h-[100vh] flex'>
      {success && <Success />}
      <div className='Register-left-desc w-[50vw] flex flex-col items-center justify-center'>
        <h1 className='font-black text-9xl'>REGISTER</h1>
      </div>
      <div className='Register-right w-[50vw] flex flex-col items-center justify-center'>
        <div className='profile-pic-div h-[200px] w-[200px] mb-8 relative overflow-hidden border border-2 border-black rounded-full'>
          <img src={profile} id='photo' />
          <input type='file' id='file' className='hidden' />
          <label for='file' id='uploadBtn'>
            Choose Photo
          </label>
        </div>

        <div className='Form-container flex-col flex'>
          <div className='Form flex-col justify-center items-center flex'>
            <div className='Form-Name flex '>
              <label>Name</label>
              <input
                type='text'
                className='border-2 border-black  px-2 py-1 w-[fit-content] rounded  cursor-pointer'
                onChange={(e) => {setName(e.target.value)}}
              />
            </div>
            <div className='Email flex mt-4'>
              <label>Email</label>
              <input
                type='text'
                className='border-2 border-black  px-2 py-1 w-[fit-content] rounded  cursor-pointer'
                onChange={(e) => {setEmail(e.target.value)}}
              />
            </div>
            <div className='Form-Number mt-4  flex'>
              <label>Phone number</label>
              <input
                type='number'
                className='border-2 border-black  px-2 py-1 w-[fit-content] rounded  cursor-pointer'
                onChange={(e) => {setPhone(e.target.value)}}
              />
            </div>
          </div>
          <div className='Form-buttons mt-8 flex justify-end'>
            <button
              type='submit'
              className=' border-2 border-black border border-2 px-4 py-2 mt-2'
              onClick={() => {
                useStore.setState({ success: true })
                Axios.post('http://localhost:8000/register',{name,email,phone})
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
