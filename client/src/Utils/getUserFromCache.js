import Cookies from "universal-cookie";

const getUserFromCache = () => {
    const username = new Cookies().get("username");
    return username;
};

export default getUserFromCache;
