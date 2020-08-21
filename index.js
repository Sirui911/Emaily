//后端用这种写法
const express = require('express');
//采用单app
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
}); 

//dynamic port binding
const PORT = porcess.env.PORT || 5000;
app.listen(PORT);
// http://localhost:5000/