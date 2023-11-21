const sequelize = require('sequelize')
const {
  connection,
} = require('./database')

const Answers = connection.define('Answers', {
  title: {
    type: sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  questionId: {
    type: sequelize.DataTypes.INTEGER,
    allowNull: false,
  }
})

Answers.sync({ force: false })
  .then(() => console.log('Answers Table created successfully'))
  .catch(err => console.log({
    status: 'Something went wrong in Answers Models',
    message: err.message,
    stack: err.stack ? err.stack.split('\n') : null,
    meta: err.meta,
  }))

module.exports = Answers
