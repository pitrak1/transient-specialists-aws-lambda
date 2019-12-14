const utils = require('../utils')
const itemGroupsQueries = require('../queries/itemGroupQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const updateAddModelHandler = async () => {
    await client.query(itemGroupsQueries.updateAddModel(event))
    return {
      statusCode: 200,
      body: {},
    }
  }

  const updateAddHandleHandler = async () => {
    await client.query(itemGroupsQueries.updateAddHandle(event))
    return {
      statusCode: 200,
      body: {},
    }
  }

  const updateRemoveModelHandler = async () => {
    await client.query(itemGroupsQueries.updateRemoveModel(event))
    return {
      statusCode: 200,
      body: {},
    }
  }

  const updateRemoveHandleHandler = async () => {
    await client.query(itemGroupsQueries.updateRemoveHandle(event))
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
        if (event.model) {
          return await updateAddModelHandler()
        } else {
          return await updateAddHandleHandler()
        }
      } else if (event.remove) {
        if (event.model) {
          return await updateRemoveModelHandler()
        } else {
          return await updateRemoveHandleHandler()
        }
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
