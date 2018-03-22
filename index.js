const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const BootBot = require('bootbot')
require('dotenv').config()

var config = {}

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.send("Hello World")
})

app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN){
    return res.send(req.query['hub.challenge'])
  }
  res.send('wrong token')
})

app.listen(app.get('port'), function(){
  console.log('Started on port', app.get('port'))
})


const bot = new BootBot({
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET
})

bot.setGreetingText("Hello, Im a bot written by Rohan")

bot.setGetStartedButton((payload, chat) => {
  chat.say('Hello World!')
});

bot.hear(['hello', 'hey', 'sup'], (payload, chat)=>{
  chat.getUserProfile().then((user) => {
    chat.say(`Hey ${user.first_name}, How are ya?`)
  })
})

bot.hear('What is the meaning of life?', (payload, chat) => {
  chat.say("42")
})

bot.hear('help', (payload, chat) => {
  chat.say("This is a boilerplate")
})

bot.start()
