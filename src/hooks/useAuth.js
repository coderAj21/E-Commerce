export const USER_STORAGE_KEY = "user_details";
export const TOKEN_COOKIE_KEY = "user_token";
const TOKEN_EXPIRATION_DAYS = 3;

const resetAuth = () => {
  try {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    document.cookie = `${TOKEN_COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.href = "/";
  } catch (err) {
    console.error(err);
  }
};

const updateAuth = (user,token) => {
  try {
    // Save user in local storage
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

    // Save token in a cookie with expiration time
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + TOKEN_EXPIRATION_DAYS);
    const expires = `expires=${expirationDate.toUTCString()}`;
    window.document.cookie = `${TOKEN_COOKIE_KEY}=${token}; ${expires}; path=/;`;
  } catch (err) {
    console.error(err);
  }
};

const getAuth = () => {
  try {
    const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);
    const tokenCookie = window.document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith(`${TOKEN_COOKIE_KEY}=`));

    if (storedUser && tokenCookie) {
      const user = JSON.parse(storedUser);
      const token = tokenCookie.split("=")[1];
      return { user, token };
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const isUserLogin=()=>{
  try{
    const user = JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY));
    const tokenCookie = window.document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith(`${TOKEN_COOKIE_KEY}=`))
      .split("=")[1];

    if("email" in user && "user_id" in user && tokenCookie){
      return true;
    }
    return false;
  }catch(error){
    console.error(error);
    return null;
  }
}


export const authHook = () => {
  const authData=getAuth();
  return {
    user: authData?.user,
    isAuthenticated: !!authData?.token,
    token: authData?.token,
    setUserToken: updateAuth,
    signOut: async () => resetAuth(),
    isUserLogin,
  };
};

export { authHook as useAuth };
