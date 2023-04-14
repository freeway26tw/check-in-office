const userController = {
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    res.redirect('/punch')
  },
  editUser: (req, res) => {
    
  }
}

module.exports = userController