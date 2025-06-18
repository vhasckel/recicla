import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandEmpty,
  CommandList,
} from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface OptionsListProps {
  options: Option[];
  selectedValues: string[];
  toggleOption: (value: string) => void;
  toggleAll: () => void;
  handleClear: () => void;
  closePopover: () => void;
}

export function OptionsList({
  options,
  selectedValues,
  toggleOption,
  toggleAll,
  handleClear,
  closePopover,
}: OptionsListProps) {
  return (
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup>
        <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
          <div
            className={cn(
              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
              selectedValues.length === options.length
                ? 'bg-primary text-primary-foreground'
                : 'opacity-50 [&_svg]:invisible'
            )}
          >
            <CheckIcon className="h-4 w-4" />
          </div>
          <span>(Select All)</span>
        </CommandItem>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <CommandItem
              key={option.value}
              onSelect={() => toggleOption(option.value)}
              className="cursor-pointer"
            >
              <div
                className={cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible'
                )}
              >
                <CheckIcon className="h-4 w-4" />
              </div>
              {option.icon && (
                <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              )}
              <span>{option.label}</span>
            </CommandItem>
          );
        })}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup>
        <div className="flex items-center justify-between">
          {selectedValues.length > 0 && (
            <>
              <CommandItem
                onSelect={handleClear}
                className="flex-1 cursor-pointer justify-center"
              >
                Clear
              </CommandItem>
              <Separator
                orientation="vertical"
                className="flex h-full min-h-6"
              />
            </>
          )}
          <CommandItem
            onSelect={closePopover}
            className="max-w-full flex-1 cursor-pointer justify-center"
          >
            Close
          </CommandItem>
        </div>
      </CommandGroup>
    </CommandList>
  );
}
