const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const multer = require('multer');
const sharp = require('sharp');
const { PythonShell } = require('python-shell');
app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello there!!!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});




const Form = require('./server/models/form')
const Event = require('./server/models/event')



/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
 
const upload = multer({storage:storage})*/
const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
})


app.post('/register', upload.single('testImage'), async (req, res) => {
    filename = req.file.originalname
    filename = filename.replace("_", " ")
    try {
        await sharp(req.file.buffer).png().toFile(__dirname + `/known_people/${filename}`)
        res.status(201).send('Image uploaded succesfully')
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    const saveDetails = new Form({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    });

    saveDetails.save()
        .then((res) => {
            console.log("Detials updated");
        })
        .catch((err) => {
            console.log(err, 'error has occured');
        });

});

app.get('/get-register', async (req, res) => {
    const Formdetails = await Form.find({}).sort({ _id: -1 }).limit(1);

    try {
        res.status(200).json({
            status: 'Success',
            data: {
                Formdetails
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }

})

app.get('/train', (req, res) => {
    // var data1;
    var spawn = require("child_process").spawn;
    // spawn new child process to call the python script
    const python = spawn('python', ['D:/final_project/server/py/train.py']);

    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log('Pipe data from python script ...');
        // send data to browser
        res.json({ message: "Model is beaing trained" });
    });
})

app.post('/insert', (req, res) => {
    const saveEvents = new Event({
        event_id: req.body.event_id,
        name_of_event: req.body.name_of_event,
        description: req.body.description,
        people: req.body.people,
    });

    saveEvents.save()
        .then((res) => {
            console.log("Detials updated");
        })
        .catch((err) => {
            console.log(err, 'error has occured');
        });
})

app.post("/update", async (req, res) => {
    // var event_idd = req.body.event_id;
    // var peoplee = req.body.people;
    // console.log(event_idd, peoplee)
    let doc = await Event.findOne({ event_id: req.body[1] });
    // console.log(doc)
    console.log(req.body[0].Result)
    console.log(req.body[1])
    doc.people.push(req.body[0].Result)
    doc.save();
    res.json("Updated")
    // console.log(doc)
    // Event.updateOne(
    //     { _id: "6409e8c8e6e214e3a8f4dd62" }, { $push: { "people": ["Marathe"] } });


})

// async function update_event(event_id, people) {
//     Event.findOneAndUpdate(
//         { event_id: event_id }, people, { new: true }, (err, task) => {

//             if (err) res.send(err);
//             res.json(task);
//         }
//     );
// };