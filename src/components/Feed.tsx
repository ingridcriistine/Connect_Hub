
import React, { useState } from "react";
import { Heart, MessageCircle, Share, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
  liked: boolean;
}

const dummyPosts: Post[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      username: "@johndoe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Just started using Connect Hub! The design is amazing!",
    likes: 15,
    comments: 3,
    createdAt: "2h ago",
    liked: false,
  },
  {
    id: 2,
    user: {
      name: "Maria Silva",
      username: "@mariasilva",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    content: "Hello everyone! Sharing this special moment ✨",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvY2lhbCUyMG5ldHdvcmt8ZW58MHx8MHx8fDA%3D",
    likes: 42,
    comments: 7,
    createdAt: "5h ago",
    liked: true,
  },
  {
    id: 3,
    user: {
      name: "Lucas Mendes",
      username: "@lucasmendes",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    content: "Loving this new interface. Much more intuitive than other networks!",
    likes: 8,
    comments: 1,
    createdAt: "1d ago",
    liked: false,
  },
];

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          };
        }
        return post;
      })
    );
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Your post cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    
    const newPost: Post = {
      id: Date.now(),
      user: {
        name: "You",
        username: "@you",
        avatar: "https://randomuser.me/api/portraits/lego/5.jpg",
      },
      content: newPostContent,
      likes: 0,
      comments: 0,
      createdAt: "Just now",
      liked: false,
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    
    toast({
      title: "Success",
      description: "Your post has been published!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 fade-in">
        <form onSubmit={handleSubmitPost}>
          <textarea
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-connectHub-primary"
            placeholder="What's on your mind?"
            rows={3}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="flex items-center gap-1 bg-connectHub-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition"
            >
              <Send size={18} />
              <span>Post</span>
            </button>
          </div>
        </form>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-4 mb-4 fade-in">
          <div className="flex items-center mb-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">{post.user.name}</h3>
              <p className="text-gray-500 text-xs">{post.user.username} • {post.createdAt}</p>
            </div>
          </div>
          
          <p className="mb-3">{post.content}</p>
          
          {post.image && (
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-auto rounded-lg mb-3"
            />
          )}
          
          <div className="flex items-center justify-between text-gray-500 border-t pt-3">
            <button
              onClick={() => handleLike(post.id)}
              className={`flex items-center gap-1 ${
                post.liked ? "text-red-500" : ""
              }`}
            >
              <Heart size={18} fill={post.liked ? "currentColor" : "none"} /> {post.likes}
            </button>
            
            <button className="flex items-center gap-1">
              <MessageCircle size={18} /> {post.comments}
            </button>
            
            <button className="flex items-center gap-1">
              <Share size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
