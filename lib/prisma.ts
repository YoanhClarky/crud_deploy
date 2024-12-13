import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'], // Optionnel : log les requêtes SQL (utile pour le développement)
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
