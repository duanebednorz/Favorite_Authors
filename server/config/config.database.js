const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/${process.env.DB_ITEMS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('You are connected to the Items DB'))
    .catch(err => console.log("Something went wrong, you ain't connected!", err));