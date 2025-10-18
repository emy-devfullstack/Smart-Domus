import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

export const ControlCard = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick,
  className 
}: ControlCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full bg-gradient-card rounded-lg p-6 shadow-md hover:shadow-lg",
        "transition-all duration-300 hover:-translate-y-1",
        "border border-border active:scale-95",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};
