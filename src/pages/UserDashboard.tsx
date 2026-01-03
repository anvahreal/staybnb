import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, CreditCard, Heart, User, Settings, LogOut } from "lucide-react";
import { formatNaira } from "@/lib/utils";
import { format } from "date-fns";

// Mock data - replace with real data later
const mockBookings = [
  {
    id: "1",
    listing: {
      title: "Luxurious Waterfront Apartment in Ikoyi",
      location: "Ikoyi, Lagos",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
    },
    checkIn: "2024-12-20",
    checkOut: "2024-12-27",
    guests: 2,
    totalPrice: 595000,
    status: "confirmed" as const,
  },
  {
    id: "2",
    listing: {
      title: "Modern Studio in Lekki Phase 1",
      location: "Lekki, Lagos",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    },
    checkIn: "2024-11-15",
    checkOut: "2024-11-18",
    guests: 1,
    totalPrice: 105000,
    status: "completed" as const,
  },
];

const mockFavorites = [
  {
    id: "1",
    title: "Beachside Apartment in Victoria Island",
    location: "Victoria Island, Lagos",
    price: 95000,
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400",
  },
  {
    id: "2",
    title: "Cozy Apartment in Yaba",
    location: "Yaba, Lagos",
    price: 25000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
  },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("trips");

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "default",
      completed: "secondary",
      cancelled: "destructive",
      pending: "outline",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Manage your trips, favorites, and settings</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 text-center">
                    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  </div>

                  <nav className="space-y-2">
                    <Button
                      variant={activeTab === "trips" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("trips")}
                    >
                      <Calendar className="h-4 w-4" />
                      My Trips
                    </Button>
                    <Button
                      variant={activeTab === "favorites" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("favorites")}
                    >
                      <Heart className="h-4 w-4" />
                      Favorites
                    </Button>
                    <Button
                      variant={activeTab === "profile" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-destructive">
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="lg:hidden mb-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="trips">Trips</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Trips Tab */}
              {activeTab === "trips" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold">My Trips</h2>
                    <Tabs defaultValue="upcoming">
                      <TabsList>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                      </TabsList>

                      <TabsContent value="upcoming" className="mt-6 space-y-4">
                        {mockBookings
                          .filter((b) => b.status === "confirmed")
                          .map((booking) => (
                            <Card key={booking.id}>
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                  <img
                                    src={booking.listing.image}
                                    alt={booking.listing.title}
                                    className="h-48 w-full object-cover md:h-auto md:w-48"
                                  />
                                  <div className="flex flex-1 flex-col justify-between p-6">
                                    <div>
                                      <div className="mb-2 flex items-start justify-between">
                                        <h3 className="font-semibold">{booking.listing.title}</h3>
                                        {getStatusBadge(booking.status)}
                                      </div>
                                      <p className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {booking.listing.location}
                                      </p>
                                      <div className="flex flex-wrap gap-4 text-sm">
                                        <div>
                                          <p className="text-muted-foreground">Check-in</p>
                                          <p className="font-medium">
                                            {format(new Date(booking.checkIn), "MMM d, yyyy")}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">Check-out</p>
                                          <p className="font-medium">
                                            {format(new Date(booking.checkOut), "MMM d, yyyy")}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">Guests</p>
                                          <p className="font-medium">{booking.guests}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Total paid</p>
                                        <p className="text-lg font-bold">{formatNaira(booking.totalPrice)}</p>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                          Cancel
                                        </Button>
                                        <Button size="sm">View Details</Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </TabsContent>

                      <TabsContent value="past" className="mt-6 space-y-4">
                        {mockBookings
                          .filter((b) => b.status === "completed")
                          .map((booking) => (
                            <Card key={booking.id}>
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                  <img
                                    src={booking.listing.image}
                                    alt={booking.listing.title}
                                    className="h-48 w-full object-cover md:h-auto md:w-48"
                                  />
                                  <div className="flex flex-1 flex-col justify-between p-6">
                                    <div>
                                      <div className="mb-2 flex items-start justify-between">
                                        <h3 className="font-semibold">{booking.listing.title}</h3>
                                        {getStatusBadge(booking.status)}
                                      </div>
                                      <p className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {booking.listing.location}
                                      </p>
                                      <div className="flex flex-wrap gap-4 text-sm">
                                        <div>
                                          <p className="text-muted-foreground">Check-in</p>
                                          <p className="font-medium">
                                            {format(new Date(booking.checkIn), "MMM d, yyyy")}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">Check-out</p>
                                          <p className="font-medium">
                                            {format(new Date(booking.checkOut), "MMM d, yyyy")}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Total paid</p>
                                        <p className="text-lg font-bold">{formatNaira(booking.totalPrice)}</p>
                                      </div>
                                      <Button size="sm">Leave Review</Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </TabsContent>

                      <TabsContent value="cancelled" className="mt-6">
                        <div className="rounded-lg border border-dashed p-12 text-center">
                          <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                          <h3 className="mb-2 font-semibold">No cancelled trips</h3>
                          <p className="text-sm text-muted-foreground">
                            You haven't cancelled any bookings.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === "favorites" && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold">My Favorites</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {mockFavorites.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="h-48 w-full object-cover"
                        />
                        <CardContent className="p-4">
                          <h3 className="mb-1 font-semibold">{listing.title}</h3>
                          <p className="mb-2 text-sm text-muted-foreground">{listing.location}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold">{formatNaira(listing.price)}</span>
                              <span className="text-sm text-muted-foreground"> / night</span>
                            </div>
                            <Button size="sm">View</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Profile</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium">Full Name</label>
                          <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full rounded-lg border border-input bg-background px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Email</label>
                          <input
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="w-full rounded-lg border border-input bg-background px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Phone</label>
                          <input
                            type="tel"
                            defaultValue="+234 801 234 5678"
                            className="w-full rounded-lg border border-input bg-background px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Location</label>
                          <input
                            type="text"
                            defaultValue="Lagos, Nigeria"
                            className="w-full rounded-lg border border-input bg-background px-3 py-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">Bio</label>
                        <textarea
                          rows={4}
                          defaultValue="Traveler and explorer"
                          className="w-full rounded-lg border border-input bg-background px-3 py-2"
                        />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Settings</h2>

                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Manage your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { label: "Email notifications", description: "Receive booking updates via email" },
                        { label: "SMS notifications", description: "Get text messages for important updates" },
                        { label: "Marketing emails", description: "Receive newsletters and promotions" },
                        { label: "Push notifications", description: "Get push notifications on your device" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Toggle
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy & Security</CardTitle>
                      <CardDescription>Manage your privacy settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Two-Factor Authentication
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-destructive">
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;