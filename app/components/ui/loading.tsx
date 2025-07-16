interface LoadingProps {
  message?: string;
  className?: string;
}

export function Loading({
  message = 'Carregando...',
  className = '',
}: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}
