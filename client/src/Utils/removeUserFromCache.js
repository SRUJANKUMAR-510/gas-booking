import Cookies from "universal-cookie";

const removeUserFromCache = () => {
    const token = new Cookies();
    token.remove('username')
};

export default removeUserFromCache;
