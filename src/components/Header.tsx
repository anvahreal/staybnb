import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img
            src="/assets/digitalridr-logo.PNG"
            alt="Digital Ridr"
            className={cn(
              "object-contain transition-all duration-300",
              "h-10 md:h-14",
              "w-auto",
              "ml-0",
            )}
          />
        </Link>

        {!location.pathname.includes("/host") && (
          <div className="hidden md:flex items-center">
            <button className="flex items-center gap-4 rounded-full border border-slate-200 bg-white px-6 py-2.5 shadow-sm hover:shadow-md transition-all">
              <span className="font-bold text-sm text-slate-900">Anywhere</span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="font-bold text-sm text-slate-900">Any week</span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-slate-400 text-sm font-medium">
                Add guests
              </span>
              <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F48221] text-white">
                <Search className="h-4 w-4 stroke-[3px]" />
              </div>
            </button>
          </div>
        )}

        {/* Right Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/host" className="hidden lg:block">
            <Button
              variant="ghost"
              className="rounded-full font-black text-slate-700 hover:bg-slate-50"
            >
              Become a Host
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex rounded-full text-slate-600"
          >
            <Globe className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-3 rounded-full border-slate-200 pl-3 pr-1 py-1 h-12 hover:shadow-md transition-all bg-white"
              >
                <Menu className="h-4 w-4 text-slate-600" />
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900">
                  <User className="h-5 w-5 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 rounded-2xl p-2 shadow-xl border-slate-100 mt-2"
            >
              <DropdownMenuItem
                asChild
                className="rounded-xl focus:bg-slate-50"
              >
                <Link to="/auth" className="font-black py-2">
                  Sign up
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-xl focus:bg-slate-50"
              >
                <Link to="/auth" className="py-2 font-medium">
                  Log in
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                asChild
                className="rounded-xl focus:bg-slate-50"
              >
                <Link to="/host" className="py-2">
                  Host your home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl focus:bg-slate-50 py-2">
                Help Center
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
