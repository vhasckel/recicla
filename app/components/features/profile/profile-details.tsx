import { ImpactMetricProps } from '@/types/impact-metric';
import { Button } from '@/components/ui/button';
import {
  ArrowLeftStartOnRectangleIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { Loading } from '@/components/ui/loading';
import { useAuth } from '@/contexts/AuthContext';

// descomentar quando fazer a lógica de métricas
// function ImpactMetric({ value, label }: ImpactMetricProps) {
//   return (
//     <div className="flex flex-col items-center text-center">
//       <h3 className="text-lg font-extrabold text-primary">{value}</h3>
//       <p className="text-xs">{label}</p>
//     </div>
//   );
// }

interface ProfileDetailsProps {
  impactMetrics: ImpactMetricProps[];
  onShare: () => void;
}

export function ProfileDetails({
  impactMetrics,
  onShare,
}: ProfileDetailsProps) {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <Loading message="Carregando dados do usuário..." />;
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-2.5 text-center">
        <h3 className="text-lg font-extrabold">Meu Perfil</h3>
        <p className="font-bold">Boas vindas, {user?.name}!</p>
        {user?.email && <p className="text-sm text-gray-600">{user.email}</p>}
        {(user?.city || user?.state) && (
          <p className="text-sm text-gray-600">
            {user.city && user.state
              ? `${user.city}, ${user.state}`
              : user.city || user.state}
          </p>
        )}
      </div>

      {
        // descomentar quando fazer a lógica de métricas
        /* <div className="relative mx-auto flex w-full max-w-[400px] flex-row justify-around pt-10">
        {impactMetrics.map((metric, index) => (
          <div key={metric.label} className="flex items-center">
            <ImpactMetric value={metric.value} label={metric.label} />
            {index < impactMetrics.length - 1 && (
              <div className="mx-4 h-12 border-r border-gray-300"></div>
            )}
          </div>
        ))}
      </div> */
      }

      <div className="mt-4 w-full max-w-[400px] space-y-2 pt-6">
        <Button
          className="w-full justify-center"
          type="button"
          onClick={onShare}
        >
          <ShareIcon className="mr-2 h-5 w-5" />
          Compartilhar seu impacto
        </Button>
        <Button
          className="w-full justify-center"
          type="button"
          onClick={logout}
        >
          <ArrowLeftStartOnRectangleIcon className="mr-2 h-5 w-5" />
          Fazer logout
        </Button>
      </div>
    </>
  );
}
