'use client'

import { Button } from "@/components/common/button";
import { ImpactMetricProps } from "@/types/impact-metric";
import { ArrowLeftStartOnRectangleIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ProfileSidebar } from "@/features/profile/profile-sidebar";

function ImpactMetric({ value, label }: ImpactMetricProps) {
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-extrabold text-primary ">{value}</h3>
            <p className="text-xs">{label}</p>
        </div>
    );
}

export default function Profile() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        const viewParam = searchParams.get('view');
        if (viewParam === 'profile') {
            if (isMobile) {
                router.push('/profile');
            } else {
                setIsSidebarOpen(true);
            }
        } else {
            setIsSidebarOpen(false);
        }
    }, [searchParams, isMobile, router]);

    const handleSidebarOpenChange = (open: boolean) => {
        setIsSidebarOpen(open);
        if (!open) {
            const currentSearchParams = new URLSearchParams(searchParams.toString());
            currentSearchParams.delete('view');
            router.replace(`/dashboard?${currentSearchParams.toString()}`);
        }
    };

    const impactMetrics = [
        { value: "5 kg", label: "Reciclados" },
        { value: "0.5 m³", label: "Espaço em aterros sanitários" },
        { value: "50 kg", label: "CO2 evitado" },
    ];

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <main className="flex flex-col items-center justify-center md:h-screen px-4">
            <div className="relative items-center mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 pt-12">
                <h3 className="text-lg font-extrabold">Meu Perfil</h3>
                <p className="font-bold">Boas vindas, Vanessa Hasckel!</p>
            </div>
            <div className="relative mx-auto flex w-full max-w-[400px] flex-row justify-around pt-10">
                {impactMetrics.map((metric, index) => (
                    <div key={metric.label} className="flex items-center">
                        <ImpactMetric value={metric.value} label={metric.label} />
                        {index < impactMetrics.length - 1 && (
                            <div className="h-12 border-r border-gray-300 mx-4"></div>
                        )}
                    </div>
                ))}
            </div>
            <Button className="mt-4 w-full justify-center" type="button">
                <ShareIcon className="mr-2 h-5 w-5 text-gray-50"/> Compartilhar seu impacto
            </Button>
            <Button
                className="mt-4 w-full justify-center"
                type="button"
                onClick={handleLogout}
            >
                <ArrowLeftStartOnRectangleIcon className="mr-2 h-5 w-5 text-gray-50"/> Fazer logout
            </Button>
            {!isMobile && (
                <ProfileSidebar open={isSidebarOpen} onOpenChange={handleSidebarOpenChange} />
            )}
        </main>
    )
}