'use client'

import { useState, useEffect } from 'react';

interface Car {
    id: number;
    name: string;
}

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>([]); // Type explicite pour les voitures
    const [name, setName] = useState<string>(''); // Type explicite pour le nom
    const [error, setError] = useState<string>(''); // Type explicite pour l'erreur

    useEffect(() => {
        fetch('/api/cars')
            .then((res) => res.json())
            .then((data: Car[]) => setCars(data)); // Ajout du type pour `data`
    }, []);

    const addCar = async () => {
        if (!name) {
            setError('Le nom est obligatoire.');
            return;
        }

        const res = await fetch('/api/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });

        if (res.ok) {
            const newCar: Car = await res.json();
            setCars((prev) => [...prev, newCar]); // Ajout de `newCar` au tableau
            setName('');
            setError('');
        } else {
            setError('Erreur lors de l\'ajout de la voiture.');
        }
    };

    return (
        <div>
            <h1>Liste des Voitures</h1>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>{car.name}</li>
                ))}
            </ul>

            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom de la voiture"
                />
                <button onClick={addCar}>Ajouter</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
