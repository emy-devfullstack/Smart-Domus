import { useState } from "react";
import { Lightbulb, Power } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Lighting = () => {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState([50]);

  const toggleLight = () => {
    setIsOn(!isOn);
    toast.success(isOn ? "Luz desligada" : "Luz ligada");
  };

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Controle de Iluminação" />
      
      <main className="container max-w-md mx-auto px-4 py-8">
        <Card className="p-8 space-y-8 animate-fade-in">
          {/* Light Bulb Visual */}
          <div className="flex justify-center">
            <div 
              className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                isOn 
                  ? 'bg-gradient-primary shadow-lg shadow-primary/50' 
                  : 'bg-muted'
              }`}
            >
              <Lightbulb 
                className={`w-16 h-16 transition-colors ${
                  isOn ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              />
            </div>
          </div>

          {/* Power Button */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Estado
            </label>
            <Button
              onClick={toggleLight}
              size="lg"
              className={`w-full ${
                isOn 
                  ? 'bg-gradient-primary hover:opacity-90' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <Power className="w-5 h-5 mr-2" />
              {isOn ? 'Desligar' : 'Ligar'}
            </Button>
          </div>

          {/* Brightness Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Intensidade
              </label>
              <span className="text-sm text-muted-foreground">
                {brightness[0]}%
              </span>
            </div>
            <Slider
              value={brightness}
              onValueChange={handleBrightnessChange}
              max={100}
              step={1}
              disabled={!isOn}
              className="w-full"
            />
          </div>

          {/* Status Info */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className={`font-medium ${isOn ? 'text-primary' : 'text-muted-foreground'}`}>
                {isOn ? 'Ligado' : 'Desligado'}
              </span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Lighting;
