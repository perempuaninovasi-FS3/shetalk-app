const jsonResponse = async (res, params) => {
  const { success, status = 200, message, data = null, otherAttr } = params;
  const structure = {
    success: success,
    message: message,
  };
  if (data != null) {
    structure.data = data;
  }
  if (otherAttr) {
    Object.assign(structure, otherAttr);
  }
  return await res.status(status).json(structure);
};
const exported_modules = { jsonResponse };
module.exports = exported_modules;
