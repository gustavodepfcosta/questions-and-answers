const Sequelize = require('sequelize')

const connection = new Sequelize(
  'questions',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
  }
)

module.exports = {
  connection
}
