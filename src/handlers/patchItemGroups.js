const utils = require('../utils')
const itemGroupsQueries = require('../queries/itemGroupQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const updateAddHandler = async () => {
    await client.query(itemGroupsQueries.updateAdd(event))
    return {
      statusCode: 200,
      body: {},
    }
  }

  const updateRemoveHandler = async () => {
    await client.query(itemGroupsQueries.updateRemove(event))
    return {
      statusCode: 200,
      body: {},
    }
  }

  const updateHandler = async () => {
    await client.query(itemGroupsQueries.update(event))
    return {
      statusCode: 200,
      body: {},
    }
  }

  const handler = async event => {
    try {
      if (event.add) {
        return await updateAddHandler()
      } else if (event.remove) {
        return await updateRemoveHandler()
      }
      return await updateHandler()
    } catch (e) {
      return {
        statusCode: 500,
        body: e.message,
      }
    }
  }
  return await utils.genericHandler(event, handler)
}
