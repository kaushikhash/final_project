const path = require('path');
const { mongoose } = require(path.join(__dirname, '/../db/db'));


/*function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}*/



let formSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      
  },
  phone : {
    type : Number,
    required : true
  }
  
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form