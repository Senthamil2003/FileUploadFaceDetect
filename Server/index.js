const express = require("express");
const app = express();
const db = require("./Connect")
const multer = require('multer');
const path = require('path');
const bodyParser = require("body-parser");
const CORS = require ("cors")
app.use(CORS());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true})); 
const port = 3001;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/semmo/Documents/Loga pro/upload'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  
  res.sendStatus(200);
});
app.post("/signup", async(req,res)=>{
  
  const { name, mail, password, role } = req.body;
  try{
      const items = await db.promise().query("insert into signup (name,email,password,) values(?,?,?)", [name,mail,password]);
      res.send("success") 
  }
  catch(err){
      res.status(500).send(err)
  }
  
})
app.get("/login", async(req,res)=>{

  const { mail,password } = req.query;
 console.log(mail,password)
  
  try{
      const users = await db.promise().query("select * from signup where email=?  and password=?",[mail,password]);
      res.json(users) 
  }
  catch(err){
      res.status(500).send(err)
  }
  
})

app.listen(port, () => {

    console.log(`Server is running on ptr ${port}`);
  });
  