const axios = require('axios')

// axios.get('https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/2023.json')
//   .then(function (response) {
//     console.log(response.data.filter(d => d.isHoliday === true))
//   })

const punchController = {
  getDashboard: (req, res) => {
    res.render('dashboard')
  }
}

module.exports = punchController