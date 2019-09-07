// import utils from './utils'
const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  console.log(`Event`)
  console.log(event)
  let statusCode, body
  if (event.new) {
    console.log(`Calling getEquipmentNew`)
    ;({ statusCode, body } = await utils.getEquipmentNew(client))
  } else if (event.id) {
    console.log(`Calling getEquipmentShow`)
    ;({ statusCode, body } = await utils.getEquipmentShow(client, event.id))
  } else {
    console.log(`Calling getEquipmentIndex`)
    ;({ statusCode, body } = await utils.getEquipmentIndex(client))
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
