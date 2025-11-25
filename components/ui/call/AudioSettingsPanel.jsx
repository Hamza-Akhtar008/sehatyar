import React from 'react';
import { Button } from "@/components/ui/call/button";
import { Mic, Waves, Volume2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const AudioSettingsPanel = ({ currentMode, onSelectMode }) => {
    const modes = [
        {
            id: 'standard',
            name: 'Standard',
            icon: Mic,
            description: 'Balanced audio settings',
            color: 'text-white'
        },
        {
            id: 'noise-reduction',
            name: 'Noise Reduction',
            icon: Waves,
            description: 'Minimizes background noise',
            color: 'text-blue-400'
        },
        {
            id: 'voice-clarity',
            name: 'Voice Clarity',
            icon: Zap,
            description: 'Enhances vocal frequencies',
            color: 'text-yellow-400'
        }
    ];

    return (
        <div className="glass-panel p-4 rounded-2xl w-64 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="flex items-center gap-2 mb-4 px-2">
                <Volume2 className="w-4 h-4 text-[#5fe089]" />
                <span className="text-sm font-semibold text-white">Audio Enhancement</span>
            </div>

            <div className="space-y-2">
                {modes.map((mode) => {
                    const Icon = mode.icon;
                    const isSelected = currentMode === mode.id;

                    return (
                        <button
                            key={mode.id}
                            onClick={() => onSelectMode(mode.id)}
                            className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left group",
                                isSelected
                                    ? "bg-white/10 border border-white/10 shadow-lg"
                                    : "hover:bg-white/5 border border-transparent"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-full bg-black/20 transition-colors",
                                isSelected ? mode.color : "text-gray-400 group-hover:text-gray-200"
                            )}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div>
                                <div className={cn(
                                    "text-sm font-medium transition-colors",
                                    isSelected ? "text-white" : "text-gray-300"
                                )}>
                                    {mode.name}
                                </div>
                                <div className="text-xs text-gray-500 leading-tight">
                                    {mode.description}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AudioSettingsPanel;
