import React, { useState } from 'react'
// import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
// import {ArrowBack, GetApp} from '@material-ui/icons'
import { Link } from "react-router-dom";
import useName from '../Store/Name'
import QRcode from 'qrcode.react'
import useStore from '../Store/Store'

function QRgenerator() {
    useStore.setState({ textWhite: '#000000' })
    const getName = useName(state => state.names);
    const [qr, setQr] = useState('http://GetMeThrough/' + getName.names);
    const handleChange = (event) => {
        setQr(event.target.value);
    };
    // const downloadQR = () => {
    //     const canvas = document.getElementById("myqr");
    //     const pngUrl = canvas
    //       .toDataURL("image/png")
    //       .replace("image/png", "image/octet-stream");
    //     let downloadLink = document.createElement("a");
    //     downloadLink.href = pngUrl;
    //     downloadLink.download = "myqr.png";
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    //     document.body.removeChild(downloadLink);
    // };

    return (
        <div className='QR-generator flex justify-center items-center flex-col mt-4 p-4 w-fit-content'>
            <div className='Register-left-desc w-[50vw] flex flex-col items-center justify-center'>
                <h1 className='font-black text-7xl mt-16'>QR CODE</h1>
            </div>

            <div>
                {
                    qr ?
                        <QRcode
                            id="myqr"
                            value={qr}
                            size={200}
                            includeMargin={true}
                        /> :
                        <p>No QR code preview</p>
                }
            </div>
            <div className="Qr-box mt-4" >
                <input onChange={handleChange} style={{ width: 320 }}
                    value={qr} label="QR content" size="large" variant="outlined" color="primary"
                    className='border'
                />
            </div>
            <div>
                {/* {
                    qr ? 
                    <Grid container>
                        <Grid item xs={10}>
                        <TextareaAutosize
                            style={{fontSize:18, width:250, height:100}}
                            rowsMax={4}
                            defaultValue={qr}
                            value={qr}
                        />
                        </Grid>
                        <Grid item xs={2}>
                        <Fab onClick={downloadQR} style={{marginLeft:10}} color="primary">
                            <GetApp/>
                        </Fab>
                        </Grid>
                    </Grid> :
                    ''
                } */}
            </div>
        </div>
    );
}

export default QRgenerator;
