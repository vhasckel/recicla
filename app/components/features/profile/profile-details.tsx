import { ImpactMetricProps } from '@/types/impact-metric';
import { Button } from '@/components/ui/button';
import {
  ArrowLeftStartOnRectangleIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

function ImpactMetric({ value, label }: ImpactMetricProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-lg font-extrabold text-primary">{value}</h3>
      <p className="text-xs">{label}</p>
    </div>
  );
}

interface ProfileDetailsProps {
  userName: string;
  impactMetrics: ImpactMetricProps[];
  onLogout: () => void;
  onShare: () => void;
}

export function ProfileDetails({
  userName,
  impactMetrics,
  onLogout,
  onShare,
}: ProfileDetailsProps) {
  return (
    <>
      <div className="flex flex-col items-center space-y-2.5 text-center">
        <h3 className="text-lg font-extrabold">Meu Perfil</h3>
        <p className="font-bold">Boas vindas, {userName}!</p>
      </div>

      <div className="relative mx-auto flex w-full max-w-[400px] flex-row justify-around pt-10">
        {impactMetrics.map((metric, index) => (
          <div key={metric.label} className="flex items-center">
            <ImpactMetric value={metric.value} label={metric.label} />
            {index < impactMetrics.length - 1 && (
              <div className="mx-4 h-12 border-r border-gray-300"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 w-full max-w-[400px] space-y-2 pt-6">
        <Button className="w-full justify-center" type="button">
          <ShareIcon className="mr-2 h-5 w-5" />
          Compartilhar seu impacto
        </Button>
        <Button
          className="w-full justify-center"
          type="button"
          onClick={onLogout}
        >
          <ArrowLeftStartOnRectangleIcon className="mr-2 h-5 w-5" />
          Fazer logout
        </Button>
      </div>
    </>
  );
}
