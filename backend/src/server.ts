import express from 'express';
import initRoutes from './routes/routes.js'
import cors from 'cors'

const allowedOrigins = ['http://localhost:4200']

const options: cors.CorsOptions = {
    origin:allowedOrigins
}

const app = express();
const port = 8080;

app.use(cors(options))

initRoutes(app)
app.listen(port, () => console.log(`Pega o link ae: http://localhost:${port}/`));