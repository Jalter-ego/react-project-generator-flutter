import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { IconCheck, IconSelector } from "@/assets/Icons"
import type { ComponentInstanceCombobox } from "@/types/CanvasItem"

interface ComboboxDemoProps {
  combobox: ComponentInstanceCombobox;
}

export function ComboboxDemo({ combobox }: ComboboxDemoProps) {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[270px] justify-between"
        >
          {value
            ? combobox.find((framework) => framework.label === value)?.label
            : "Select data..."}
          <IconSelector/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[270px] p-0">
        <Command>
          <CommandInput placeholder="Search ..." className="h-9" />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {combobox.map((framework) => (
                <CommandItem
                  key={framework.label}
                  value={framework.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <IconCheck/>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}