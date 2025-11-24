import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UniversalTooltipProps {
  children: React.ReactNode;
  content: string;
  bgColor?: string; // hex or Tailwind color
  textColor?: string; // hex or Tailwind color
}

export default function UniversalTooltip({
  children,
  content,
  bgColor = "#1f2937", // fallback gray-900
  textColor = "#ffffff",
}: UniversalTooltipProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="top" align="center" className="p-0 bg-transparent shadow-none">
          {/* Inner wrapper where we control the styling */}
          <div
            className="rounded-md px-3 py-1 shadow-lg"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {content}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
