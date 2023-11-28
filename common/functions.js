function returnResult(state, message, data) {
  let returnR = {
    state: state,
    message: message,
  };
  if (state) {
    returnR.data = data;
  }
  return returnR;
}

function handleErrorResponse(res, error) {
  res.status(500).json({ message: error.message });
}

module.exports = handleErrorResponse;
module.exports = returnResult;
