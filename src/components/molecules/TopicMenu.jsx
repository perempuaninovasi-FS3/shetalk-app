import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { allTopics } from "../../redux/slice/topicSlice";
import Topics from "../atoms/Topics";

function TopicMenu({ setTopicSelected }) {
  const navigate = useNavigate();
  const topics = useSelector(allTopics);
  const location = useLocation();

  const topicColors = [
    "#FF6565",
    "#FC65FF",
    "#6865FF",
    "#FCFF65",
    "#68FF65",
    "#65C8FF",
    "#FFC165",
    "#7597D6",
  ];
  const getTopicColor = (index) => {
    return topicColors[index % topicColors.length];
  };

  const handleTopicClick = (topicId) => {
    navigate(`/dashboard?topic=${topicId}`);
    setTopicSelected(true);
  };

  const isActive = (topicId) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("topic") === topicId;
    // const currentTopicId = urlParams.get('topic');
    // return currentTopicId === topicId.toString();
  };

  return (
    <>
      <h4 className="mb-4" style={{ color: "rgb(70, 70, 70)" }}>
        Topik
      </h4>
      {topics
        .filter((topic) => topic.id !== "1")
        .map((topic, index) => (
          <div
            key={topic.id}
            onClick={() => handleTopicClick(topic.id)}
            className={isActive(topic.id) ? "active-menu" : ""}
          >
            <Topics fillColor={getTopicColor(index)} title={topic.name} />
          </div>
        ))}
    </>
  );
}

export default TopicMenu;
