import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

const filters = [
    { name: 'None', class: 'filter-none', color: 'bg-gray-500' },
    { name: 'Blur', class: 'filter-blur', color: 'bg-blue-400' },
    { name: 'Sepia', class: 'filter-sepia', color: 'bg-amber-600' },
    { name: 'B&W', class: 'filter-grayscale', color: 'bg-gray-900' },
    { name: 'Vintage', class: 'filter-vintage', color: 'bg-yellow-700' },
    { name: 'Warm', class: 'filter-warm', color: 'bg-orange-500' },
    { name: 'Cool', class: 'filter-cool', color: 'bg-cyan-500' },
    { name: 'Invert', class: 'filter-invert', color: 'bg-purple-600' },
];

export default function FilterSelector({ currentFilter, onSelectFilter }) {
    return (
        <div className="glass-panel p-4 rounded-xl flex flex-col gap-3 w-full max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-2 text-white mb-2">
                <Sparkles className="w-4 h-4 text-[#5fe089]" />
                <span className="font-semibold text-sm">Face Filters</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {filters.map((filter) => (
                    <button
                        key={filter.name}
                        onClick={() => onSelectFilter(filter.class)}
                        className={cn(
                            "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 hover:bg-white/10",
                            currentFilter === filter.class ? "bg-white/20 ring-1 ring-[#5fe089]" : "opacity-70 hover:opacity-100"
                        )}
                    >
                        <div className={cn("w-8 h-8 rounded-full shadow-sm", filter.color)}></div>
                        <span className="text-[10px] text-white font-medium">{filter.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
