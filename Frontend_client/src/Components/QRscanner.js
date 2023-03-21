import React, { useState } from 'react'
// import {Fab, TextareaAutosize} from '@material-ui/core'
// import {ArrowBack} from '@material-ui/icons'
import { Link } from "react-router-dom";
import QrScan from 'react-qr-reader';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

function QRscanner() {
    const location = useLocation()
    const event_idd = location.state.event_id
    const [qrscan, setQrscan] = useState('No result');
    const handleScan = data => {
        if (data) {
            // console.log(typeof (data))
            // console.log())
            setQrscan(data.slice(20))
        }
    }
    const handleError = err => {
        console.error(err)
    }
    async function handleEvents() {
        axios.post('http://localhost:8000/update', [qrscan, event_idd])
    }

    return (
        <div>
            <Link to="/">
                {/* <Fab style={{marginRight:10}} color="primary">
                <ArrowBack/>
            </Fab> */}
            </Link>
            <span>QR Scanner</span>

            <center>
                <div style={{ marginTop: 30 }}>
                    <QrScan
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ height: 240, width: 320 }}
                    />
                </div>
            </center>

            <textarea
                style={{ fontSize: 18, width: 320, height: 100, marginTop: 100 }}
                rowsMax={4}
                defaultValue={qrscan}
                value={qrscan}
            />
            <button onClick={handleEvents}>Register</button>

        </div>
    );
}

export default QRscanner;
