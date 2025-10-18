import { useState } from "react";
import { Maximize2, MinusCircle, Circle, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CeilingState = "closed" | "half" | "open";

const Ceiling = () => {
  const [state, setState] = useState<CeilingState>("closed");

  const states = [
    { 
      id: "closed" as CeilingState, 
      label: "Fechado", 
      icon: MinusCircle,
      description: "Teto completamente fechado"
    },
    { 
      id: "half" as CeilingState, 
      label: "Meio Aberto", 
      icon: Circle,
      description: "Teto parcialmente aberto"
    },
    { 
      id: "open" as CeilingState, 
      label: "Aberto", 
      icon: CheckCircle2,
      description: "Teto completamente aberto"
    },
  ];

  const handleStateChange = (newState: CeilingState) => {
    setState(newState);
    const stateLabel = states.find(s => s.id === newState)?.label;
    toast.success(`Teto ajustado para: ${stateLabel}`);
  };

  const currentStateIndex = states.findIndex(s => s.id === state);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Controle do Teto Retrátil" />
      
      <main className="container max-w-md mx-auto px-4 py-8">
        <Card className="p-8 space-y-8 animate-fade-in">
          {/* Visual Indicator */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40 rounded-2xl bg-gradient-primary shadow-lg flex items-center justify-center">
              <Maximize2 className="w-20 h-20 text-primary-foreground" />
              <div 
                className="absolute bottom-0 left-0 right-0 bg-background/30 backdrop-blur-sm transition-all duration-500"
                style={{ 
                  height: `${state === 'closed' ? '100' : state === 'half' ? '50' : '0'}%` 
                }}
              />
            </div>
          </div>

          {/* Current State Display */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Estado Atual</p>
            <p className="text-2xl font-bold text-foreground">
              {states.find(s => s.id === state)?.label}
            </p>
          </div>

          {/* State Buttons */}
          <div className="space-y-3">
            {states.map((stateOption, index) => {
              const Icon = stateOption.icon;
              const isActive = state === stateOption.id;
              
              return (
                <button
                  key={stateOption.id}
                  onClick={() => handleStateChange(stateOption.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 transition-all",
                    "flex items-center gap-4 text-left",
                    isActive 
                      ? "border-primary bg-primary/5 shadow-md" 
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                    isActive ? "bg-gradient-primary" : "bg-secondary"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6",
                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-semibold mb-0.5",
                      isActive ? "text-primary" : "text-foreground"
                    )}>
                      {stateOption.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {stateOption.description}
                    </p>
                  </div>
                  {isActive && (
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress Indicator */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progresso</span>
              <span className="text-sm font-medium text-foreground">
                {Math.round((currentStateIndex / (states.length - 1)) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${(currentStateIndex / (states.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Ceiling;
