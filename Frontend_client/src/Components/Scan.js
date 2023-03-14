import QRgenerator from "./QRgenerator";
import QRscanner from "./QRscanner";
import useStore from '../Store/Store'

const Scan = () => {

    useStore.setState({ textWhite: '#000000' })
    return ( 
    <div className="Scan  ">
        <div className="Scan-Container flex items-center justify-center pt-24">
            <div className='Scan-top w-[50vw] flex flex-col items-center justify-center'>
                <h1 className='font-black text-9xl'>SCAN</h1>
            </div>
            <div className="QR w-[50vw]">
                <QRscanner/>
            </div>
        </div>
    </div> );
}
 
export default Scan;