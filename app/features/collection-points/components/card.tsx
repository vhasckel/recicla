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
            className="flex flex-col rounded-lg bg-white text-surface shadow-secondary md:max-w-xl cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex">
                <img
                    className="w-24 rounded-s-lg object-cover"
                    src={mapUrl}
                    alt={`Mapa da localização: ${street}, ${number || 's/n'}`}/>
                <div className="flex flex-col justify-center p-2 flex-1">
                    <h3 className="font-semibold text-textColor">{neighborhood}</h3>
                    <p className="text-sm text-textColor">
                        {street}{number ? `, ${number}` : ''}
                    </p>
                    <p className="text-sm text-textColor">
                        {city}
                    </p>
                </div>
            </div>
        </div>
    )
} 