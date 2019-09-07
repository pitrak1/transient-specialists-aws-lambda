const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  console.log(`Event`)
  console.log(event)
  let statusCode, body
  if (event.id) {
    console.log(`Calling getTypesShow`)
    ;({ statusCode, body } = await utils.getTypesShow(client, event.id))
  } else {
    console.log(`Calling getTypesIndex`)
    ;({ statusCode, body } = await utils.getTypesIndex(client))
  }
  console.log(`Status Code`)
  console.log(statusCode)
  console.log(`Body`)
  console.log(body)
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body,
  }
}
