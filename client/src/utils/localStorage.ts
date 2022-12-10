const isUserAuthenticatedKey = "user";

export const addIsUserAuthenticatedToLocalStorage = () => {
  try {
    localStorage.setItem(isUserAuthenticatedKey, JSON.stringify(true));
  } catch (error) {
    console.error("Error adding user: " + error);
    return error;
  }
};

export const removeIsUserAuthenticatedFromLocalStorage = () => {
  localStorage.removeItem(isUserAuthenticatedKey);
};

export const getIsUserAuthenticatedFromLocalStorage = (): boolean => {
  try {
    const result = localStorage.getItem(isUserAuthenticatedKey);

    if (result) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error getting user: " + error);
    return false;
  }
};
