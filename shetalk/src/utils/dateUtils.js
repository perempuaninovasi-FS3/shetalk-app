const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const diffInMinutes = Math.floor(diff / (1000 * 60));

    if (diffInMinutes < 60) {
        return `${diffInMinutes} menit yang lalu`;
    } else if (diffInMinutes < 1440) { // 1440 menit = 1 hari
        const diffInHours = Math.floor(diffInMinutes / 60);
        return `${diffInHours} jam yang lalu`;
    } else {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Bulan dimulai dari 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
};

export default formatDate;
