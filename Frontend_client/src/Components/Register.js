import { useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
import profile from '../Assets/profile.jpg'
import Success from './Overlay-success'
import useStore from '../Store/Store'
import validator from "validator";
import Axios from 'axios';
import useName from '../Store/Name'
import { useEmail, usePhone } from '../Store/Details';
import useImage from '../Store/Images';

const Register = () => {
  // const [message, setMessage] = useState("");
  // const validateEmail = (e) => {
  //   var email = e.target.value;

  //   if (validator.isEmail(email)) {
  //     setMessage("Thank you");
  //     setEmail(e.target.value)
  //   } else {
  //     setMessage("Please, enter valid Email!");
  //   }
  // };
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [img, setImage] = useState(null)
  const [load, setLoad] = useState(false)
  const addNames = useName(state => state.addNames);
  const addImages = useImage(state => state.addImages);
  const addEmails = useEmail(state => state.addEmails);
  const addPhones = usePhone(state => state.addPhones);
  const success = useStore(state => state.success)
  useRef(() => {
    const imgDiv = document.querySelector('.profile-pic-div')
    const imgg = document.querySelector('#photo')
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
          imgg.setAttribute('src', reader.result)
        })

        reader.readAsDataURL(choosedFile)
      }
    })
  }, [])

  const formdata = new FormData();
  formdata.append("name", name)
  formdata.append("email", email)
  formdata.append("phone", phone)
  formdata.append("testImage", img)
  let sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  const addName = () => {
    addNames({ names: name });
  };
  const addImage = () => {
    addImages({ images: URL.createObjectURL(img) });
  };
  const addEmail = () => {
    addEmails({ emails: email })
  }
  const addPhone = () => {
    addPhones({ phones: phone })
  }
  function handleSubmit() {
    addName(); addImage(); addEmail(); addPhone();
    useStore.setState({ success: true })

    Axios.post('http://localhost:8000/register', formdata)
    handleModel();
    setLoad(true)

  }

  async function handleModel() {
    sleep(1000).then(() => {
      Axios.get('http://localhost:8000/train')
    });
  }
  if (load) {
    return (
      <Success />
    )
  }

  return (
    // <form encType='multipart/form-data'>
    <div className='Register justify-center h-[100vh] flex'>
      {/* {success && name && email && phone && <Success />} */}

      <div className='Register-left-desc w-[50vw] flex flex-col items-center justify-center'>
        <h1 className='font-black text-9xl'>REGISTER</h1>
      </div>
      <div className='Register-right w-[50vw] flex flex-col items-center justify-center'>
        <div className='profile-pic-div h-[200px] w-[200px] mb-8 relative overflow-hidden border border-black rounded-full'>
          <img src={profile} id='photo' />
          <input type='file' id='file' className='hidden' name="testImage"
            onChange={e => {
              setImage(e.target.files[0])
            }}
          />

          <label for='file' id='uploadBtn'>
            Choose Photo
          </label>
        </div>


        <div className='Form-container flex-col flex'>
          <div className='Form flex-col justify-center items-center flex'>
            <div className='Form-Name flex '>
              <label>Name</label>
              <input
                required
                type='text'
                className='border-2 border-black  px-2 py-1 w-[fit-content] rounded  cursor-pointer'
                onChange={e => {
                  setName(e.target.value)

                }}
              />
            </div>
            <div className='Email flex mt-4'>
              <label>Email</label>
              <input
                type='text'
                className='border-2 border-black  px-2 py-1 w-[fit-content] rounded  cursor-pointer'
                onChange={(e) => { setEmail(e.target.value) }}

              // { setEmail(e.target.value)
              // }
              />
              {/* <span
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                {message}
              </span> */}
            </div>
            <div className='Form-Number mt-4  flex'>
              <label>Phone number</label>
              <input
                type='number'
                className='border-2 border-black  px-2 py-1 w-[fit-content] rounded  cursor-pointer'
                onChange={e => {
                  setPhone(e.target.value)
                }}
              />
            </div>
          </div>
          <div className='Form-buttons mt-8 flex justify-end'>
            <button
              type='submit'
              className=' border-2 border-black px-4 py-2 mt-2'
              onClick={() => { handleSubmit(); }}
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
