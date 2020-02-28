const userRoutes = (app, fs) => {
const dataPath = './data/users.json';
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
         callback(returnJson ? JSON.parse(data) : data);
        });
    };
const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }
           callback();
        });
    };
//adding middle ware
app.use(function(req,res,next){
    console.log("IP address",req.ip);
    next();
});
//get
app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
   res.send(JSON.parse(data));
        });
    });
//post to create user
app.post('/users', (req, res) => {
readFile(data => {
            const newUserId = Object.keys(data).length + 1;
            data[newUserId.toString()] = req.body;
    writeFile(JSON.stringify(data, null, 2), () => {
     res.status(200).send('New user added successfully');
            });
        },
            true);
    });
//put to update user
  app.put('/users/:id', (req, res) => {
        readFile(data => {
       const userId = req.params["id"];
            data[userId] = req.body;
        writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`user with id:${userId} updated sucessfully`);
            });
        },
            true);
    });
app.delete('/users/:id', (req, res) => {
  readFile(data => {
            const userId = req.params["id"];
            delete data[userId];
      writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`user with id:${userId} removed sucessfully`);
            });
        },
            true);
    });
};

module.exports = userRoutes;