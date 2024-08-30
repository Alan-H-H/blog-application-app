import { db } from "../db.js";
import bcrypt, { hash } from "bcrypt";
import  jwt  from "jsonwebtoken";

export const register = (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json("All fields are required.");
    }

    const checkQuery = "SELECT * FROM blog.users WHERE email = ? OR username = ?";
    db.query(checkQuery, [email, username], (err, data) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json("An error occurred while checking for existing user.");
        }
        if (data.length > 0) {
            return res.status(409).json("User already exists.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const insertQuery = "INSERT INTO blog.users (username, email, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [username, email, hash], (err, result) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json("An error occurred while creating the user.");
            }
            return res.status(201).json("User has been created.");
        });
    });
};



export const login = (req, res)=>{
    //CHECK USER

    const q="SELECT * FROM blog.users WHERE username = ?"

    db.query(q,[req.body.username], (err,data)=>{
        if(err) return res.json(err)
        if(data.length===0) return res.status(404).json('user not found!')

        //CHECK PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if(!isPasswordCorrect) return res.status(400).json('Wrong username or password')
        
        const token = jwt.sign({id:data[0].id}, "jwtkey")
        const {password, ...other} = data[0]

        res.cookie('access_token', token,{
            httpOnly: true
        }).status(200).json(other)
    })
}


export const logout = (req, res)=>{

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been loged out")
    
}