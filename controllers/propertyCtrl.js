module.exports = {
  getProperties: async (req, res) => {
    try {
      const db = req.app.get('db')
      const { account_id } = req.session.user
      const { rentFilter } = req.query

      if (req.query.rentFilter) {
        let properties = await db.get_filtered_properties({ account_id, rentFilter })
        res.status(200).send(properties)
      } else {
        let properties = await db.get_all_properties({ account_id })
        res.status(200).send(properties)
      }

    } catch (err) {
      res.sendStatus(500)
      console.error('getProperties function failed in propertyCtrl.js:', err)
    }
  },

  deleteProperty: async (req, res) => {
    try {
      const db = req.app.get('db')
      const { id } = req.params
      const { account_id } = req.session.user

      await db.delete_property({ id })
      const properties = await db.get_all_properties({ account_id })

      res.status(200).send(properties)
    } catch (err) {
      res.sendStatus(500)
      console.error('deleteProperty function failed in propertyCtrl.js:', err)
    }
  }
}