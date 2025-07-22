// src/repos/likesRepository.ts
import { PrismaClient } from '@prisma/client';
import { 
  BookLikeResponse, 
  ChapterLikeResponse,
  LikeStatusResponse,
  UserLikesResponse
} from '../models/likesModels';

const prisma = new PrismaClient();

export class LikesRepository {

  // ===== LIKES DE LIBROS =====

  /**
   * Dar like a un libro
   */
  static async likeBook(userId: number, bookId: number): Promise<BookLikeResponse> {
    try {
      const like = await prisma.bookLike.create({
        data: {
          userId: BigInt(userId),
          bookId: BigInt(bookId)
        },
        include: {
          book: {
            include: {
              author: {
                select: {
                  username: true,
                  profilePicture: true
                }
              }
            }
          }
        }
      });

      return {
        id: `${like.userId}_${like.bookId}`, // ID compuesto como string
        userId: like.userId.toString(),
        bookId: like.bookId.toString(),
        createdAt: new Date().toISOString(), // Fecha actual ya que no está en el modelo
        book: {
          id: like.book.id.toString(),
          title: like.book.title,
          coverImage: like.book.coverImage || undefined,
          genres: []
        }
      };
    } catch (error) {
      console.error('Error en LikesRepository.likeBook:', error);
      throw new Error('Error al dar like al libro');
    }
  }

  /**
   * Quitar like de un libro
   */
  static async unlikeBook(userId: number, bookId: number): Promise<boolean> {
    try {
      const deleted = await prisma.bookLike.delete({
        where: {
          userId_bookId: {
            userId: BigInt(userId),
            bookId: BigInt(bookId)
          }
        }
      });

      return deleted !== null;
    } catch (error) {
      console.error('Error en LikesRepository.unlikeBook:', error);
      // Si no existe el like, prisma lanza error, retornamos false
      return false;
    }
  }

  /**
   * Verificar si un usuario ya dio like a un libro
   */
  static async isBookLikedByUser(userId: number, bookId: number): Promise<boolean> {
    try {
      const like = await prisma.bookLike.findUnique({
        where: {
          userId_bookId: {
            userId: BigInt(userId),
            bookId: BigInt(bookId)
          }
        }
      });

      return like !== null;
    } catch (error) {
      console.error('Error en LikesRepository.isBookLikedByUser:', error);
      return false;
    }
  }

  /**
   * Obtener cantidad de likes de un libro
   */
  static async getBookLikesCount(bookId: number): Promise<number> {
    try {
      const count = await prisma.bookLike.count({
        where: {
          bookId: BigInt(bookId)
        }
      });

      return count;
    } catch (error) {
      console.error('Error en LikesRepository.getBookLikesCount:', error);
      throw new Error('Error al obtener conteo de likes del libro');
    }
  }

  /**
   * Obtener estado de like de un libro (si está liked + cantidad total)
   */
  static async getBookLikeStatus(userId: number, bookId: number): Promise<LikeStatusResponse> {
    try {
      const [isLiked, likesCount] = await Promise.all([
        this.isBookLikedByUser(userId, bookId),
        this.getBookLikesCount(bookId)
      ]);

      return {
        isLiked,
        likesCount
      };
    } catch (error) {
      console.error('Error en LikesRepository.getBookLikeStatus:', error);
      throw new Error('Error al obtener estado de like del libro');
    }
  }

  // ===== LIKES DE CAPÍTULOS =====

  /**
   * Dar like a un capítulo
   */
  static async likeChapter(userId: number, chapterId: number): Promise<ChapterLikeResponse> {
    try {
      const like = await prisma.chapterLike.create({
        data: {
          userId: BigInt(userId),
          chapterId: BigInt(chapterId)
        },
        include: {
          chapter: {
            include: {
              book: {
                include: {
                  author: {
                    select: {
                      username: true,
                      profilePicture: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      return {
        id: `${like.userId}_${like.chapterId}`, // ID compuesto como string
        userId: like.userId.toString(),
        chapterId: like.chapterId.toString(),
        createdAt: new Date().toISOString(), // Fecha actual ya que no está en el modelo
        chapter: {
          id: like.chapter.id.toString(),
          title: like.chapter.title,
          book: {
            id: like.chapter.book?.id.toString() || '',
            title: like.chapter.book?.title || '',
            coverImage: like.chapter.book?.coverImage || undefined,
            author: {
              username: like.chapter.book?.author?.username || '',
              profilePicture: like.chapter.book?.author?.profilePicture || undefined
            }
          }
        }
      };
    } catch (error) {
      console.error('Error en LikesRepository.likeChapter:', error);
      throw new Error('Error al dar like al capítulo');
    }
  }

  /**
   * Quitar like de un capítulo
   */
  static async unlikeChapter(userId: number, chapterId: number): Promise<boolean> {
    try {
      const deleted = await prisma.chapterLike.delete({
        where: {
          userId_chapterId: {
            userId: BigInt(userId),
            chapterId: BigInt(chapterId)
          }
        }
      });

      return deleted !== null;
    } catch (error) {
      console.error('Error en LikesRepository.unlikeChapter:', error);
      // Si no existe el like, prisma lanza error, retornamos false
      return false;
    }
  }

  /**
   * Verificar si un usuario ya dio like a un capítulo
   */
  static async isChapterLikedByUser(userId: number, chapterId: number): Promise<boolean> {
    try {
      const like = await prisma.chapterLike.findUnique({
        where: {
          userId_chapterId: {
            userId: BigInt(userId),
            chapterId: BigInt(chapterId)
          }
        }
      });

      return like !== null;
    } catch (error) {
      console.error('Error en LikesRepository.isChapterLikedByUser:', error);
      return false;
    }
  }

  /**
   * Obtener cantidad de likes de un capítulo
   */
  static async getChapterLikesCount(chapterId: number): Promise<number> {
    try {
      const count = await prisma.chapterLike.count({
        where: {
          chapterId: BigInt(chapterId)
        }
      });

      return count;
    } catch (error) {
      console.error('Error en LikesRepository.getChapterLikesCount:', error);
      throw new Error('Error al obtener conteo de likes del capítulo');
    }
  }

  /**
   * Obtener estado de like de un capítulo (si está liked + cantidad total)
   */
  static async getChapterLikeStatus(userId: number, chapterId: number): Promise<LikeStatusResponse> {
    try {
      const [isLiked, likesCount] = await Promise.all([
        this.isChapterLikedByUser(userId, chapterId),
        this.getChapterLikesCount(chapterId)
      ]);

      return {
        isLiked,
        likesCount
      };
    } catch (error) {
      console.error('Error en LikesRepository.getChapterLikeStatus:', error);
      throw new Error('Error al obtener estado de like del capítulo');
    }
  }

  // ===== LIKES DEL USUARIO =====

  /**
   * Obtener todos los likes de un usuario (libros y capítulos)
   */
  static async getUserLikes(userId: number): Promise<UserLikesResponse> {
    try {
      const [bookLikes, chapterLikes] = await Promise.all([
        prisma.bookLike.findMany({
          where: { userId: BigInt(userId) },
          include: {
            book: {
              include: {
                genres: {
                  include: {
                    genre: true
                  }
                }
              }
            }
          }
        }),
        prisma.chapterLike.findMany({
          where: { userId: BigInt(userId) },
          include: {
            chapter: {
              include: {
                book: {
                  include: {
                    author: {
                      select: {
                        username: true,
                        profilePicture: true
                      }
                    }
                  }
                }
              }
            }
          }
        })
      ]);

      const likedBooks: BookLikeResponse[] = bookLikes.map(like => ({
        id: `${like.userId}_${like.bookId}`,
        userId: like.userId.toString(),
        bookId: like.bookId.toString(),
        createdAt: new Date().toISOString(),
        book: {
          id: like.book.id.toString(),
          title: like.book.title,
          coverImage: like.book.coverImage || undefined,
          description: like.book.description || undefined,
          genres: like.book.genres?.map(bg => bg.genre.name) || []
        }
      }));

      const likedChapters: ChapterLikeResponse[] = chapterLikes.map(like => ({
        id: `${like.userId}_${like.chapterId}`,
        userId: like.userId.toString(),
        chapterId: like.chapterId.toString(),
        createdAt: new Date().toISOString(),
        chapter: {
          id: like.chapter.id.toString(),
          title: like.chapter.title,
          book: {
            id: like.chapter.book?.id.toString() || '',
            title: like.chapter.book?.title || '',
            coverImage: like.chapter.book?.coverImage || undefined,
            author: {
              username: like.chapter.book?.author?.username || '',
              profilePicture: like.chapter.book?.author?.profilePicture || undefined
            }
          }
        }
      }));

      return {
        likedBooks,
        likedChapters,
        totalLikes: likedBooks.length + likedChapters.length
      };
    } catch (error) {
      console.error('Error en LikesRepository.getUserLikes:', error);
      throw new Error('Error al obtener likes del usuario');
    }
  }

  /**
   * Verificar que existe un libro
   */
  static async bookExists(bookId: number): Promise<boolean> {
    try {
      const book = await prisma.book.findUnique({
        where: { id: BigInt(bookId) }
      });
      return book !== null;
    } catch (error) {
      console.error('Error en LikesRepository.bookExists:', error);
      return false;
    }
  }

  /**
   * Verificar que existe un capítulo
   */
  static async chapterExists(chapterId: number): Promise<boolean> {
    try {
      const chapter = await prisma.chapter.findUnique({
        where: { id: BigInt(chapterId) }
      });
      return chapter !== null;
    } catch (error) {
      console.error('Error en LikesRepository.chapterExists:', error);
      return false;
    }
  }

  /**
   * Verificar que existe un usuario
   */
  static async userExists(userId: number): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: BigInt(userId) }
      });
      return user !== null;
    } catch (error) {
      console.error('Error en LikesRepository.userExists:', error);
      return false;
    }
  }
}