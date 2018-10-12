const suma = (req, res) => {
  try{
    const sumando1 = req.swagger.params.sumando1.value
    const sumando2 = req.swagger.params.sumando2.value
    const resultado = sumando1 + sumando2 
    res.json({
      result: {
          total: resultado
        }
    })
  }
  catch(err){
    res.status(500)
    res.json('Internal Server Error')
    res.locals.error = err
  }
}

const division = (req, res) => {
  try{
    const dividendo = req.swagger.params.dividendo.value
    const divisor = req.swagger.params.divisor.value
    const quotient = Math.floor(dividendo / divisor)
    const rest = dividendo % divisor 
    const result = {
      quotient,
    }
    if (rest)
      result['rest']=rest
    console.log(result)
    res.json({result})
  }
  catch(err){
    res.status(500)
    res.json('Internal Server Error')
    res.locals.error = err
  }
}

module.exports = {
  suma,
  division
};
