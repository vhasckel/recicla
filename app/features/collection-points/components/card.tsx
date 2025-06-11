'use client'

import { useRouter } from "next/navigation"

interface CardProps {
  neighborhood: string;
  city: string;
  street: string;
  number?: string;
  lat: number;
  lng: number;
  id: string;
}

export function Card({ neighborhood, city, street, number, lat, lng, id }: CardProps) {
    const router = useRouter();
    const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${lng},${lat})/${lng},${lat},15,0/200x200?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

    const handleClick = () => {
        router.push(`/dashboard?point=${id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="flex h-20 rounded-lg bg-white text-surface shadow-secondary md:max-w-xl md:flex-row cursor-pointer">
            <img
                className="w-24 rounded-s-lg object-cover"
                src={mapUrl}
                alt={`Mapa da localização: ${street}, ${number || 's/n'}`}/>
            <div className="flex justify-start items-center gap-1 p-2">
                <p className="text-sm text-textColor">
                    {street}{`, ${number || 's/n'} - ${neighborhood}, ${city}`}
                </p>
            </div>
        </div>
    )
} 