const log = content => {
  if(process.env.DEBUG_CHAIN){
    console.log(content)
  }
}

module.exports = log