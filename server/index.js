const express = require ('express');
const bodyParser = require ('body-parser');
const massive = require ('massive');
require ('dotenv').config()
const controller = require ('./controller')
const  {HashRouter} = require 'react-router-dom';
const app = express();
const port = 3443

ReactDOM.render(
    <HashRouter>
        <App/>
    </HashRouter>
)

app.use(bodyParser.json());


app.listen(port, () => console.log(`Docked at port: ${port}`))