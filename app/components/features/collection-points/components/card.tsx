'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CardProps {
  neighborhood: string;
  city: string;
  street: string;
  number?: string;
  lat: number;
  lng: number;
  id: string;
}

export function Card({
  neighborhood,
  city,
  street,
  number,
  lat,
  lng,
  id,
}: CardProps) {
  const router = useRouter();
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${lng},${lat})/${lng},${lat},15,0/200x200?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

  const handleClick = () => {
    router.push(`/dashboard?point=${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="text-surface flex cursor-pointer flex-col rounded-lg bg-white shadow-secondary transition-shadow hover:shadow-lg md:max-w-xl"
    >
      <div className="flex">
        <Image
          className="w-24 rounded-s-lg object-cover"
          src={mapUrl}
          alt={`Mapa da localização: ${street}, ${number || 's/n'}`}
          width={200}
          height={200}
        />
        <div className="flex flex-1 flex-col justify-center p-2">
          <h3 className="font-semibold text-textColor">{neighborhood}</h3>
          <p className="text-sm text-textColor">
            {street}
            {number ? `, ${number}` : ''}
          </p>
          <p className="text-sm text-textColor">{city}</p>
        </div>
      </div>
    </div>
  );
}
