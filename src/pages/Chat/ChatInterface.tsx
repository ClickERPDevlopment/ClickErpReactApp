/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreHorizontal, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/utility/NotificationProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Message type definition
interface Message {
    id: string;
    content?: string;
    sender: 'user' | 'bot' | '';
    timestamp: Date;
    avatar?: string;
    name?: string;
}

const initialMessages: Message[] = [
    {
        id: '1',
        content: 'Hello! How can I help you today?',
        sender: 'bot',
        timestamp: new Date(Date.now() - 300000),
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=chatbot',
        name: 'Assistant'
    }
];

export default function ChatInterface({ selectedUser }: { selectedUser: string }) {
    const { SendMessage: sendChatMessage, message: chatMessage, sendChatMessageToUser } = useNotifications();

    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (chatMessage) {
            // Add user message
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: chatMessage,
                sender: 'bot',
                timestamp: new Date(),
                avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=chatbot',
                name: 'Assistant'
            };

            setMessages(prev => [...prev, botResponse]);
        }
    }, [chatMessage]);

    const handleSendMessage = (e: any) => {
        e.preventDefault();

        if (inputValue.trim() === '') return;
        sendChatMessageToUser(selectedUser, inputValue.trim());

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: 'user',
            timestamp: new Date(),
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
            name: 'You'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        setIsTyping(false);
    };

    const formatTime = (date: any) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    //h-[calc(100vh-120px)]
    return (
        <div className="flex flex-col h-full rounded-r-md  p-0 m-0 ">
            <div className="flex flex-col justify-between h-full mx-auto bg-white border rounded-r-md w-full">
                <div className='flex flex-col flex-1'>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b bg-gray-100">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=chatbot" alt="Chatbot" />
                                <AvatarFallback>
                                    <Bot className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-semibold text-lg">{selectedUser}</h2>
                                <p className="text-sm text-gray-500">
                                    {isTyping ? 'Typing...' : 'Online'}
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                                    <DropdownMenuItem
                                        onClick={() => sendChatMessage('Hello! Test Message')}
                                    >
                                        Send Test Message
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Button>
                    </div>

                    {/* Messages Area - Fixed height with proper scrolling */}
                    <div className="overflow-scroll h-[calc(100vh-250px)]">
                        <ScrollArea className="h-full p-4 py-1">
                            <div className="space-y-4" ref={messagesContainerRef}>
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn(
                                            'flex items-start space-x-3',
                                            message.sender === 'user' && 'flex-row-reverse space-x-reverse'
                                        )}
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={message.avatar} alt={message.name} />
                                            <AvatarFallback>
                                                {message.sender === 'user' ? (
                                                    <User className="h-4 w-4" />
                                                ) : (
                                                    <Bot className="h-4 w-4" />
                                                )}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className={cn(
                                            'max-w-xs lg:max-w-md px-4 py-2 rounded-xl',
                                            message.sender === 'user'
                                                ? 'bg-sky-600 ml-auto'
                                                : 'bg-gray-200'
                                        )}>
                                            <p className={cn("text-sm",
                                                message.sender === 'user' ? 'text-white' : 'text-gray-800')}>{message.content}</p>
                                            <p className={cn(
                                                'text-xs mt-1',
                                                message.sender === 'user' ? 'text-sky-100' : 'text-gray-500'
                                            )}>
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex items-start space-x-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=chatbot" alt="Chatbot" />
                                            <AvatarFallback>
                                                <Bot className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="bg-gray-200 px-4 py-2 rounded-2xl">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                    <div className="flex items-center space-x-2">
                        <Button type="button" variant="ghost" size="icon" className="h-10 w-10">
                            <Paperclip className="h-5 w-5" />
                        </Button>

                        <Button type="button" variant="ghost" size="icon" className="h-10 w-10">
                            <Smile className="h-5 w-5" />
                        </Button>

                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1"
                        />

                        <Button
                            type="submit"
                            size="icon"
                            className="h-10 w-10"
                            disabled={inputValue.trim() === ''}
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}