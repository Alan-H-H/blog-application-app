import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import cookieParser from 'cookie-parser'
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.static(path.join(__dirname, '../client/public')));
const corsOptions = {
    origin: 'http://localhost:3000',  // Base URL of your frontend
    methods: ' GET, POST, PUT, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), function (req, res, next) {
    const file = req.file
    res.status(200).json(file.filename)
  })


// Register routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8800, () => {
    console.log("Server is running on port 8800");
});
