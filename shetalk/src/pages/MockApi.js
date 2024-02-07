

const data = [
  {
    Id: 1,

    nama: 'anonim',
    tanggal: '20/02/2024',
    judul: 'cara memperlancar haid gimana?',
    topik: 'menstruasi',
  },
  {
    Id: 2,

    nama: 'anonim',
    tanggal: '20/02/2024',
    judul: 'Berapa lama menstruasi yang normal?',
    topik: 'menstruasi',
  },
  {
    Id: 3,

    nama: 'anonim',
    tanggal: '20/02/2024',
    judul: 'tips untuk memperlancar menstruasi',
    topik: 'menstruasi',
  },
];

export const fetchPost = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
