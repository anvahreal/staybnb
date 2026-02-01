import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, MessageSquare, Wallet, Plus, Star, 
  TrendingUp, Calendar, MapPin, Settings, 
  ChevronRight, LayoutDashboard, AlertCircle, Menu, X, Camera, ShieldCheck
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

// Sub-Components
import HostWallet from "@/components/HostWallet";
import { ConnectBankSheet } from "@/components/ConnectBankSheet";

const HostDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(true);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  };

  const stats = [
    { label: "Total Revenue", value: formatNaira(2450000), icon: Wallet, color: "text-emerald-600" },
    { label: "Active Stays", value: "12", icon: Calendar, color: "text-blue-600" },
    { label: "Avg Rating", value: "4.9", icon: Star, color: "text-amber-500" },
    { label: "Response Rate", value: "98%", icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-4 lg:py-8">
        <div className="container max-w-7xl px-0 md:px-6"> 
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8">
            
            {/* --- SIDEBAR (HOST HUB) --- */}
            <aside className={`${showSidebar ? 'block animate-in slide-in-from-left-4' : 'hidden'} lg:block lg:col-span-3 px-4 md:px-0`}>
              <div className="sticky top-24 space-y-6">
                <Card className="border-none shadow-soft rounded-[2.5rem] p-4 bg-white">
                  <div className="px-4 py-6 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">Host Hub</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-tighter">Lagos Luxury Mgmt</p>
                    </div>
                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowSidebar(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <nav className="space-y-1">
                    <NavButton icon={LayoutDashboard} label="Dashboard" active={activeTab === "overview"} onClick={() => handleTabChange("overview")} />
                    <NavButton icon={MessageSquare} label="Messages" badge="3" onClick={() => navigate("/host/messages")} />
                    <NavButton icon={Wallet} label="Earnings & Wallet" active={activeTab === "wallet"} onClick={() => handleTabChange("wallet")} />
                    <NavButton icon={Home} label="Manage Listings" active={activeTab === "listings"} onClick={() => handleTabChange("listings")} />
                    <NavButton icon={Settings} label="Profile Settings" active={activeTab === "profile"} onClick={() => handleTabChange("profile")} />
                  </nav>

                  <hr className="my-6 border-slate-100" />

                  <Button onClick={() => navigate("/host/create-listing")} className="w-full h-14 rounded-2xl bg-slate-900 text-white shadow-xl font-black gap-2">
                    <Plus className="h-5 w-5" /> New Listing
                  </Button>
                </Card>
              </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className={`${!showSidebar ? 'block animate-in slide-in-from-right-4' : 'hidden'} lg:block lg:col-span-9 px-4 md:px-0 space-y-6`}>
              
              {/* Mobile Breadcrumb */}
              <div className="flex items-center gap-3 lg:hidden">
                <Button variant="ghost" size="sm" className="font-black text-slate-400 p-0" onClick={() => setShowSidebar(true)}>
                  <Menu className="h-5 w-5 mr-2" /> Menu
                </Button>
                <div className="h-4 w-[1px] bg-slate-200" />
                <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">{activeTab}</span>
              </div>

              <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
                <TabsList className="bg-transparent h-auto p-0 gap-8 flex-nowrap overflow-x-auto border-b border-slate-200 w-full justify-start rounded-none no-scrollbar">
                  <TabsTrigger value="overview" className="tab-premium">Overview</TabsTrigger>
                  <TabsTrigger value="listings" className="tab-premium">My Listings</TabsTrigger>
                  <TabsTrigger value="wallet" className="tab-premium">Wallet</TabsTrigger>
                  <TabsTrigger value="profile" className="tab-premium">Profile</TabsTrigger>
                </TabsList>

                {/* --- OVERVIEW --- */}
                <TabsContent value="overview" className="space-y-8 animate-in fade-in">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                      <Card key={i} className="border-none shadow-sm rounded-[2rem] bg-white transition-transform active:scale-95">
                        <CardContent className="p-6">
                          <s.icon className={`h-5 w-5 ${s.color} mb-3`} />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                          <p className="text-xl font-black text-slate-900 mt-1">{s.value}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* --- MANAGE LISTINGS --- */}
                <TabsContent value="listings" className="space-y-6 animate-in slide-in-from-bottom-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">My Listings</h2>
                      <p className="text-slate-500 font-medium italic text-sm">You have 3 active properties</p>
                    </div>
                    <Button onClick={() => navigate("/host/create-listing")} className="w-full md:w-auto rounded-2xl bg-slate-900 text-white shadow-lg font-black h-12 px-8">
                      <Plus className="mr-2 h-4 w-4" /> Add Property
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <ListingCard image="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800" title="Luxurious Waterfront Ikoyi" location="Ikoyi, Lagos" price={85000} status="active" rating={4.9} reviews={24} />
                    <ListingCard image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800" title="Penthouse with City View" location="VI, Lagos" price={120000} status="active" rating={4.8} reviews={18} />
                  </div>
                </TabsContent>

                {/* --- WALLET --- */}
                <TabsContent value="wallet" className="space-y-8 animate-in slide-in-from-bottom-4">
                  <div className="flex justify-between items-end">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight hidden md:block">Earnings</h2>
                    <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                      <ConnectBankSheet /> 
                      <Button className="w-full md:w-auto rounded-2xl bg-slate-900 text-white shadow-xl font-black h-12 px-8">
                        <Plus className="mr-2 h-4 w-4" /> Request Payout
                      </Button>
                    </div>
                  </div>
                  <HostWallet />
                </TabsContent>

                {/* --- PROFILE --- */}
                <TabsContent value="profile" className="space-y-8 animate-in slide-in-from-right-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Profile</h2>
                      <p className="text-slate-500 font-medium italic text-sm">Manage account preferences</p>
                    </div>
                    <Button className="w-full md:w-auto rounded-2xl bg-[#FF7A00] text-white shadow-lg font-black h-12 px-10">Save Changes</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="border-none shadow-soft rounded-[2.5rem] p-8 bg-white text-center h-fit">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400" className="w-full h-full rounded-[2.5rem] object-cover border-4 border-slate-50 shadow-sm" alt="Profile" />
                        <Button size="icon" className="absolute -bottom-1 -right-1 rounded-xl bg-slate-900 h-9 w-9 border-4 border-white"><Camera className="h-4 w-4 text-white" /></Button>
                      </div>
                      <h3 className="font-black text-slate-900 text-lg">Chinwe Obi</h3>
                    </Card>
                    <div className="md:col-span-2 space-y-6">
                      <Card className="border-none shadow-soft rounded-[2.5rem] p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <ProfileInput label="Full Name" defaultValue="Chinwe Obi" />
                          <ProfileInput label="Email" defaultValue="chinwe@lagosluxury.com" />
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Bio</label>
                            <textarea className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-[#FF7A00]/20 min-h-[100px] resize-none" defaultValue="Luxury host in VI." />
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .tab-premium {
          @apply px-1 py-4 font-black text-slate-400 rounded-none transition-all border-b-2 border-transparent 
          data-[state=active]:border-slate-900 data-[state=active]:text-slate-900 bg-transparent shadow-none;
        }
      `}</style>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const ListingCard = ({ image, title, location, price, status, rating, reviews }: any) => (
  <Card className="border-none shadow-soft rounded-[2.5rem] overflow-hidden bg-white group transition-all">
    <div className="flex flex-col md:flex-row">
      <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
        <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={title} />
        <Badge className={`absolute top-4 left-4 border-none font-black uppercase text-[8px] ${status === 'active' ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'}`}>{status}</Badge>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">{title}</h3>
            <p className="text-slate-400 font-bold text-[10px] flex items-center gap-1 mt-1 uppercase tracking-tighter"><MapPin className="h-3 w-3" /> {location}</p>
          </div>
          <p className="text-lg font-black text-slate-900">{formatNaira(price)}</p>
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="text-xs font-black text-slate-900">{rating}</span>
            <span className="text-[10px] font-bold text-slate-400">({reviews} reviews)</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl font-black text-[10px] h-8 px-4 border-2">Edit</Button>
            <Button variant="ghost" size="icon" className="rounded-xl bg-slate-50 h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const ProfileInput = ({ label, defaultValue }: { label: string, defaultValue: string }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">{label}</label>
    <input type="text" defaultValue={defaultValue} className="w-full h-12 bg-slate-50 border-none rounded-2xl px-5 font-bold text-slate-900 focus:ring-2 focus:ring-[#FF7A00]/20 transition-all text-sm" />
  </div>
);

const NavButton = ({ icon: Icon, label, active, onClick, badge }: any) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all ${active ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50"}`}>
    <div className="flex items-center gap-3">
      <Icon className={`h-5 w-5 ${active ? "text-slate-900" : "text-slate-400"}`} />
      <span className="text-sm tracking-tight">{label}</span>
    </div>
    {badge && <Badge className="bg-[#FF7A00] text-white border-none text-[10px]">{badge}</Badge>}
  </button>
);

export default HostDashboard;