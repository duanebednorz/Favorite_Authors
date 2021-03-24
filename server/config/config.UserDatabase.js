const mongoose = require('mongoose'),
    uri = `mongodb://localhost/${process.env.DB_NAME}`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('You are connected to the User DB'))
    .catch(err => console.log("Something went wrong, you ain't connected to the User DB!", err));