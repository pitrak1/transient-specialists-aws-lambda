const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  console.log(`Event`)
  console.log(event)
  let statusCode, body
  if (event.new) {
    console.log(`Calling getModelsNew`)
    ;({ statusCode, body } = await utils.getModelsNew(client))
  } else if (event.id) {
    console.log(`Calling getModelsShow`)
    ;({ statusCode, body } = await utils.getModelsShow(client, event.id))
  } else {
    console.log(`Calling getModelsIndex`)
    ;({ statusCode, body } = await utils.getModelsIndex(client))
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
