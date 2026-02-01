import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Camera, MapPin, Home, CheckCircle2 } from "lucide-react";

const CreateListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* STEPS HEADER */}
      <header className="bg-white border-b sticky top-0 z-50 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-2 w-8 rounded-full transition-all duration-500 ${
                  step >= s ? "bg-slate-900" : "bg-slate-200"
                }`} 
              />
            ))}
          </div>
          <span className="text-[10px] font-black uppercase text-slate-400">Step {step} of 3</span>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter">The Basics</h1>
                <p className="text-slate-500 font-medium">Tell us where your place is and how much you charge.</p>
              </div>

              <Card className="border-none shadow-soft rounded-[2.5rem] p-8 space-y-6">
                <FormInput label="Listing Title" placeholder="e.g. Modern Waterfront Penthouse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Price per Night (₦)" placeholder="85,000" type="number" />
                  <FormSelect label="Location" options={["Ikoyi", "Victoria Island", "Lekki Phase 1", "Ikeja"]} />
                </div>
                <FormInput label="Street Address" placeholder="e.g. 12B Adetokunbo Ademola St" icon={<MapPin className="h-4 w-4" />} />
              </Card>
            </div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Space Details</h1>
                <p className="text-slate-500 font-medium">Help guests understand what they're booking.</p>
              </div>

              <Card className="border-none shadow-soft rounded-[2.5rem] p-8 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <Counter label="Bedrooms" />
                  <Counter label="Bathrooms" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Key Amenities</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["24/7 Power", "Fast WiFi", "Gym", "Pool", "Security", "Chef"].map((amenity) => (
                      <button key={amenity} className="flex items-center gap-2 p-4 rounded-2xl border-2 border-slate-50 hover:border-slate-900 transition-all font-bold text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-slate-200" /> {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 3: MEDIA */}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Add Photos</h1>
                <p className="text-slate-500 font-medium">Show off your space! Upload at least 5 high-quality photos.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="border-4 border-dashed border-slate-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center bg-white hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="font-black text-slate-900">Tap to upload</p>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">PNG, JPG up to 10MB</p>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="aspect-square rounded-2xl bg-slate-200 border-2 border-white shadow-sm" />
                   ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* FIXED BOTTOM NAVIGATION */}
      <footer className="bg-white border-t p-6 pb-10">
        <div className="max-w-2xl mx-auto flex justify-between gap-4">
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            disabled={step === 1}
            className="rounded-2xl h-14 px-8 font-black uppercase text-xs"
          >
            Back
          </Button>
          
          <Button 
            onClick={step === totalSteps ? () => navigate("/host/dashboard") : nextStep}
            className="flex-1 rounded-2xl h-14 bg-slate-900 text-white font-black shadow-xl"
          >
            {step === totalSteps ? "Launch Listing" : "Continue"}
          </Button>
        </div>
      </footer>
    </div>
  );
};

// --- HELPERS ---

const FormInput = ({ label, placeholder, type = "text", icon }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2">{icon}</div>}
      <input 
        type={type} 
        placeholder={placeholder}
        className={`w-full h-14 bg-slate-50 border-none rounded-2xl ${icon ? 'pl-12' : 'px-6'} font-bold text-slate-900 focus:ring-2 focus:ring-slate-200 transition-all`} 
      />
    </div>
  </div>
);

const FormSelect = ({ label, options }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">{label}</label>
    <select className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-900 focus:ring-2 focus:ring-slate-200 transition-all appearance-none">
      {options.map((opt: string) => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);

const Counter = ({ label }: { label: string }) => {
  const [count, setCount] = useState(1);
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
      <span className="text-sm font-black text-slate-900">{label}</span>
      <div className="flex items-center gap-4">
        <button onClick={() => setCount(Math.max(0, count - 1))} className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center font-black">-</button>
        <span className="font-black text-slate-900 w-4 text-center">{count}</span>
        <button onClick={() => setCount(count + 1)} className="h-8 w-8 rounded-full bg-slate-900 text-white shadow-sm flex items-center justify-center font-black">+</button>
      </div>
    </div>
  );
};

export default CreateListing;