// initial data to populate the mock database if it's empty

export const initialPosts = [
    {
        _id: "post_1",
        title: "Exploring the Atlas Mountains",
        content: "The High Atlas is a mountain range in central Morocco, North Africa, the highest part of the Atlas Mountains. It's a wonderful place for hiking, seeing traditional Berber villages, and enjoying breathtaking views.",
        tags: ["travel", "morocco", "hiking", "adventure"],
        status: "published",
        author: {
            _id: "user_1",
            username: "AtlasExplorer"
        },
        likes: [],
        comments: [
            {
                _id: "comment_1",
                content: "I've always wanted to go there! Was it cold at night?",
                author: {
                    _id: "user_2",
                    username: "SaraTravels"
                },
                createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
            }
        ],
        createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    },
    {
        _id: "post_2",
        title: "Must try Moroccan Street Foods",
        content: "When you visit Morocco, you have to try the street food. From spicy Merguez sausages to sweet Sfenj donuts, your taste buds will thank you. Don't forget the mint tea!",
        tags: ["food", "morocco", "culture"],
        status: "published",
        author: {
            _id: "user_2",
            username: "SaraTravels"
        },
        likes: ["user_1"],
        comments: [],
        createdAt: new Date(Date.now() - 345600000).toISOString() // 4 days ago
    }
];
