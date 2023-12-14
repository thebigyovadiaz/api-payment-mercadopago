import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import routesAPI from '../routes/index.js'

const api = express();

// Json
api.use(express.json({limit: "50mb"}));
api.use(
  express.urlencoded({
    extended: true
  })
);

// Morgan
api.use(morgan('dev'));

// Static files
api.use(express.static(path.resolve('src/public')))

// Helmet
api.use(helmet());

// Cors
api.use(cors());

// Routes
routesAPI(api);

export default api;
