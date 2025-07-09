import Input from './input';

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  icon?: React.ReactNode;
};

export function FormField({ error, icon, ...props }: FormFieldProps) {
  return (
    <div className="relative">
      <Input {...props} error={error} />

      {icon && (
        <div className="pointer-events-none absolute left-3 top-[12px] h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900">
          {icon}
        </div>
      )}
    </div>
  );
}
