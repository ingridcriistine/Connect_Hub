
// This file will contain message-related API functions using Prisma
// Example implementation, will need to be connected to actual Prisma client

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all conversations for a user
export async function getUserConversations(userId: string) {
  try {
    // Get all users this user has exchanged messages with
    const sentMessages = await prisma.message.findMany({
      where: { senderId: userId },
      select: { receiverId: true },
      distinct: ['receiverId'],
    });

    const receivedMessages = await prisma.message.findMany({
      where: { receiverId: userId },
      select: { senderId: true },
      distinct: ['senderId'],
    });

    // Combine unique user IDs
    const conversationUserIds = [
      ...new Set([
        ...sentMessages.map(m => m.receiverId),
        ...receivedMessages.map(m => m.senderId)
      ])
    ];

    // Get user details and last message for each conversation
    const conversations = await Promise.all(
      conversationUserIds.map(async (otherUserId) => {
        // Get the other user's details
        const otherUser = await prisma.user.findUnique({
          where: { id: otherUserId },
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        });

        // Get the last message between these users
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { senderId: userId, receiverId: otherUserId },
              { senderId: otherUserId, receiverId: userId },
            ],
          },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            content: true,
            createdAt: true,
            isRead: true,
            senderId: true,
          },
        });

        // Count unread messages from the other user
        const unreadCount = await prisma.message.count({
          where: {
            senderId: otherUserId,
            receiverId: userId,
            isRead: false,
          },
        });

        return {
          user: otherUser,
          lastMessage,
          unreadCount,
        };
      })
    );

    // Sort by most recent message
    return conversations.sort((a, b) => {
      return new Date(b.lastMessage?.createdAt || 0).getTime() -
        new Date(a.lastMessage?.createdAt || 0).getTime();
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    throw error;
  }
}

// Get messages between two users
export async function getConversationMessages(userId: string, otherUserId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: userId,
        isRead: false,
      },
      data: { isRead: true },
    });

    return messages;
  } catch (error) {
    console.error('Get messages error:', error);
    throw error;
  }
}

// Send a message
export async function sendMessage(data: {
  content: string;
  senderId: string;
  receiverId: string;
}) {
  try {
    const message = await prisma.message.create({
      data: {
        content: data.content,
        senderId: data.senderId,
        receiverId: data.receiverId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return message;
  } catch (error) {
    console.error('Send message error:', error);
    throw error;
  }
}
