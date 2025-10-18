import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Moon, Sun, User, Bell } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [userName, setUserName] = useState("Usuário");

  useEffect(() => {
    // Check if dark mode is already set
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
    
    // Load saved preferences
    const savedName = localStorage.getItem('userName');
    if (savedName) setUserName(savedName);
    
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) setNotifications(savedNotifications === 'true');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      toast.success("Modo escuro ativado");
    } else {
      document.documentElement.classList.remove('dark');
      toast.success("Modo claro ativado");
    }
    
    localStorage.setItem('darkMode', newMode.toString());
  };

  const toggleNotifications = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('notifications', newValue.toString());
    toast.success(newValue ? "Notificações ativadas" : "Notificações desativadas");
  };

  const saveUserName = () => {
    localStorage.setItem('userName', userName);
    toast.success("Nome de usuário salvo");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Configurações" />
      
      <main className="container max-w-md mx-auto px-4 py-8">
        <div className="space-y-4 animate-fade-in">
          {/* Appearance Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Aparência
            </h2>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <div>
                  <p className="font-medium text-foreground">Modo Escuro</p>
                  <p className="text-sm text-muted-foreground">
                    {darkMode ? "Ativado" : "Desativado"}
                  </p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </Card>

          {/* User Preferences */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Preferências de Usuário
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Nome de Usuário</Label>
                <div className="flex gap-2">
                  <Input
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Digite seu nome"
                  />
                  <Button onClick={saveUserName} size="default">
                    Salvar
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Notificações</p>
                    <p className="text-sm text-muted-foreground">
                      Alertas do sistema
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={toggleNotifications}
                />
              </div>
            </div>
          </Card>

          {/* About */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Sobre
            </h2>
            <p className="text-sm text-muted-foreground">
              Sistema de Automação Residencial
            </p>
            <p className="text-sm text-muted-foreground">
              Versão 1.0.0
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
