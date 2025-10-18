import { Home, Lightbulb, Maximize2, Settings, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ControlCard } from "@/components/ControlCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-lg">
        <div className="container max-w-md mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Casa Inteligente</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/install")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-primary-foreground/80">
            Controle sua automação residencial
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-md mx-auto px-4 py-8">
        <div className="space-y-4 animate-fade-in">
          <ControlCard
            icon={Lightbulb}
            title="Iluminação"
            description="Controle todas as luzes da casa"
            onClick={() => navigate("/lighting")}
          />
          
          <ControlCard
            icon={Maximize2}
            title="Teto Retrátil"
            description="Ajuste a abertura do teto"
            onClick={() => navigate("/ceiling")}
          />
          
          <ControlCard
            icon={Settings}
            title="Configurações"
            description="Preferências e ajustes do sistema"
            onClick={() => navigate("/settings")}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
