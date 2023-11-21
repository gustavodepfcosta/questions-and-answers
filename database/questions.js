const sequelize = require('sequelize')
const {
  connection,
} = require('./database')

const Questions = connection.define('Questions', {
  title: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  question: {
    type: sequelize.DataTypes.TEXT,
    allowNull: false,
  },
})

console.log('Model defined')

Questions.sync({ force: false })
  .then(() => console.log('Questions table sucessfully created'))
  .catch(err => console.log({
    message: err.message,
    stack: err.stack ? err.stack.split('\n') : null,
    meta: err.meta,
  }))

module.exports = Questions
