const express = require('express')
const bodyParser = require('body-parser')

const {
  connection,
} = require('./database/database')
const QuestionsModel = require('./database/questions')
const AnswersModel = require('./database/answers')

const PORT = 8080
const ROOT_PAGE_PATH = '/'
const app = express()

// EJS/Express config
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connection.authenticate()
  .then(() => {
    console.log('Connection successfully stablished')
  })
  .catch(err => console.log({
    status: 'And error ocurred',
    message: err.message,
    stack : err.stack ? err.stack.split('\n') : null,
    meta: err.meta,
  }))

app.get(ROOT_PAGE_PATH, (
  request,
  response
) => {
  QuestionsModel.findAll(
    { order: [['id', 'DESC']] },
    { raw: true }
  ).then(questions => response.render('index', { questions }))
})

app.get('/question/:id', (
  request,
  response
) => {
  QuestionsModel
    .findOne({
      where: {
        id: request.params.id,
      },
      raw: true,
    })
    .then(async (question) => {
      if (question) {
        AnswersModel.findAll({
          where: {
            questionId: request.params.id,
          },
          order: [['id', 'DESC']],
          raw: true,
        }).then(answers => {
          response.render('question', {
            question,
            answers,
          })
        })
      }
    })
})

app.post('/save-answer', (
  request,
  response
) => {
  const title = request.body.answer
  const questionId = request.body.question

  console.log(JSON.stringify(request.body))

  AnswersModel.create({
    title,
    questionId,
  }).then(() => response.redirect(ROOT_PAGE_PATH))
  .catch(err => console.log({
    status: 'Could not save question',
    message: err.message,
    stack: err.stack ? err.stack.split('\n') : null,
    meta: err.meta,
  }))
})

app.get('/ask', (
  request,
  response
) => {
  return response.render('ask')
})

app.post('/save-question', (
  request,
  response
) => {
  const title = request.body.title
  const question = request.body.question

  QuestionsModel.create({
    title,
    question,
  }).then(() => {
    response.redirect(ROOT_PAGE_PATH)
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
