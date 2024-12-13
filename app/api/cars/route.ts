import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Liste toutes les voitures
export async function GET() {
    const cars = await prisma.car.findMany();
    return NextResponse.json(cars);
}

// POST: Crée une nouvelle voiture
export async function POST(request: Request) {
    const { name } = await request.json();

    if (!name) {
        return NextResponse.json({ error: 'Le nom est obligatoire.' }, { status: 400 });
    }

    const car = await prisma.car.create({ data: { name } });
    return NextResponse.json(car);
}
