import { useEffect, useState } from "react";
import { Download, Smartphone, Share, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Install = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast.error("Instalação não disponível neste momento");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success("App instalado com sucesso!");
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-primary-foreground shadow-lg">
        <div className="container max-w-md mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Download className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Instalar App</h1>
          </div>
          <p className="text-primary-foreground/80">
            Instale o app no seu celular
          </p>
        </div>
      </header>

      <main className="container max-w-md mx-auto px-4 py-8">
        <div className="space-y-6 animate-fade-in">
          {isInstallable && (
            <Card className="p-6 border-2 border-primary">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  Pronto para instalar!
                </h2>
                <p className="text-muted-foreground">
                  Clique no botão abaixo para instalar o app na sua tela inicial
                </p>
                <Button
                  onClick={handleInstall}
                  size="lg"
                  className="w-full bg-gradient-primary"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Instalar Agora
                </Button>
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Share className="w-5 h-5" />
              Como instalar manualmente
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">iPhone/Safari:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Toque no botão de compartilhar (quadrado com seta)</li>
                  <li>Role para baixo e selecione "Adicionar à Tela de Início"</li>
                  <li>Toque em "Adicionar"</li>
                </ol>
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <h3 className="font-medium text-foreground">Android/Chrome:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Toque no menu (três pontos no canto superior)</li>
                  <li>Selecione "Adicionar à tela inicial" ou "Instalar app"</li>
                  <li>Toque em "Adicionar"</li>
                </ol>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-accent/50">
            <h3 className="font-semibold text-foreground mb-2">
              Vantagens do App Instalado
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Acesso rápido pela tela inicial</li>
              <li>✓ Funciona offline</li>
              <li>✓ Carregamento instantâneo</li>
              <li>✓ Experiência de app nativo</li>
            </ul>
          </Card>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate("/")}
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar para o Início
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Install;
