import { useSelector } from "react-redux";
import { allTopics } from "../../redux/slice/topicSlice";
import Topics from "../atoms/Topics";

function TopicMenu() {

    const topics = useSelector(allTopics);

    const topicColors = ["#FF6565", "#FC65FF", "#6865FF", "#FCFF65", "#68FF65", "#65C8FF", "#FFC165", "#7597D6"];
    const getTopicColor = (index) => {
        return topicColors[index % topicColors.length];
    };

    return (
        <>
            <h4 className="mb-4" style={{ color: 'rgb(70, 70, 70)' }}>Topics</h4>
            {topics
                .filter((topic) => topic.id !== '1')
                .map((topic, index) => (
                    <Topics key={topic.slug} fillColor={getTopicColor(index)} title={topic.name} />
                ))}
        </>
    )
}

export default TopicMenu;