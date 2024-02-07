import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import PostCard from '../components/molecules/PostCard';
import { Link } from 'react-router-dom';
import { fetchPost } from './MockApi';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Dashboard = () => {

  // const posts = useSelector(allPosts);

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPost().then((data) => {
      // masukan data dari API ke sini
      setSearchResults(data);
      setAllPost(data);
    });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    setNotFound(false);

    // ini untuk filter postingan berdasarkan judul
    const filteredResults = allPost.filter((item) => item.judul.toLowerCase().includes(searchValue.toLowerCase()));
    setSearchResults(filteredResults);

    // ini kalo hasil pencariannya ngga ada yang cocok maka data not found
    if (filteredResults.length === 0) {
      setNotFound(true);
    }

    setLoading(false);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className="">
        <div className="sticky-top">
          <Navbar />
        </div>
        <div className="container">
          <div className="content-dashboard">
            <div className="row flex justify-content-between">
              <div className="col-md-3 mb-3 sidebar-desktop">
                <SideBar />
              </div>
              <div className="col-md-9 post-desktop">
                {/* {posts ? (
                  posts.map((post) => (
                    <div key={post.id}>
                      <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}>
                        <PostCard
                          avatar={post.user ? post.user.profiles : post.avatar.avatar_img}
                          nama={post.user ? post.user.name : post.avatar.avatar_name}
                          tanggal={post.createdAt}
                          judul={post.title}
                          konten={<div dangerouslySetInnerHTML={{ __html: post.description }} style={{ maxWidth: '100%', overflowX: 'hidden', wordWrap: 'break-word' }} />}
                          topik={post.topic.name}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>Loading...</div>
                )} */}

                {/* form pencarian */}
                <div>
                  <form onSubmit={handleSearch}>
                    <InputGroup className="mb-4">
                      <Form.Control placeholder="cari postingan" aria-label="search" aria-describedby="basic-addon2" onChange={handleChange} />
                      <button type="submit" className="btn">
                        <span class="material-symbols-outlined py-1">search</span>
                      </button>
                    </InputGroup>
                  </form>
                </div>

                {/* hasil pencarian dan semua postingan */}
                {loading ? (
                  <p>Loading..</p>
                ) : (
                  <>
                    {notFound ? (
                      <p>Data tidak ditemukan</p>
                    ) : (
                      // ini termasuk semua postingan dan hasil pencarian
                      searchResults.map((post) => (
                        <div key={post.id}>
                          <PostCard nama={post.nama} tanggal={post.tanggal} judul={post.judul} konten={post.konten} topik={post.topik} />
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
