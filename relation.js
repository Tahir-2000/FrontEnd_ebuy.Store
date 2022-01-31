let UserModel = require("../models/usermodel.js");
let UserController ={
    find: async(req,res) => {
        let found = await UserModel.find({name: req.params.username});
        res.json(found);
    },
    all: async(req,res) =>{
        let allUsers = await UserModel.find()
        res.json(allUsers);
    },
    create: async(req,res) => {let newuser = new UserModel(req.body);
      let savedUser = await newuser.save();
      res.jason(savedUser);
},
getAllproducts: async (req,res) =>{
    letfoundUser = await UserModel.find({name: req.params.username}).populate("products");
    res.json(foundUser);
}
}
module.export = UserController;