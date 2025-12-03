import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import AppShell from '../components/layout/AppShell';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:5000');

export default function Chat() {
    const [msgs, setMsgs] = useState([
        { sender: 'system', text: 'Selamat datang di layanan Chat Psikolog.', createdAt: new Date() }
    ]);
    const [text, setText] = useState('');
    const bottomRef = useRef(null);
    const room = 'general'; // Default room for now

    useEffect(() => {
        socket.emit('joinRoom', room);

        const handleMessage = (m) => {
            setMsgs((prev) => [...prev, m]);
        };

        socket.on('chatMessage', handleMessage);

        return () => {
            socket.off('chatMessage', handleMessage);
            // Don't disconnect here if we want to keep connection alive across nav, 
            // but for now let's keep it simple.
        };
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgs]);

    const send = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const msg = { room, text, sender: 'me', createdAt: new Date() };
        // Optimistic update
        setMsgs((prev) => [...prev, msg]);
        socket.emit('chatMessage', msg);
        setText('');
    };

    return (
        <AppShell>
            <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Header Chat */}
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-xl">
                        👩‍⚕️
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800 text-sm">Psikolog Siaga</h2>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Online
                        </p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                    {msgs.map((m, i) => {
                        const isMe = m.sender === 'me';
                        return (
                            <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${isMe
                                            ? 'bg-sky-500 text-white rounded-tr-none'
                                            : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                                        }`}
                                >
                                    <p>{m.text}</p>
                                    <p className={`text-[10px] mt-1 ${isMe ? 'text-sky-100' : 'text-slate-400'}`}>
                                        {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={bottomRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={send} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ketik pesan..."
                        className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="p-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </AppShell>
    );
}