"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Sparkles, CheckCircle } from "lucide-react";

interface AuthorSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authorName: string;
  onSave: (name: string) => void;
}

export function AuthorSettingsDialog({
  open,
  onOpenChange,
  authorName,
  onSave,
}: AuthorSettingsDialogProps) {
  const [tempAuthorName, setTempAuthorName] = useState(authorName);
  const [isValid, setIsValid] = useState(!!authorName.trim());

  const handleSave = () => {
    if (tempAuthorName.trim()) {
      onSave(tempAuthorName.trim());
      onOpenChange(false);
    }
  };

  const handleInputChange = (value: string) => {
    setTempAuthorName(value);
    setIsValid(!!value.trim());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Configurar Autor
          </DialogTitle>
          <DialogDescription>
            Este nombre aparecerá como autor en todos los cursos que publiques.
            Puedes cambiarlo en cualquier momento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="author-name">Nombre completo</Label>
            <Input
              id="author-name"
              value={tempAuthorName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)}
              placeholder="Ej: María González"
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
            {isValid && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Nombre válido</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Vista previa</p>
              <p className="text-blue-700">
                Autor: <Badge variant="secondary">{tempAuthorName || "Tu nombre"}</Badge>
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!isValid}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 