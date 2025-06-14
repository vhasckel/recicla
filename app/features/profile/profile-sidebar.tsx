'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/common/button";
import { ImpactMetricProps } from "@/types/impact-metric";
import { ArrowLeftStartOnRectangleIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function ImpactMetric({ value, label }: ImpactMetricProps) {
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-extrabold text-primary ">{value}</h3>
            <p className="text-xs">{label}</p>
        </div>
    );
}

interface ProfileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileSidebar({ open, onOpenChange }: ProfileSidebarProps) {
    const router = useRouter();
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
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="w-80 sm:w-96 flex flex-col p-0 md:p-4 z-[100]">
                <SheetHeader className="p-4 md:p-0">
                    <SheetTitle>Meu Perfil</SheetTitle>
                </SheetHeader>
                <div className="p-4 md:p-0">
                    <p className="font-bold">Boas vindas, Vanessa Hasckel!</p>
                </div>
                <div className="flex flex-row justify-around p-4 md:p-0">
                    {impactMetrics.map((metric, index) => (
                        <div key={metric.label} className="flex items-center">
                            <ImpactMetric value={metric.value} label={metric.label} />
                            {index < impactMetrics.length - 1 && (
                                <div className="h-12 border-r border-gray-300 mx-4"></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-4 md:p-0 space-y-4">
                    <Button className="w-full justify-center" type="button">
                        <ShareIcon className="mr-2 h-5 w-5 text-gray-50"/> Compartilhar seu impacto
                    </Button>
                    <Button
                        className="w-full justify-center"
                        type="button"
                        onClick={handleLogout}
                    >
                        <ArrowLeftStartOnRectangleIcon className="mr-2 h-5 w-5 text-gray-50"/> Fazer logout
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
} 