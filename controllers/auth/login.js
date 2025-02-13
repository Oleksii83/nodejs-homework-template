const { BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../../model')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new BadRequest('wrong email or password')
  }

  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '4h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: { token },
  })
}

module.exports = login
