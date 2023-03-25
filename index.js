import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import initApp from './src/app.router.js';
const app = express()
const port = 5000



app.get('/', (req, res) => res.send('Hello World!'))



initApp(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))