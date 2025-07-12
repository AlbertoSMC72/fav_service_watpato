// src/models/likesModels.ts
import { z } from 'zod';

// ===== ESQUEMAS DE VALIDACIÓN =====

// Esquema para dar like a un libro
export const likeBookSchema = z.object({
    userId: z.number().int().positive('El ID del usuario debe ser un número positivo'),
    bookId: z.number().int().positive('El ID del libro debe ser un número positivo')
});

// Esquema para dar like a un capítulo
export const likeChapterSchema = z.object({
    userId: z.number().int().positive('El ID del usuario debe ser un número positivo'),
    chapterId: z.number().int().positive('El ID del capítulo debe ser un número positivo')
});

// ===== TIPOS =====

export type LikeBookType = z.infer<typeof likeBookSchema>;
export type LikeChapterType = z.infer<typeof likeChapterSchema>;

// ===== INTERFACES DE RESPUESTA =====

export interface BookLikeResponse {
    id: string;
    userId: string;
    bookId: string;
    createdAt: string;
    book: {
        id: string;
        title: string;
        coverImage?: string;
        author: {
            username: string;
            profilePicture?: string;
        };
    };
}

export interface ChapterLikeResponse {
    id: string;
    userId: string;
    chapterId: string;
    createdAt: string;
    chapter: {
        id: string;
        title: string;
        book: {
            id: string;
            title: string;
            coverImage?: string;
            author: {
                username: string;
                profilePicture?: string;
            };
        };
    };
}

export interface LikeStatusResponse {
    isLiked: boolean;
    likesCount: number;
}

export interface UserLikesResponse {
    likedBooks: BookLikeResponse[];
    likedChapters: ChapterLikeResponse[];
    totalLikes: number;
}

// ===== RESPUESTAS DE OPERACIONES =====

export interface LikeOperationResponse {
    success: boolean;
    message: string;
    isLiked: boolean;
    likesCount: number;
}