import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Heart, MoreHorizontal } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Comment {
  id: number;
  name: string;
  text: string;
}

interface PostCardProps {
  userName: string;
  time: string;
  content: string;
  image?: string;
  comments: Comment[];
}

const PostCard = ({ userName, time, content, image, comments }: PostCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="w-full max-w-md mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{userName}</h3>
              <p className="text-xs text-gray-500">{time}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal size={18} />
          </Button>
        </div>
        
        <p className="mb-3">{content}</p>
        
        {image && (
          <div className="rounded-md overflow-hidden mb-3">
            <img src={image} alt="Post content" className="w-full h-auto" />
          </div>
        )}
        
        <div className="flex border-t border-b py-2 mt-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex-1 flex justify-center items-center gap-2"
            onClick={handleLike}
          >
            <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : ""} />
            <span>Like</span>
          </Button>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex-1">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex-1 flex justify-center items-center gap-2"
              >
                <MessageSquare size={18} />
                <span>Comment</span>
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
        
        <CollapsibleContent className="mt-3 space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback>{comment.name[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-2 rounded-lg flex-1">
                <p className="font-medium text-sm">{comment.name}</p>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
          
          <div className="flex gap-2 pt-2">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-gray-100 p-2 rounded-lg flex-1 text-sm outline-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
        </CollapsibleContent>
      </div>
    </Card>
  );
};

export default PostCard;
