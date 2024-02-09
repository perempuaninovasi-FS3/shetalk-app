import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { allTopics } from "../../redux/slice/topicSlice";
import Topics from "../atoms/Topics";

function TopicMenu() {
    const navigate = useNavigate();
    const topics = useSelector(allTopics);
    const location = useLocation();

    const topicColors = ["#FF6565", "#FC65FF", "#6865FF", "#FCFF65", "#68FF65", "#65C8FF", "#FFC165", "#7597D6"];
    const getTopicColor = (index) => {
        return topicColors[index % topicColors.length];
    };

    const handleTopicClick = (topicId) => {
        navigate(`/dashboard?topic=${topicId}`);
    };

    const isActive = (topicId) => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get('topic') === topicId;
    };

    return (
        <>
            <h4 className="mb-4" style={{ color: 'rgb(70, 70, 70)' }}>Topics</h4>
            {topics.map((topic, index) => (
                <div key={topic.id} onClick={() => handleTopicClick(topic.id)} className={isActive(topic.id) ? 'active-menu' : ''}>
                    <Topics fillColor={getTopicColor(index)} title={topic.name} />
                </div>
            ))}
        </>
    )
}

export default TopicMenu;
