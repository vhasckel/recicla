import { Button } from "@/components/common/button";
import { ImpactMetricProps } from "@/types/impact-metric";
import { ShareIcon } from "@heroicons/react/24/outline";

function ImpactMetric({ value, label }: ImpactMetricProps) {
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-extrabold text-primary ">{value}</h3>
            <p className="text-xs">{label}</p>
        </div>
    );
}

export default function Profile() {
    const impactMetrics = [
        { value: "5 kg", label: "Reciclados" },
        { value: "0.5 m³", label: "Espaço em aterros sanitários" },
        { value: "50 kg", label: "CO2 evitado" },
    ];

    return (
        <main className="flex flex-col items-center justify-center md:h-screen px-4">
            <div className="relative items-center mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 pt-12">
                <h3 className="text-lg font-extrabold">Meu Perfil</h3>
                <p className="font-bold">Boas vindas, Vanessa Hasckel!</p>
            </div>
            <div className="relative mx-auto flex w-full max-w-[400px] flex-row justify-around pt-10">
                {impactMetrics.map((metric, index) => (
                    <>
                        <ImpactMetric key={metric.label} value={metric.value} label={metric.label} />
                        {index < impactMetrics.length - 1 && (
                            <div className="h-12 border-r border-gray-300"></div>
                        )}
                    </>
                ))}
            </div>
            <Button className="mt-4 w-full justify-center" type="button">
                Compartilhar seu impacto <ShareIcon className="ml-2 h-5 w-5 text-gray-50"/>
            </Button>
        </main>
    )
}