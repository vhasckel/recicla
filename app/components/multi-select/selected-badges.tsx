import { Badge } from '@/components/ui/badge';
import { XCircle } from 'lucide-react';
import { cn } from '@/utils/utils';
import { multiSelectVariants } from './multi-select';

interface SelectedBadgesProps {
  selectedValues: string[];
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onRemove: (value: string) => void;
  maxCount: number;
  isAnimating: boolean;
  animation: number;
  variant: string | undefined;
  clearExtraOptions: () => void;
}

export function SelectedBadges({
  selectedValues,
  options,
  onRemove,
  maxCount,
  isAnimating,
  animation,
  variant,
  clearExtraOptions,
}: SelectedBadgesProps) {
  return (
    <>
      {selectedValues.slice(0, maxCount).map((value) => {
        const option = options.find((o) => o.value === value);
        const IconComponent = option?.icon;
        return (
          <Badge
            key={value}
            className={cn(
              isAnimating ? 'animate-bounce' : '',
              multiSelectVariants({
                variant: variant as
                  | 'default'
                  | 'secondary'
                  | 'destructive'
                  | 'inverted',
              })
            )}
            style={{ animationDuration: `${animation}s` }}
          >
            {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
            {option?.label}
            <XCircle
              className="ml-2 h-4 w-4 cursor-pointer"
              aria-label="Remover opção"
              onClick={(event) => {
                event.stopPropagation();
                onRemove(value);
              }}
            />
          </Badge>
        );
      })}
      {selectedValues.length > maxCount && (
        <Badge
          className={cn(
            'border-foreground/1 bg-transparent text-foreground hover:bg-transparent',
            isAnimating ? 'animate-bounce' : '',
            multiSelectVariants({
              variant: variant as
                | 'default'
                | 'secondary'
                | 'destructive'
                | 'inverted',
            })
          )}
          style={{ animationDuration: `${animation}s` }}
        >
          {`+ ${selectedValues.length - maxCount} more`}
          <XCircle
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Limpar opções extras"
            onClick={(event) => {
              event.stopPropagation();
              clearExtraOptions();
            }}
          />
        </Badge>
      )}
    </>
  );
}
