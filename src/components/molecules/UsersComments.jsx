const UsersComments = ({ avatar, nama, tanggal, judul, konten, topik, profile, username, tglComment, isiComment }) => {

    return (
        <>
            {/* tampilan postingan */}
            <div className="p-4  mx-auto   rounded-3 mb-3" id="listKonten" style={{ cursor: 'pointer' }}>
                <div style={{ padding: '1rem 0 1rem 0' }}>
                    <div style={{ marginLeft: '24px', padding: '0.5rem 0.5rem 0 3rem', borderLeft: '2px solid #ccc', marginBottom: '1rem' }}>
                        {/* judul dan isi content */}
                        <div className="d-flex align-items-center gap-3 mb-3" >
                            <div>
                                <p className="mb-0 text-muted " style={{ fontSize: '13px' }}>
                                    {tanggal}
                                </p>
                            </div>
                        </div>
                        <h5 className="custom-text judul-post fw-bold">{judul}</h5>
                        <div className="text-content">{konten}</div>
                        <p className="custom-btn fw-bold d-inline-flex text-decoration-none text-white active align-items-center px-2  rounded-2" style={{ fontSize: '14px' }}>
                            {topik}
                        </p>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-3" >
                        {/* Image */}
                        <img src={profile} alt="Profile" className="rounded-circle " style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                        <div>
                            {/* nama, tanggal */}
                            <h5 className="mb-0 fw-bold fs-md-3 fs-6 custom-text ">{username}</h5>
                            <p className="mb-0 text-muted " style={{ fontSize: '13px' }}>
                                {tglComment}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="text-content">{isiComment}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersComments;
