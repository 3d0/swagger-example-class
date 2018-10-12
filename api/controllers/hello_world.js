
const util = require('util');

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

const hello = (req, res) => {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  try{
    const name = req.swagger.params.name.value || 'stranger'
    const hello = util.format('Hello, %s!', name)
    res.json(hello)
  }
  catch(err){
    res.status(500)
    res.json('Internal Server Error')
    res.locals.error = err
  }
  // this sends back a JSON response which is a single string
  
}
module.exports = {
  hello: hello
};
