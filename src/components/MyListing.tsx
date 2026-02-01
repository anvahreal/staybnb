import { MoreHorizontal, Star, Eye, Plus } from "lucide-react"; // Icons
import { Card, CardContent } from "@/components/ui/card"; // UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // The utility for dynamic classes

export function MyListings() {
  const listings = [
    { id: 1, name: "Waterfront Ikoyi Penthouse", status: "Active", price: "₦150k/night", rating: 4.9, views: 1240, img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400" },
    { id: 2, name: "Modern Studio Lekki Phase 1", status: "Snoozed", price: "₦45k/night", rating: 4.7, views: 850, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">Your Properties</h2>
        <Button className="rounded-2xl bg-[#F48221] hover:bg-[#d9731d] font-black">+ Add New</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <Card key={item.id} className="border-none shadow-soft rounded-[2.5rem] overflow-hidden group">
            <div className="h-48 relative overflow-hidden">
              <img src={item.img} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="" />
              <Badge className={cn(
                "absolute top-4 left-4 border-none font-black",
                item.status === "Active" ? "bg-emerald-500 text-white" : "bg-slate-500 text-white"
              )}>
                {item.status}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-slate-900 text-sm leading-tight max-w-[80%]">{item.name}</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><MoreHorizontal size={16} /></Button>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {item.rating}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                  <Eye className="h-3 w-3" /> {item.views}
                </div>
                <p className="ml-auto font-black text-slate-900 text-sm">{item.price}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <Button variant="outline" className="rounded-xl font-bold border-2 h-10 text-xs">Edit Listing</Button>
                <Button variant="outline" className="rounded-xl font-bold border-2 h-10 text-xs">Availability</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}