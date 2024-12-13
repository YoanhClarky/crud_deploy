import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Récupère une voiture par ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const car = await prisma.car.findUnique({ where: { id: Number(params.id) } });
    if (!car) return NextResponse.json({ error: 'Voiture non trouvée' }, { status: 404 });

    return NextResponse.json(car);
}

// PUT: Met à jour une voiture par ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { name } = await req.json();
    if (!name) {
        return NextResponse.json({ error: 'Le nom est obligatoire.' }, { status: 400 });
    }

    const car = await prisma.car.update({
        where: { id: Number(params.id) },
        data: { name },
    });
    return NextResponse.json(car);
}

// DELETE: Supprime une voiture par ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await prisma.car.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: 'Voiture supprimée avec succès.' });
}
