import { useState } from "react"; // For managing the steps (Step 1 vs Step 2)
import { Landmark, CheckCircle, Building2, ChevronDown } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ConnectBankSheet() {
  const [step, setStep] = useState(1);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-2xl border-2 font-black">Add Bank Account</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-[3rem] p-8 max-w-2xl mx-auto border-none">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="h-16 w-16 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-900">
              <Landmark size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">Where should we send your earnings?</h2>
              <p className="text-slate-500 font-medium">Add a Nigerian bank account for direct payouts.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Select Bank</label>
                <select className="w-full h-14 rounded-2xl bg-slate-50 border-none px-4 font-bold text-slate-900 focus:ring-2 ring-primary transition-all appearance-none">
                  <option>GTBank</option>
                  <option>Zenith Bank</option>
                  <option>Access Bank</option>
                  <option>Kuda MFB</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Account Number</label>
                <Input placeholder="0123456789" className="h-14 rounded-2xl bg-slate-50 border-none px-4 font-bold text-lg" />
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-xl shadow-slate-200">
              Verify Account
            </Button>
          </div>
        ) : (
          <div className="py-10 text-center space-y-6">
            <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Account Verified!</h2>
              <p className="font-bold text-slate-500 mt-2">CHIDI OKORO - GTBANK ****6789</p>
            </div>
            <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black" onClick={() => {/* Close Sheet */}}>
              Done
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}