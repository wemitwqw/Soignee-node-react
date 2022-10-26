const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) throw Error("User with this e-mail does not exist")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error("I should not say that the password does not match")

    const userTemplate = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }

    const token = jwt.sign(userTemplate, process.env.JWT_SECRET)
    if (!token) throw Error("Something critical happened 99981811")

    res.status(200).json({
      token,
      ...userTemplate
    })

  } catch (e){
    res.status(400).json({ error: e.message })
  }
}

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) throw Error("User with that e-mail already exists")

    const salt = await bcrypt.genSalt(10)
    if (!salt) throw Error("Something critical happened 483543875")

    const hash = await bcrypt.hash(password, salt)
    if (!hash) throw Error("Something critical happened 123172387")

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
      role,
    })

    const savedUser = await newUser.save()
    if (!savedUser) throw Error("Error saving user")

    res.status(200).json({ message: "User created successfully" })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

exports.getUser = async (req, res) => {
  const {id} = req.params;

  const user = await User.findOne({_id: id})

  if (!user) res.status(404).send("No user with that id found")

  res.status(200).send({user})

}

exports.getUsers = async (req, res) => {
  const users = await User.find({})
  
  res.status(200).send(users)
}

exports.addUsersFollowers = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate({ _id: id }, 
    { $push: { "followers": req.body.followers } }, 
    {returnOriginal: false})

  if (!user) res.status(404).send("No item with that id found")

  res.status(200).send(`Successfully updated the following item: \n ${user}`)
}

exports.rmUsersFollowers = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate({ _id: id }, 
    { $pull: { "followers": req.body.followers } }, 
    {returnOriginal: false})

  if (!user) res.status(404).send("No item with that id found")

  res.status(200).send(`Successfully updated the following item: \n ${user}`)
}
