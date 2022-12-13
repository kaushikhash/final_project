const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");


const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());


app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello there!!!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });



  
const Form = require('./server/models/form')
const Photo = require('./server/models/form')
app.post('/register', upload.single("image"), async(req,res) => {
    const details = new Form(req.body)
    try{
        let imageUploadObject = {
            image: {
              data: req.file.buffer,
              contentType: req.file.mimetype
            },
          };
        const uploadObject = new Photo(imageUploadObject);
          // saving the object into the database
        const uploadProcess = await uploadObject.save();
        await details.save()
        res.status(201).json({
            status: 'Success',
            data : {
                details
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.get('/get-register', async (req,res) => {
    const Formdetails = await Form.find({})
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                Formdetails
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})