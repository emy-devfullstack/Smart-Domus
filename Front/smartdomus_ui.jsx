import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MotionConfig, motion } from "framer-motion";
import { Lightbulb, Settings, Shirt } from "lucide-react";

export default function SmartDomusHome() {
  const items = [
    { icon: <Lightbulb size={80} />, label: "Iluminação" },
    { icon: <Shirt size={80} />, label: "Varal Retrátil" },
    { icon: <Settings size={80} />, label: "Configurações" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] px-10 py-6 text-white">
      <header className="flex justify-between items-center mb-20">
        <div className="text-2xl font-bold flex items-center gap-2">
          <span className="text-pink-500">⬢</span> SmartDomus
        </div>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-lg hover:opacity-90">
          Configurações
        </Button>
      </header>

      <div className="flex justify-center gap-20 items-center">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <Card className="w-56 h-56 bg-[#0D1326] rounded-3xl shadow-[0_0_40px_10px_rgba(0,0,255,0.25)] flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
              <div className="text-blue-400 mb-3">{it.icon}</div>
              <span className="text-blue-300 text-lg">{it.label}</span>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
