const baseUrl = process.env.REACT_APP_BASE_URL;
const baseApiUrl = "/api"; //base url is added in axios.ts

const baseSpaceTechUrl = `${baseApiUrl}/space-tech`;
const getAllSpaceTechFromPublicApiUrl = `${baseSpaceTechUrl}/nasa-api`;
const addSpaceTechUrl = `${baseSpaceTechUrl}/saved-list`;
const getAllSpaceTechFromSavedListUrl = `${baseSpaceTechUrl}/saved-list`;
const deleteSpaceTechUrl = `${baseSpaceTechUrl}/saved-list`; // needs :id

const baseUserUrl = `${baseApiUrl}/user`;
const registerUserUrl = `${baseUserUrl}/register`;
const loginUserUrl = `${baseUserUrl}/login`;
const authUserUrl = `${baseUserUrl}/user`;

export {
  baseUrl,
  getAllSpaceTechFromPublicApiUrl,
  getAllSpaceTechFromSavedListUrl,
  addSpaceTechUrl,
  deleteSpaceTechUrl,
  registerUserUrl,
  loginUserUrl,
  authUserUrl,
};
