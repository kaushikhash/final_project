import useStore from '../Store/Store'
import profile from '../Assets/profile.jpg'
import React from "react"
import Axios from 'axios'
import QRgenerator from './QRgenerator';
import useImage from '../Store/Images';

// import { useNavigate } from "react-router-dom";
let sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const Success = () => {
  // const success = useStore(state => state.success)
  const getImage = useImage(state => state.images);
  console.log(getImage.images)
  const success = useStore(state => state.success)
  const [post, setPost] = React.useState([]);
  React.useEffect(() => {
    sleep(2000).then(() => {

      Axios.get('http://localhost:8000/get-register').then((response) => {
        setPost(response.data.data.Formdetails);
      });
    });
  }, []);
  return (
    <div className='Overlay-success h-[80vh] w-[80vw] absolute top-[50%] left-[50%] bg-white z-[1002] border bg-gradient-to-r from-black to-slate-200'>

      <div>
        {
          post.map((val, key) => {
            // const dataa = val.img.data.data;
            // const base64String = btoa(new Uint8Array(dataa).reduce(function(data,byte){
            //   return dataa + String.fromCharCode(byte);
            // }))
            // console.log(val.name)
            return <div key={key} >
              <h1>{val.name}</h1>
              <h1>{val.email}</h1>
              <h1>{val.phone}</h1>
              {/* <img src={`data:image/jpg;base64,${base64String}`} height="100" width="300" /> */}
              {/* <div className='OS-left'>
              <div className='profile-pic-div h-[200px] w-[200px] mb-8 relative overflow-hidden border border-2 border-black rounded-full'>
                <img src={`data:image/jpg;base64,${base64String}`} id='photo' />
              </div>
            </div> */}
            </div>
          })
        }
      </div>


      <div className='OS-right'>
        <button
          type='submit'
          className=' border-2 border-black px-4 py-2 mt-2'
          onClick={() => {
            useStore.setState({ success: false });
          }}

        >
          Honse
        </button>
        <img src={getImage.images} alt="profile" width={240} height={240} />
        <QRgenerator></QRgenerator>
      </div>

    </div>
  )
}

export default Success
