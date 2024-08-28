const jwt = require('jsonwebtoken');
let bcrypt=require('bcrypt');
const userModel = require('../model/userModel');

exports.register = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log(password,"pwww")
        const user = await userModel.create(req.body);
        console.log(user)
        console.log(process.JWT_SECRET,"ssssssssss")
        const token = jwt.sign({ id: user._id }, "soumenmaity8537964101", { expiresIn: '1h' });
        console.log(token,"tooo")
        res.status(201).json({massage:"User addeed successfully" ,user:user,token:token });
    } catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user || !( await bcrypt.compare(password,user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id },"soumenmaity8537964101", { expiresIn: '1h' });
        res.status(200).json({massage:"User login successfully" ,user:user,token:token });
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
};
