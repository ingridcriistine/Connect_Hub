
// This file will contain post-related API functions using Prisma
// Example implementation, will need to be connected to actual Prisma client

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new post
export async function createPost(data: { content: string; image?: string; userId: string }) {
  try {
    const post = await prisma.post.create({
      data: {
        content: data.content,
        image: data.image,
        userId: data.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error('Create post error:', error);
    throw error;
  }
}

// Get feed posts
export async function getFeedPosts(userId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  try {
    // Get posts from users that the current user follows
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((follow) => follow.followingId);
    
    // Include the user's own posts in the feed
    followingIds.push(userId);

    const posts = await prisma.post.findMany({
      where: {
        userId: { in: followingIds },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        likes: {
          where: { userId },
          select: { id: true },
        },
      },
    });

    // Transform posts to include "liked" boolean
    return posts.map((post) => ({
      ...post,
      likeCount: post._count.likes,
      commentCount: post._count.comments,
      liked: post.likes.length > 0,
      likes: undefined,
      _count: undefined,
    }));
  } catch (error) {
    console.error('Get feed posts error:', error);
    throw error;
  }
}

// Like or unlike a post
export async function toggleLike(userId: string, postId: string) {
  try {
    // Check if like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return { liked: false };
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return { liked: true };
    }
  } catch (error) {
    console.error('Toggle like error:', error);
    throw error;
  }
}

// Add a comment to a post
export async function addComment(data: { content: string; userId: string; postId: string }) {
  try {
    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        userId: data.userId,
        postId: data.postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return comment;
  } catch (error) {
    console.error('Add comment error:', error);
    throw error;
  }
}

// Get comments for a post
export async function getPostComments(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return comments;
  } catch (error) {
    console.error('Get post comments error:', error);
    throw error;
  }
}
