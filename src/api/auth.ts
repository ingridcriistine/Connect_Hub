
// This file will contain authentication-related API functions using Prisma
// Example implementation, will need to be connected to actual Prisma client

import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Register a new user
export async function register(userData: {
  name: string;
  email: string;
  password: string;
  username: string;
}) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: userData.email },
          { username: userData.username }
        ]
      }
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    const hashedPassword = await hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        username: userData.username,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Login a user
export async function login(credentials: { email: string; password: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create JWT token (in a real app, use a secure environment variable for the secret)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Get user profile
export async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        avatar: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            followedBy: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
}
