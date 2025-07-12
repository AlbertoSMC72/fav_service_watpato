// src/services/likesService.ts
import { LikesRepository } from '../repos/likesRepository';
import {
    LikeBookType,
    LikeChapterType,
    LikeOperationResponse,
    LikeStatusResponse,
    UserLikesResponse,
    BookLikeResponse,
    ChapterLikeResponse
} from '../models/likesModels';

export class LikesService {

    // ===== SERVICIOS DE LIKES DE LIBROS =====

    /**
     * Toggle like de libro (dar like si no lo tiene, quitar like si ya lo tiene)
     */
    static async toggleBookLike(likeData: LikeBookType): Promise<LikeOperationResponse> {
        try {
            // Verificar que el usuario existe
            const userExists = await LikesRepository.userExists(likeData.userId);
            if (!userExists) {
                throw new Error('El usuario especificado no existe');
            }

            // Verificar que el libro existe
            const bookExists = await LikesRepository.bookExists(likeData.bookId);
            if (!bookExists) {
                throw new Error('El libro especificado no existe');
            }

            // Verificar si ya tiene like
            const isLiked = await LikesRepository.isBookLikedByUser(likeData.userId, likeData.bookId);

            let newLikeStatus: boolean;
            let message: string;

            if (isLiked) {
                // Quitar like
                await LikesRepository.unlikeBook(likeData.userId, likeData.bookId);
                newLikeStatus = false;
                message = 'Like removido del libro exitosamente';
            } else {
                // Dar like
                await LikesRepository.likeBook(likeData.userId, likeData.bookId);
                newLikeStatus = true;
                message = 'Like agregado al libro exitosamente';
            }

            // Obtener nuevo conteo
            const likesCount = await LikesRepository.getBookLikesCount(likeData.bookId);

            return {
                success: true,
                message,
                isLiked: newLikeStatus,
                likesCount
            };

        } catch (error) {
            console.error('Error en LikesService.toggleBookLike:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al procesar like del libro');
        }
    }

    /**
     * Obtener estado de like de un libro
     */
    static async getBookLikeStatus(userId: number, bookId: number): Promise<LikeStatusResponse> {
        try {
            return await LikesRepository.getBookLikeStatus(userId, bookId);
        } catch (error) {
            console.error('Error en LikesService.getBookLikeStatus:', error);
            throw new Error('Error al obtener estado de like del libro');
        }
    }

    // ===== SERVICIOS DE LIKES DE CAPÍTULOS =====

    /**
     * Toggle like de capítulo (dar like si no lo tiene, quitar like si ya lo tiene)
     */
    static async toggleChapterLike(likeData: LikeChapterType): Promise<LikeOperationResponse> {
        try {
            // Verificar que el usuario existe
            const userExists = await LikesRepository.userExists(likeData.userId);
            if (!userExists) {
                throw new Error('El usuario especificado no existe');
            }

            // Verificar que el capítulo existe
            const chapterExists = await LikesRepository.chapterExists(likeData.chapterId);
            if (!chapterExists) {
                throw new Error('El capítulo especificado no existe');
            }

            // Verificar si ya tiene like
            const isLiked = await LikesRepository.isChapterLikedByUser(likeData.userId, likeData.chapterId);

            let newLikeStatus: boolean;
            let message: string;

            if (isLiked) {
                // Quitar like
                await LikesRepository.unlikeChapter(likeData.userId, likeData.chapterId);
                newLikeStatus = false;
                message = 'Like removido del capítulo exitosamente';
            } else {
                // Dar like
                await LikesRepository.likeChapter(likeData.userId, likeData.chapterId);
                newLikeStatus = true;
                message = 'Like agregado al capítulo exitosamente';
            }

            // Obtener nuevo conteo
            const likesCount = await LikesRepository.getChapterLikesCount(likeData.chapterId);

            return {
                success: true,
                message,
                isLiked: newLikeStatus,
                likesCount
            };

        } catch (error) {
            console.error('Error en LikesService.toggleChapterLike:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al procesar like del capítulo');
        }
    }

    /**
     * Obtener estado de like de un capítulo
     */
    static async getChapterLikeStatus(userId: number, chapterId: number): Promise<LikeStatusResponse> {
        try {
            return await LikesRepository.getChapterLikeStatus(userId, chapterId);
        } catch (error) {
            console.error('Error en LikesService.getChapterLikeStatus:', error);
            throw new Error('Error al obtener estado de like del capítulo');
        }
    }

    // ===== SERVICIOS DE LIKES DEL USUARIO =====

    /**
     * Obtener todos los likes del usuario
     */
    static async getUserLikes(userId: number): Promise<UserLikesResponse> {
        try {
            // Verificar que el usuario existe
            const userExists = await LikesRepository.userExists(userId);
            if (!userExists) {
                throw new Error('El usuario especificado no existe');
            }

            return await LikesRepository.getUserLikes(userId);
        } catch (error) {
            console.error('Error en LikesService.getUserLikes:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener likes del usuario');
        }
    }

    /**
     * Obtener solo libros likeados por el usuario
     */
    static async getUserLikedBooks(userId: number): Promise<BookLikeResponse[]> {
        try {
            const userLikes = await this.getUserLikes(userId);
            return userLikes.likedBooks;
        } catch (error) {
            console.error('Error en LikesService.getUserLikedBooks:', error);
            throw new Error('Error al obtener libros likeados del usuario');
        }
    }

    /**
     * Obtener solo capítulos likeados por el usuario
     */
    static async getUserLikedChapters(userId: number): Promise<ChapterLikeResponse[]> {
        try {
            const userLikes = await this.getUserLikes(userId);
            return userLikes.likedChapters;
        } catch (error) {
            console.error('Error en LikesService.getUserLikedChapters:', error);
            throw new Error('Error al obtener capítulos likeados del usuario');
        }
    }

    // ===== SERVICIOS DE ESTADÍSTICAS =====

    /**
     * Obtener conteo de likes de múltiples libros (útil para listas)
     */
    static async getMultipleBookLikesCount(bookIds: number[]): Promise<{ [bookId: number]: number }> {
        try {
            const likesCount: { [bookId: number]: number } = {};

            const promises = bookIds.map(async (bookId) => {
                const count = await LikesRepository.getBookLikesCount(bookId);
                likesCount[bookId] = count;
            });

            await Promise.all(promises);
            return likesCount;
        } catch (error) {
            console.error('Error en LikesService.getMultipleBookLikesCount:', error);
            throw new Error('Error al obtener conteos de likes de libros');
        }
    }

    /**
     * Obtener conteo de likes de múltiples capítulos (útil para listas)
     */
    static async getMultipleChapterLikesCount(chapterIds: number[]): Promise<{ [chapterId: number]: number }> {
        try {
            const likesCount: { [chapterId: number]: number } = {};

            const promises = chapterIds.map(async (chapterId) => {
                const count = await LikesRepository.getChapterLikesCount(chapterId);
                likesCount[chapterId] = count;
            });

            await Promise.all(promises);
            return likesCount;
        } catch (error) {
            console.error('Error en LikesService.getMultipleChapterLikesCount:', error);
            throw new Error('Error al obtener conteos de likes de capítulos');
        }
    }

    /**
     * Verificar estado de like de múltiples libros para un usuario
     */
    static async getMultipleBookLikeStatus(userId: number, bookIds: number[]): Promise<{ [bookId: number]: LikeStatusResponse }> {
        try {
            const likeStatuses: { [bookId: number]: LikeStatusResponse } = {};

            const promises = bookIds.map(async (bookId) => {
                const status = await LikesRepository.getBookLikeStatus(userId, bookId);
                likeStatuses[bookId] = status;
            });

            await Promise.all(promises);
            return likeStatuses;
        } catch (error) {
            console.error('Error en LikesService.getMultipleBookLikeStatus:', error);
            throw new Error('Error al obtener estado de likes de libros');
        }
    }

    /**
     * Verificar estado de like de múltiples capítulos para un usuario
     */
    static async getMultipleChapterLikeStatus(userId: number, chapterIds: number[]): Promise<{ [chapterId: number]: LikeStatusResponse }> {
        try {
            const likeStatuses: { [chapterId: number]: LikeStatusResponse } = {};

            const promises = chapterIds.map(async (chapterId) => {
                const status = await LikesRepository.getChapterLikeStatus(userId, chapterId);
                likeStatuses[chapterId] = status;
            });

            await Promise.all(promises);
            return likeStatuses;
        } catch (error) {
            console.error('Error en LikesService.getMultipleChapterLikeStatus:', error);
            throw new Error('Error al obtener estado de likes de capítulos');
        }
    }
}