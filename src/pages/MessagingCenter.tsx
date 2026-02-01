import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { 
  Search, Send, MoreVertical, Phone, Info, 
  CheckCheck, Clock, MapPin, Calendar, ChevronLeft, ShieldCheck 
} from "lucide-react";

// --- MOCK DATA ---
const mockChats = [
  { id: "1", guestName: "Chidi Okoro", guestAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", lastMessage: "Is there a backup generator for the AC?", time: "10:45 AM", unread: 2, status: "Inquiry", listing: "Waterfront Ikoyi Penthouse", dates: "Dec 20 - Dec 27", price: "₦595,000" },
  { id: "2", guestName: "Fatima Yusuf", guestAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", lastMessage: "Thanks for the check-in instructions!", time: "Yesterday", unread: 0, status: "Confirmed", listing: "Modern Studio Lekki", dates: "Jan 05 - Jan 10", price: "₦250,000" },
];

const mockMessages = [
  { id: 1, sender: "guest", text: "Hello! I'm interested in the Ikoyi penthouse.", time: "09:30 AM" },
  { id: 2, sender: "host", text: "Hi Chidi! It's available. Would you like to know anything specific?", time: "09:45 AM" },
  { id: 3, sender: "guest", text: "Yes, I need to be sure about the power. Is there a generator?", time: "10:40 AM" },
  { id: 4, sender: "guest", text: "Is there a backup generator for the AC?", time: "10:45 AM" },
];

export default function MessagingCenter() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [view, setView] = useState<"list" | "chat">("list");
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Header />
      
      <main className="flex-1 flex container max-w-7xl gap-4 p-0 md:p-4 overflow-hidden relative">
        
        {/* --- 1. CHAT LIST (Sidebar) --- */}
        <aside className={cn(
          "w-full md:w-80 lg:w-96 flex flex-col gap-3 p-4 md:p-0 transition-all duration-300",
          view === "chat" ? "hidden md:flex" : "flex"
        )}>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/host/dashboard")}
            className="w-fit hover:bg-white rounded-2xl font-black text-slate-400 p-2"
          >
            <ChevronLeft className="mr-1 h-5 w-5" /> Dashboard
          </Button>

          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search messages..." 
              className="pl-11 h-12 rounded-2xl border-none shadow-sm bg-white font-medium focus-visible:ring-primary"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            <h2 className="px-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Recent Chats</h2>
            {mockChats.map((chat) => (
              <Card
                key={chat.id}
                onClick={() => { setSelectedChat(chat); setView("chat"); }}
                className={cn(
                  "border-none shadow-sm rounded-2xl cursor-pointer transition-all p-4 flex items-start gap-4",
                  selectedChat.id === chat.id ? "bg-primary text-white" : "bg-white hover:bg-slate-50"
                )}
              >
                <Avatar className="h-12 w-12 shrink-0 border-2 border-white/20">
                  <AvatarImage src={chat.guestAvatar} />
                  <AvatarFallback>{chat.guestName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="font-bold truncate text-sm">{chat.guestName}</p>
                    <span className="text-[10px] font-bold opacity-70">{chat.time}</span>
                  </div>
                  <p className={cn("text-xs truncate", selectedChat.id === chat.id ? "text-white/80" : "text-slate-500")}>
                    {chat.lastMessage}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </aside>

        {/* --- 2. MAIN CHAT AREA --- */}
        <section className={cn(
          "flex-1 flex flex-col transition-all duration-300 bg-white md:bg-transparent h-full md:h-auto",
          view === "list" ? "hidden md:flex" : "flex"
        )}>
          <Card className="flex-1 border-none md:shadow-soft rounded-none md:rounded-[2.5rem] overflow-hidden flex flex-col bg-white">
            
            {/* Header */}
            <div className="p-4 md:p-6 border-b flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-3 min-w-0">
                <Button variant="ghost" size="icon" className="md:hidden -ml-2 rounded-full" onClick={() => setView("list")}>
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={selectedChat.guestAvatar} />
                </Avatar>
                <div className="min-w-0">
                  <h3 className="font-black text-slate-900 truncate text-sm md:text-base leading-none mb-1">{selectedChat.guestName}</h3>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Online</p>
                  </div>
                </div>
              </div>

              {/* MOBILE ACTIONS */}
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden rounded-full font-black text-[10px] border-primary text-primary px-3 h-8 uppercase">Manage</Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="rounded-t-[2.5rem] p-6 outline-none border-none">
                    <SheetHeader className="mb-6 text-left">
                      <SheetTitle className="font-black text-2xl">Booking Details</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl">
                        <div className="h-16 w-16 bg-slate-200 rounded-xl overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200" className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-sm">{selectedChat.listing}</p>
                          <p className="text-xs font-bold text-slate-500 italic">{selectedChat.dates}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                          <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Total Payout</p>
                          <p className="font-black text-slate-900">{selectedChat.price}</p>
                        </div>
                        <div className="p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                          <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Status</p>
                          <p className="font-black text-primary uppercase text-xs">{selectedChat.status}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 pt-4">
                        <Button className="w-full h-14 rounded-2xl font-black bg-slate-900 text-white shadow-xl shadow-slate-200">Accept Booking</Button>
                        <Button variant="ghost" className="w-full h-12 rounded-2xl font-bold text-slate-400">Decline Request</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-slate-400 hover:text-primary"><Phone className="h-4 w-4" /></Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Payments are held securely by the platform</span>
                </div>
              </div>

              {mockMessages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === "host" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-[1.4rem] shadow-sm",
                    msg.sender === "host" ? "bg-slate-900 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                  )}>
                    <p className="text-[13px] md:text-sm font-medium leading-relaxed">{msg.text}</p>
                    <div className={cn("flex items-center gap-1 mt-1.5 justify-end opacity-50")}>
                      <span className="text-[9px] font-bold tracking-tight">{msg.time}</span>
                      {msg.sender === "host" && <CheckCheck className="h-3 w-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-white border-t safe-bottom">
              <div className="flex gap-2 items-center bg-slate-100 p-1.5 rounded-[1.5rem] focus-within:ring-2 ring-primary/10 transition-all">
                <Input 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="border-none bg-transparent focus-visible:ring-0 font-medium placeholder:text-slate-400 h-10"
                />
                <Button className="rounded-2xl h-10 w-10 p-0 shadow-lg" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* --- 3. DESKTOP SIDEBAR --- */}
        <aside className="hidden lg:block w-72 space-y-4 shrink-0 overflow-y-auto">
          <Card className="border-none shadow-soft rounded-[2rem] overflow-hidden bg-white">
            <div className="h-28 w-full relative">
              <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-3 right-3 bg-primary border-none">{selectedChat.status}</Badge>
            </div>
            <CardContent className="p-5">
              <h4 className="font-black text-slate-900 mb-4 leading-tight text-sm">{selectedChat.listing}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-xl"><Calendar className="h-3.5 w-3.5 text-slate-400" /></div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase leading-none">Dates</p>
                    <p className="text-[11px] font-bold text-slate-700">{selectedChat.dates}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-xl"><Clock className="h-3.5 w-3.5 text-slate-400" /></div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase leading-none">Payout</p>
                    <p className="text-[11px] font-bold text-slate-700">{selectedChat.price}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t space-y-2">
                <Button className="w-full rounded-xl font-black bg-slate-900 hover:bg-primary py-6 transition-all">Accept Booking</Button>
                <Button variant="ghost" className="w-full rounded-xl font-bold text-slate-400">Decline Request</Button>
              </div>
            </CardContent>
          </Card>
        </aside>

      </main>
    </div>
  );
}