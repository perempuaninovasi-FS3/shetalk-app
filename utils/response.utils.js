const jsonResponse = async (res, params) => {
  const { success, status = 200, message, data = null, otherAttr } = params;
  const structure = {
    message: message,
  };
  if (data !== null) {
    structure.data = data;
  }
  if (otherAttr) {
    Object.assign(structure, otherAttr);
  }
  return await res.status(status).json(structure);
};
module.exports = jsonResponse;
