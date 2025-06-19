import Input from '@/components/ui/input';
import { FormFieldProps } from '@/types/forms';

export function FormField({
  id,
  type,
  name,
  placeholder,
  required = false,
  minLength,
  value,
  onChange,
  error,
  icon,
  className = 'pl-10',
  containerClassName = 'mt-5',
}: FormFieldProps) {
  return (
    <div className="relative">
      <Input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className={className}
        containerClassName={containerClassName}
        value={value}
        onChange={onChange}
        error={error}
      />
      {icon && (
        <div className="pointer-events-none absolute left-3 top-[12px] h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900">
          {icon}
        </div>
      )}
    </div>
  );
}
