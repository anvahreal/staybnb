import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

// Mock Data remains internal to the component
const transactions = [
  { id: "TX1024", type: "credit", amount: 145000, description: "Booking: Chidi Okoro (3 Nights)", status: "available", date: "Jan 28, 2024" },
  { id: "TX1025", type: "credit", amount: 88000, description: "Booking: Fatima Yusuf (2 Nights)", status: "pending", date: "Jan 30, 2024" },
  { id: "TX1026", type: "debit", amount: 200000, description: "Withdrawal to GTBank (****4421)", status: "completed", date: "Jan 25, 2024" },
];

const HostWallet = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Balance */}
        <Card className="bg-[#FF7A00] text-white border-none shadow-xl shadow-orange-100 rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <Wallet size={120} />
          </div>
          <CardHeader>
            <CardTitle className="text-[10px] font-black opacity-80 uppercase tracking-widest text-white">
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black mb-1">₦450,500.00</div>
            <p className="text-[10px] text-white/70 font-bold uppercase">Ready for withdrawal</p>
          </CardContent>
        </Card>

        {/* Pending Card */}
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-slate-900">₦88,000</div>
            <p className="text-[10px] text-slate-400 mt-1 font-bold">Escrow processing</p>
          </CardContent>
        </Card>

        {/* Total Earned Card */}
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Earned</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-slate-900">₦2,450,000</div>
            <p className="text-[10px] text-slate-400 mt-1 font-bold">Net earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* TRANSACTION LIST */}
      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <div className="p-6 border-b">
          <h3 className="font-black text-lg text-slate-900">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.type === "credit" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                        {tx.type === "credit" ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{tx.description}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{tx.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <p className={`font-black text-sm ${tx.type === "credit" ? "text-emerald-600" : "text-slate-900"}`}>
                      {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                    </p>
                    <Badge variant="outline" className="rounded-full border-none bg-slate-50 text-[8px] font-black uppercase">
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default HostWallet;