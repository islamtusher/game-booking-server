const getAccessToken = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        return token;
    } else {
        return false
    }
}

export default getAccessToken