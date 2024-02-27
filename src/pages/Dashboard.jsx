import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allPosts, fetchPosts } from "../redux/slice/postSlice";
import Navbar from "../components/molecules/Navbar";
import SideBar from "../components/molecules/Sidebar";
import PostCard from "../components/molecules/PostCard";
import { Link, useLocation } from "react-router-dom";
import formatDate from "../utils/dateUtils";

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const dispatch = useDispatch();
  const posts = useSelector(allPosts);
  const location = useLocation();

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const totalPages = useSelector((state) => state.posts.totalPages);

  useEffect(() => {
    if (currentPage) {
      dispatch(fetchPosts(currentPage));
    }
  }, [dispatch, currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    dispatch(fetchPosts(page));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const topicParam = urlParams.get("topic");
    const filterParam = urlParams.get("filter");

    if (topicParam) {
      setFilteredPosts(posts.filter((post) => post.topic.id === topicParam));
      setSelectedTopic(topicParam);
      // setFilteredPosts(posts.filter(post => post.topic.id === parseInt(topicParam)));
      // setSelectedTopic(parseInt(topicParam));
    } else if (filterParam === "jawab-pertanyaan") {
      setFilteredPosts(posts.filter((post) => !post.description));
    } else if (filterParam === "informasi") {
      setFilteredPosts(posts.filter((post) => post.description));
    } else {
      setFilteredPosts(posts);
      setSelectedTopic(null);
    }
  }, [location.search, posts]);

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
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div key={post.id}>
                      <Link
                        to={`/post/${post.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <PostCard
                          avatar={
                            post.user && post.user.profile
                              ? `${API_URL}/image/profiles/${post.user.profile}`
                              : post.user
                              ? `${API_URL}/image/no-profile.png`
                              : `${API_URL}${post.avatar.avatar_url}`
                          }
                          nama={
                            post.user ? post.user.name : post.avatar.avatar_name
                          }
                          tanggal={formatDate(post.createdAt)}
                          judul={post.title}
                          konten={
                            <div
                              dangerouslySetInnerHTML={{
                                __html: post.description,
                              }}
                              style={{
                                maxWidth: "100%",
                                overflowX: "hidden",
                                wordWrap: "break-word",
                              }}
                            />
                          }
                          topik={post.topic.name}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>
                    Belum ada postingan terkait, atau silahkan pergi ke halaman
                    lain
                  </div>
                )}
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end">
                    <li
                      className={`page-item ${currentPage === 1 && "disabled"}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handleChangePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                          backgroundColor: currentPage === 1 ? "" : "#43D7C2",
                          color: "#fff",
                          cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        }}
                      >
                        Kembali
                      </button>
                    </li>
                    {[...Array(totalPages).keys()].map((page) => (
                      <li
                        key={page + 1}
                        className={`page-item ${
                          currentPage === page + 1 && "active"
                        }`}
                      >
                        <button
                          className={`page-link ${
                            currentPage === page + 1 && "active"
                          }`}
                          onClick={() => handleChangePage(page + 1)}
                          style={{
                            backgroundColor:
                              currentPage === page + 1
                                ? "#89eedf"
                                : "transparent",
                            color: currentPage === page + 1 ? "#fff" : "#000",
                            border: "none",
                          }}
                        >
                          {page + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages && "disabled"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handleChangePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                          backgroundColor:
                            currentPage === totalPages ? "" : "#43D7C2",
                          color: "#fff",
                          cursor:
                            currentPage === totalPages
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        Lanjut
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
