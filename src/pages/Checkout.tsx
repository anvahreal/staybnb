import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { mockListings } from "@/data/mockListings";
import { formatNaira } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";
import { Calendar, MapPin, Users, Star, CreditCard, Shield, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get params from URL
  const listingId = searchParams.get("listing");
  const checkInStr = searchParams.get("checkIn");
  const checkOutStr = searchParams.get("checkOut");
  const guestsStr = searchParams.get("guests");

  const listing = mockListings.find((l) => l.id === listingId);
  const checkIn = checkInStr ? new Date(checkInStr) : new Date();
  const checkOut = checkOutStr ? new Date(checkOutStr) : new Date();
  const guests = guestsStr ? parseInt(guestsStr) : 1;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Listing not found</h1>
          <Button onClick={() => navigate("/")}>Back to home</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const nights = differenceInDays(checkOut, checkIn);
  const subtotal = nights * listing.price_per_night;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  const handlePayment = () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
    toast.success("Payment successful! Booking confirmed.");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              ← Back
            </Button>
            <h1 className="mt-4 text-3xl font-bold">Confirm and pay</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Your Trip */}
              <Card>
                <CardHeader>
                  <CardTitle>Your trip</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Dates</p>
                      <p className="text-sm text-muted-foreground">
                        {format(checkIn, "MMM d")} - {format(checkOut, "MMM d, yyyy")}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Guests</p>
                      <p className="text-sm text-muted-foreground">
                        {guests} {guests === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Pay with</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { id: "card", label: "Credit or debit card", icon: CreditCard },
                      { id: "paystack", label: "Paystack", icon: CreditCard },
                      { id: "bank", label: "Bank transfer", icon: CreditCard },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                          paymentMethod === method.id ? "border-primary bg-primary/5" : "hover:bg-secondary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="h-4 w-4"
                        />
                        <method.icon className="h-5 w-5" />
                        <span className="font-medium">{method.label}</span>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 rounded-lg border p-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry</Label>
                          <Input id="expiry" placeholder="MM / YY" maxLength={5} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" maxLength={3} type="password" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on card</Label>
                        <Input id="cardName" placeholder="Full name" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Required for your trip */}
              <Card>
                <CardHeader>
                  <CardTitle>Required for your trip</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 801 234 5678"
                      defaultValue="+234 801 234 5678"
                    />
                    <p className="text-xs text-muted-foreground">
                      The host may need to contact you about your reservation
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cancellation Policy */}
              <Card>
                <CardHeader>
                  <CardTitle>Cancellation policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm">
                    <strong>Free cancellation before Dec 13.</strong> Cancel before check-in on
                    Dec 20 for a partial refund.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Learn more
                  </Button>
                </CardContent>
              </Card>

              {/* Ground Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>Ground rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>We ask every guest to remember a few simple things about what makes a great guest:</p>
                  <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
                    <li>Follow the house rules</li>
                    <li>Treat your Host's home like your own</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Terms */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="space-y-3 text-sm">
                      <p>
                        By selecting the button below, I agree to the Host's House Rules, Ground
                        rules for guests, Digital Ridr's Rebooking and Refund Policy, and that
                        Digital Ridr can charge my payment method if I'm responsible for damage.
                      </p>
                      <label className="flex items-center gap-2">
                        <Checkbox
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        />
                        <span>I agree to the Terms and Conditions</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Confirm Button */}
              <Button
                size="lg"
                className="w-full"
                onClick={handlePayment}
                disabled={!agreedToTerms}
              >
                Confirm and pay
              </Button>
            </div>

            {/* Sidebar - Booking Summary */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <Card>
                <CardContent className="p-6">
                  {/* Listing Preview */}
                  <div className="mb-6 flex gap-4">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="mb-1 font-semibold line-clamp-2">{listing.title}</h3>
                      <p className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {listing.location}
                      </p>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 fill-foreground" />
                        <span className="font-medium">{listing.rating}</span>
                        <span className="text-muted-foreground">({listing.review_count})</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Price Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Price details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="underline">
                          {formatNaira(listing.price_per_night)} × {nights} nights
                        </span>
                        <span>{formatNaira(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="underline">Service fee</span>
                        <span>{formatNaira(serviceFee)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold">
                      <span>Total (NGN)</span>
                      <span>{formatNaira(total)}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-2 rounded-lg bg-secondary p-3 text-sm">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0" />
                    <p className="text-muted-foreground">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;