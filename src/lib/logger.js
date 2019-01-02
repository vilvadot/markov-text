const log = (content) => {
  if(process.env.DEBUG){
    console.log(content)
  }
}

module.exports = log