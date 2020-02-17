var mongoose = require('mongoose');
const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
var crypto = require('crypto')
var multer = require('multer')
var GridFsStorage = require('multer-gridfs-storage')
var Grid = require('gridfs-stream')


    const conn = mongoose.createConnection(process.env.DB, { useUnifiedTopology: true })

    let gfs;
    conn.once('open', () => {
        gfs = Grid(conn.db, mongoose.mongo)
        gfs.collection('uploads')
    })

    // init storage 

    const storage = new GridFsStorage({


        url: process.env.DB,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                });
            });
        }
    });


    const upload = multer({ storage });





    // upload request 
    router.post('/upload', upload.single('file'), (req, res) => {
        res.json({ file: req.file })
    })



    // get all file name and details
    router.get('/getall', (req, res) => {
        gfs.files.find().toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: 'no file'
                })
            }
            return res.json(files)
        })
    })


    // get specific file name and other details
    router.get('/imagesByFilename/:filename', (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            if (!file || file.length === 0) {
                 
                return res.status(404).json({
                    err: 'no file'
                })
            }
            return res.json(file)
        })
    })


    // read file and get image 
    router.get('/:filename', (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            if (file) {
                if (!file || file.length === 0) {
                   
                    return res.status(404).json({
                        err: 'no file found'
                    })
                }
                if (file.length !== 0 && file) {
                    var readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res);
                }
                else {
                    return res.status(404).json({
                        err: 'file Error'
                    })
                }
            }
            else {
                res.status(404).json({
                    err: 'no such file'
                })
            }



            if (err) {
                res.status(404).json({
                    err: 'error while finding file'
                })
            }
        })
    })

module.exports = router;