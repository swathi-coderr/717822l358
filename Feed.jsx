import { useEffect, useState } from "react";
import { fetchUsers, fetchUserPosts } from "../services/api";

const Feed = () => {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        const getFeed = async () => {
            const usersData = await fetchUsers();
            let allPosts = [];
            
            for (let userId in usersData.users) {
                const postsData = await fetchUserPosts(userId);
                allPosts.push(...postsData.posts);
            }
            allPosts.sort((a, b) => b.id - a.id);
            setFeed(allPosts);
        };
        getFeed();
    }, []);

    return (
        <div>
            <h2>Live Feed</h2>
            <ul>
                {feed.map((post, index) => (
                    <li key={index}>{post.content}</li>
                ))}
            </ul>
        </div>
    );
};
export default Feed;