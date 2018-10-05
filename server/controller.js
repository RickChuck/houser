const read = (req, res, next) => {
    const db = req.app.get("db");
    db.get_all_houses()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => res.status(500).send(err));
  };
  
  const create = (req, res, next) => {
    console.log(req.body);
    let { name, address, city, state, zip, img, mortgage, rent } = req.body;
    const db = req.app.get("db");
    db.Create_House([name, address, city, state, zip, img, mortgage, rent])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => res.status(500).send(err));
  };
  
  const deleteID = (req, res, next) => {
    let { id } = req.params;
    //   console.log(id);
    const db = req.app.get("db");
    db.delete_house(id)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => res.status(500).send(err));
  };
  
  module.exports = {
    read,
    create,
    deleteID
  };