export const getUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
    }
    return user;
}

export const getAvatar = () => {
    let avatar = sessionStorage.getItem('selectedAvatar');
    if (avatar) {
        avatar = JSON.parse(avatar);
    } else {
        console.log('Belum memilih avatar')
    }
    return avatar;
}