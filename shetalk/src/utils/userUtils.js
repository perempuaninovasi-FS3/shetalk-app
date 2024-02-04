export const getUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
    } else {
        console.log('anda belum login')
    }
    return user;
}