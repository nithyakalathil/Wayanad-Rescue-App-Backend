const express = require("express")
const mogoose = require("mongoose")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const loginModel = require("./models/admin")
const dataModel = require("./models/peaple")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://nithya:nithya913@cluster0.r7eo1il.mongodb.net/resqueDB?retryWrites=true&w=majority&appName=Cluster0")


app.post("/adminSignUp", (req, res) => {
    let input = req.body
    let hashedpassword = bcrypt.hashSync(input.password, 10)
    input.password = hashedpassword
    console.log(input)
    let result = new loginModel(input)
    result.save()
    res.json({ "status": "success" })
})


app.post("/adminSignIn", (req, res) => {
    let input = req.body
    let result = loginModel.find({ username: input.username }).then((response) => {
        if (response.length > 0) {
            const validator = bcrypt.compareSync(input.password, response[0].password)
            if (validator) {
                jwt.sign({ email: input.username }, "rescue-app", { expiresIn: "1d" }, (error, token) => {
                    if (error) {
                        res.json({ "status": "token created failed" })

                    } else {
                        res.json({ "status": "success", "token": token })


                    }
                })

            } else {
                res.json({ "status": "Wrong passsword is entered" })

            }

        } else {
            res.json({ "status": "username does not exist" })
        }
    })

})


app.post("/addData", (req, res) => {
    let input = req.body
    let token = req.headers.token
    jwt.verify(token, "rescue-app", (error, decoded) => {
        if (decoded && decoded.email) {
            let result = new dataModel(input)
            result.save()
            res.json({ "status": "success" })
        } else {
            res.json({ "status": "invalid authentication" })

        }
    })
})

app.post("/viewAll", (req, res) => {
    let token = req.headers["token"]
    jwt.verify(token, "rescue-app", (error, decoded) => {
        if (decoded) {
            dataModel.find().then(
                (responce) => {
                    res.json(responce)
                }
            )
        }
    })
})

app.listen(8080, () => {
    console.log("server started")
})