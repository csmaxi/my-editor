"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search, Plus, FileText, Code, Image, Video, Heading1, Heading2, Settings, User, Save, Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CommandPaletteProps {
  onAddElement?: (type: "h1" | "h2" | "p" | "code" | "image" | "video") => void;
  onTogglePreview?: () => void;
  onSave?: () => void;
  onAuthorSettings?: () => void;
  isPreviewMode?: boolean;
  isSaving?: boolean;
}

export function CommandPalette({
  onAddElement,
  onTogglePreview,
  onSave,
  onAuthorSettings,
  isPreviewMode = false,
  isSaving = false,
}: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const elementTypes = [
    {
      name: "Título Principal",
      icon: Heading1,
      shortcut: "⌘1",
      action: () => onAddElement?.("h1"),
    },
    {
      name: "Subtítulo",
      icon: Heading2,
      shortcut: "⌘2",
      action: () => onAddElement?.("h2"),
    },
    {
      name: "Párrafo",
      icon: FileText,
      shortcut: "⌘P",
      action: () => onAddElement?.("p"),
    },
    {
      name: "Bloque de Código",
      icon: Code,
      shortcut: "⌘C",
      action: () => onAddElement?.("code"),
    },
    {
      name: "Imagen",
      icon: Image,
      shortcut: "⌘I",
      action: () => onAddElement?.("image"),
    },
    {
      name: "Video",
      icon: Video,
      shortcut: "⌘V",
      action: () => onAddElement?.("video"),
    },
  ];

  const actions = [
    {
      name: isPreviewMode ? "Modo Edición" : "Vista Previa",
      icon: Eye,
      shortcut: "⌘E",
      action: () => onTogglePreview?.(),
    },
    {
      name: "Guardar Curso",
      icon: Save,
      shortcut: "⌘S",
      action: () => onSave?.(),
      disabled: isSaving,
    },
    {
      name: "Configurar Autor",
      icon: User,
      shortcut: "⌘A",
      action: () => onAuthorSettings?.(),
    },
    {
      name: "Configuración",
      icon: Settings,
      shortcut: "⌘,",
      action: () => {},
    },
  ];

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex items-center">
          <Search className="mr-2 h-4 w-4" />
          Buscar comandos...
        </span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escribe un comando o busca..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Agregar Elementos">
            {elementTypes.map((element) => (
              <CommandItem
                key={element.name}
                onSelect={() => runCommand(element.action)}
                className="flex items-center gap-2"
              >
                <element.icon className="h-4 w-4" />
                <span>{element.name}</span>
                <CommandShortcut>{element.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Acciones">
            {actions.map((action) => (
              <CommandItem
                key={action.name}
                onSelect={() => runCommand(action.action)}
                disabled={action.disabled}
                className="flex items-center gap-2"
              >
                <action.icon className="h-4 w-4" />
                <span>{action.name}</span>
                <CommandShortcut>{action.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navegación">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/"))}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Volver al Inicio</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
} 