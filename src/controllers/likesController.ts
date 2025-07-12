// src/controllers/likesController.ts
import { Request, Response } from 'express';
import { LikesService } from '../services/likesService';
import { likeBookSchema, likeChapterSchema } from '../models/likesModels';

export class LikesController {

    // ===== CONTROLADORES DE LIKES DE LIBROS =====

    /**
     * Toggle like de libro
     * POST /api/likes/books/toggle
     */
    static async toggleBookLike(req: Request, res: Response): Promise<void> {
        try {
            // Validar datos con Zod
            const validationResult = likeBookSchema.safeParse(req.body);

            if (!validationResult.success) {
                res.status(400).json({
                    success: false,
                    message: 'Datos inválidos',
                    errors: validationResult.error.errors
                });
                return;
            }

            const result = await LikesService.toggleBookLike(validationResult.data);

            res.status(200).json({
                success: true,
                message: result.message,
                data: {
                    isLiked: result.isLiked,
                    likesCount: result.likesCount
                }
            });

        } catch (error) {
            console.error('Error en toggleBookLike:', error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener estado de like de un libro
     * GET /api/likes/books/:bookId/status?userId=123
     */
    static async getBookLikeStatus(req: Request, res: Response): Promise<void> {
        try {
            const bookId = parseInt(req.params.bookId);
            const userId = parseInt(req.query.userId as string);

            if (isNaN(bookId)) {
                res.status(400).json({
                    success: false,
                    message: 'ID de libro inválido'
                });
                return;
            }

            if (isNaN(userId)) {
                res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido'
                });
                return;
            }

            const status = await LikesService.getBookLikeStatus(userId, bookId);

            res.status(200).json({
                success: true,
                data: status
            });

        } catch (error) {
            console.error('Error en getBookLikeStatus:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener estado de like de múltiples libros
     * POST /api/likes/books/status/multiple
     */
    static async getMultipleBookLikeStatus(req: Request, res: Response): Promise<void> {
        try {
            const { userId, bookIds } = req.body;

            if (!userId || !Array.isArray(bookIds)) {
                res.status(400).json({
                    success: false,
                    message: 'userId y bookIds son requeridos'
                });
                return;
            }

            const statuses = await LikesService.getMultipleBookLikeStatus(userId, bookIds);

            res.status(200).json({
                success: true,
                data: statuses
            });

        } catch (error) {
            console.error('Error en getMultipleBookLikeStatus:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // ===== CONTROLADORES DE LIKES DE CAPÍTULOS =====

    /**
     * Toggle like de capítulo
     * POST /api/likes/chapters/toggle
     */
    static async toggleChapterLike(req: Request, res: Response): Promise<void> {
        try {
            // Validar datos con Zod
            const validationResult = likeChapterSchema.safeParse(req.body);

            if (!validationResult.success) {
                res.status(400).json({
                    success: false,
                    message: 'Datos inválidos',
                    errors: validationResult.error.errors
                });
                return;
            }

            const result = await LikesService.toggleChapterLike(validationResult.data);

            res.status(200).json({
                success: true,
                message: result.message,
                data: {
                    isLiked: result.isLiked,
                    likesCount: result.likesCount
                }
            });

        } catch (error) {
            console.error('Error en toggleChapterLike:', error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener estado de like de un capítulo
     * GET /api/likes/chapters/:chapterId/status?userId=123
     */
    static async getChapterLikeStatus(req: Request, res: Response): Promise<void> {
        try {
            const chapterId = parseInt(req.params.chapterId);
            const userId = parseInt(req.query.userId as string);

            if (isNaN(chapterId)) {
                res.status(400).json({
                    success: false,
                    message: 'ID de capítulo inválido'
                });
                return;
            }

            if (isNaN(userId)) {
                res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido'
                });
                return;
            }

            const status = await LikesService.getChapterLikeStatus(userId, chapterId);

            res.status(200).json({
                success: true,
                data: status
            });

        } catch (error) {
            console.error('Error en getChapterLikeStatus:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener estado de like de múltiples capítulos
     * POST /api/likes/chapters/status/multiple
     */
    static async getMultipleChapterLikeStatus(req: Request, res: Response): Promise<void> {
        try {
            const { userId, chapterIds } = req.body;

            if (!userId || !Array.isArray(chapterIds)) {
                res.status(400).json({
                    success: false,
                    message: 'userId y chapterIds son requeridos'
                });
                return;
            }

            const statuses = await LikesService.getMultipleChapterLikeStatus(userId, chapterIds);

            res.status(200).json({
                success: true,
                data: statuses
            });

        } catch (error) {
            console.error('Error en getMultipleChapterLikeStatus:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // ===== CONTROLADORES DE LIKES DEL USUARIO =====

    /**
     * Obtener todos los likes del usuario
     * GET /api/likes/user/:userId
     */
    static async getUserLikes(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);

            if (isNaN(userId)) {
                res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido'
                });
                return;
            }

            const likes = await LikesService.getUserLikes(userId);

            res.status(200).json({
                success: true,
                data: likes
            });

        } catch (error) {
            console.error('Error en getUserLikes:', error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener solo libros likeados por el usuario
     * GET /api/likes/user/:userId/books
     */
    static async getUserLikedBooks(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);

            if (isNaN(userId)) {
                res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido'
                });
                return;
            }

            const likedBooks = await LikesService.getUserLikedBooks(userId);

            res.status(200).json({
                success: true,
                data: likedBooks
            });

        } catch (error) {
            console.error('Error en getUserLikedBooks:', error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener solo capítulos likeados por el usuario
     * GET /api/likes/user/:userId/chapters
     */
    static async getUserLikedChapters(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);

            if (isNaN(userId)) {
                res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido'
                });
                return;
            }

            const likedChapters = await LikesService.getUserLikedChapters(userId);

            res.status(200).json({
                success: true,
                data: likedChapters
            });

        } catch (error) {
            console.error('Error en getUserLikedChapters:', error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error interno del servidor'
            });
        }
    }

    // ===== CONTROLADORES DE ESTADÍSTICAS =====

    /**
     * Obtener conteo de likes de múltiples libros
     * POST /api/likes/books/count/multiple
     */
    static async getMultipleBookLikesCount(req: Request, res: Response): Promise<void> {
        try {
            const { bookIds } = req.body;

            if (!Array.isArray(bookIds)) {
                res.status(400).json({
                    success: false,
                    message: 'bookIds debe ser un array'
                });
                return;
            }

            const counts = await LikesService.getMultipleBookLikesCount(bookIds);

            res.status(200).json({
                success: true,
                data: counts
            });

        } catch (error) {
            console.error('Error en getMultipleBookLikesCount:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener conteo de likes de múltiples capítulos
     * POST /api/likes/chapters/count/multiple
     */
    static async getMultipleChapterLikesCount(req: Request, res: Response): Promise<void> {
        try {
            const { chapterIds } = req.body;

            if (!Array.isArray(chapterIds)) {
                res.status(400).json({
                    success: false,
                    message: 'chapterIds debe ser un array'
                });
                return;
            }

            const counts = await LikesService.getMultipleChapterLikesCount(chapterIds);

            res.status(200).json({
                success: true,
                data: counts
            });

        } catch (error) {
            console.error('Error en getMultipleChapterLikesCount:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
}