const createController = async (req, res) => {
  console.log("hello");
  console.log(req.file);

  console.log(req.body);
};

module.exports = {
  createController,
};
