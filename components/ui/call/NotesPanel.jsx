import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/call/button";
import { X, Save, Download, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotesPanel({ roomID, onClose }) {
    const [notes, setNotes] = useState("");
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    // Load notes from local storage on mount
    useEffect(() => {
        const savedNotes = localStorage.getItem(`sehatyar_notes_${roomID}`);
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, [roomID]);

    const handleSave = () => {
        localStorage.setItem(`sehatyar_notes_${roomID}`, notes);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(notes);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([notes], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `consultation-notes-${roomID}-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="w-full lg:w-96 h-full flex flex-col glass-panel rounded-2xl overflow-hidden animate-in slide-in-from-right-10 duration-300 shadow-2xl border-l border-white/10">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-[#5fe089] rounded-full"></span>
                    Consultation Notes
                </h3>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor Area */}
            <div className="flex-1 p-4 relative">
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Type your consultation notes here..."
                    className="w-full h-full bg-transparent resize-none focus:outline-none text-gray-200 placeholder:text-gray-500 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                    spellCheck="false"
                />
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between gap-2">
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        className="h-9 w-9 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                        title="Copy to Clipboard"
                    >
                        {copied ? <Check className="h-4 w-4 text-[#5fe089]" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDownload}
                        className="h-9 w-9 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                        title="Download as Text File"
                    >
                        <Download className="h-4 w-4" />
                    </Button>
                </div>

                <Button
                    onClick={handleSave}
                    className={cn(
                        "px-6 rounded-full font-medium transition-all duration-300",
                        saved
                            ? "bg-[#5fe089] text-black hover:bg-[#5fe089]"
                            : "bg-white/10 text-white hover:bg-white/20"
                    )}
                >
                    {saved ? (
                        <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Saved</span>
                    ) : (
                        <span className="flex items-center gap-2"><Save className="h-4 w-4" /> Save Note</span>
                    )}
                </Button>
            </div>
        </div>
    );
}
