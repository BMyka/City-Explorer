import React, { useState, useEffect } from "react";

const CommentList = ({ locationId, authToken }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `https://floating-stream-61966-0ac3a23f6432.herokuapp.com/api/comments/${locationId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        `${data.message || "Network response was not ok"}`
                    );
                }

                setComments(data.comments);
            } catch (error) {
                setError(`Failed to load comments: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [locationId, authToken]);

    if (loading) return <div>Loading comments...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="comments-container">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <h3>{comment.user}</h3>
                        <p>{comment.comment}</p>
                    </div>
                ))
            ) : (
                <p>No comments found.</p>
            )}
        </div>
    );
};

export default CommentList;
