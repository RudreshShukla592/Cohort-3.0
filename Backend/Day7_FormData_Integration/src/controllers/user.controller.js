const createController = (req, res) => {
  console.log("hello");
  console.log(req.body);
};

module.exports = {
  createController,
};
