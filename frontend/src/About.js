import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function About() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8091/api/article/${id}`)
            .then((response) => response.json())
            .then((data) => setArticle(data))
            .catch((error) => console.error("Error fetching article:", error));
    }, [id]);

    if (!article) return <p>Loading...</p>;
    if (article.error) return <p>{article.error}</p>;

    return (
        <div>
            <h1>Article {article.id}</h1>
            <img src={article.img_url} alt={`Article ${article.id}`} width="400px" />
        </div>
    );
}

export default About;
