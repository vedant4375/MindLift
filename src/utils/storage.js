export const getUserData = () => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  };
  
  export const saveUserData = (data) => {
    localStorage.setItem(
      "userData",
      JSON.stringify(data)
    );
  };
  
  export const initializeUserData = (defaultUser) => {
    const existing = localStorage.getItem("userData");
  
    if (!existing) {
      localStorage.setItem(
        "userData",
        JSON.stringify(defaultUser)
      );
    }
  };