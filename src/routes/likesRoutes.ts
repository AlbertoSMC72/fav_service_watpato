// src/routes/likesRoutes.ts
import { Router } from 'express';
import { LikesController } from '../controllers/likesController';

const router = Router();

// ===== RUTAS DE LIKES DE LIBROS =====

/**
 * @swagger
 * /api/likes/books/toggle:
 *   post:
 *     summary: Toggle like de libro (dar/quitar like)
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, bookId]
 *             properties:
 *               userId:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del usuario que da/quita el like
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del libro a likear/deslikear
 *                 example: 5
 *     responses:
 *       200:
 *         description: Like procesado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Like agregado al libro exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     isLiked:
 *                       type: boolean
 *                       example: true
 *                     likesCount:
 *                       type: integer
 *                       example: 42
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/books/toggle', LikesController.toggleBookLike);

/**
 * @swagger
 * /api/likes/books/{bookId}/status:
 *   get:
 *     summary: Obtener estado de like de un libro para un usuario
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del libro
 *         example: 5
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Estado de like obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     isLiked:
 *                       type: boolean
 *                       example: true
 *                     likesCount:
 *                       type: integer
 *                       example: 42
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/books/:bookId/status', LikesController.getBookLikeStatus);

/**
 * @swagger
 * /api/likes/books/status/multiple:
 *   post:
 *     summary: Obtener estado de like de múltiples libros
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, bookIds]
 *             properties:
 *               userId:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *               bookIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   minimum: 1
 *                 example: [1, 2, 3, 5]
 *     responses:
 *       200:
 *         description: Estados de like obtenidos exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/books/status/multiple', LikesController.getMultipleBookLikeStatus);

/**
 * @swagger
 * /api/likes/books/count/multiple:
 *   post:
 *     summary: Obtener conteo de likes de múltiples libros
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bookIds]
 *             properties:
 *               bookIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   minimum: 1
 *                 example: [1, 2, 3, 5]
 *     responses:
 *       200:
 *         description: Conteos obtenidos exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/books/count/multiple', LikesController.getMultipleBookLikesCount);

// ===== RUTAS DE LIKES DE CAPÍTULOS =====

/**
 * @swagger
 * /api/likes/chapters/toggle:
 *   post:
 *     summary: Toggle like de capítulo (dar/quitar like)
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, chapterId]
 *             properties:
 *               userId:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del usuario que da/quita el like
 *                 example: 1
 *               chapterId:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del capítulo a likear/deslikear
 *                 example: 15
 *     responses:
 *       200:
 *         description: Like procesado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Like agregado al capítulo exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     isLiked:
 *                       type: boolean
 *                       example: true
 *                     likesCount:
 *                       type: integer
 *                       example: 23
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/chapters/toggle', LikesController.toggleChapterLike);

/**
 * @swagger
 * /api/likes/chapters/{chapterId}/status:
 *   get:
 *     summary: Obtener estado de like de un capítulo para un usuario
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: chapterId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del capítulo
 *         example: 15
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Estado de like obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     isLiked:
 *                       type: boolean
 *                       example: false
 *                     likesCount:
 *                       type: integer
 *                       example: 23
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/chapters/:chapterId/status', LikesController.getChapterLikeStatus);

/**
 * @swagger
 * /api/likes/chapters/status/multiple:
 *   post:
 *     summary: Obtener estado de like de múltiples capítulos
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, chapterIds]
 *             properties:
 *               userId:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *               chapterIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   minimum: 1
 *                 example: [10, 11, 12, 15]
 *     responses:
 *       200:
 *         description: Estados de like obtenidos exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/chapters/status/multiple', LikesController.getMultipleChapterLikeStatus);

/**
 * @swagger
 * /api/likes/chapters/count/multiple:
 *   post:
 *     summary: Obtener conteo de likes de múltiples capítulos
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [chapterIds]
 *             properties:
 *               chapterIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   minimum: 1
 *                 example: [10, 11, 12, 15]
 *     responses:
 *       200:
 *         description: Conteos obtenidos exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/chapters/count/multiple', LikesController.getMultipleChapterLikesCount);

// ===== RUTAS DE LIKES DEL USUARIO =====

/**
 * @swagger
 * /api/likes/user/{userId}:
 *   get:
 *     summary: Obtener todos los likes del usuario (libros y capítulos)
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Likes del usuario obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     likedBooks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           userId:
 *                             type: string
 *                           bookId:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                           book:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               coverImage:
 *                                 type: string
 *                               author:
 *                                 type: object
 *                                 properties:
 *                                   username:
 *                                     type: string
 *                                   profilePicture:
 *                                     type: string
 *                     likedChapters:
 *                       type: array
 *                       items:
 *                         type: object
 *                     totalLikes:
 *                       type: integer
 *                       example: 25
 *       400:
 *         description: ID de usuario inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/user/:userId', LikesController.getUserLikes);

/**
 * @swagger
 * /api/likes/user/{userId}/books:
 *   get:
 *     summary: Obtener solo libros likeados por el usuario
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Libros likeados obtenidos exitosamente
 *       400:
 *         description: ID de usuario inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/user/:userId/books', LikesController.getUserLikedBooks);

/**
 * @swagger
 * /api/likes/user/{userId}/chapters:
 *   get:
 *     summary: Obtener solo capítulos likeados por el usuario
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Capítulos likeados obtenidos exitosamente
 *       400:
 *         description: ID de usuario inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/user/:userId/chapters', LikesController.getUserLikedChapters);

export default router;