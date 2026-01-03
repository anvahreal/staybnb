import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  MapPin,
  Edit,
  Eye,
  Trash2,
  Plus,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock data
const mockStats = {
  totalListings: 3,
  activeBookings: 5,
  totalEarnings: 2450000,
  monthlyEarnings: 595000,
  averageRating: 4.8,
  totalReviews: 156,
  occupancyRate: 78,
  responseRate: 95,
};

const mockListings = [
  {
    id: "1",
    title: "Luxurious Waterfront Apartment in Ikoyi",
    location: "Ikoyi, Lagos",
    price: 85000,
    status: "active",
    rating: 4.9,
    reviews: 87,
    bookings: 12,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
    occupancy: 85,
  },
  {
    id: "2",
    title: "Modern Studio in Lekki Phase 1",
    location: "Lekki Phase 1, Lagos",
    price: 35000,
    status: "active",
    rating: 4.7,
    reviews: 54,
    bookings: 8,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    occupancy: 72,
  },
  {
    id: "3",
    title: "Spacious Family Home in Magodo",
    location: "Magodo GRA, Lagos",
    price: 75000,
    status: "inactive",
    rating: 4.95,
    reviews: 123,
    bookings: 15,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    occupancy: 90,
  },
];

const mockUpcomingBookings = [
  {
    id: "1",
    listingId: "1",
    listingTitle: "Luxurious Waterfront Apartment in Ikoyi",
    guestName: "Oluwaseun Ajayi",
    guestAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    checkIn: "2024-12-20",
    checkOut: "2024-12-27",
    guests: 2,
    totalPrice: 595000,
    status: "confirmed",
  },
  {
    id: "2",
    listingId: "2",
    listingTitle: "Modern Studio in Lekki Phase 1",
    guestName: "Adanna Okonkwo",
    guestAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    checkIn: "2024-12-15",
    checkOut: "2024-12-18",
    guests: 1,
    totalPrice: 105000,
    status: "pending",
  },
];

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge variant="default">Active</Badge>;
    }
    if (status === "inactive") {
      return <Badge variant="secondary">Inactive</Badge>;
    }
    if (status === "confirmed") {
      return <Badge variant="default">Confirmed</Badge>;
    }
    if (status === "pending") {
      return <Badge variant="outline">Pending</Badge>;
    }
    return <Badge>{status}</Badge>;
  };

  const handleDeleteListing = (id: string) => {
    toast.success("Listing deleted successfully");
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast.success(`Listing ${newStatus === "active" ? "activated" : "deactivated"}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container max-w-7xl">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Host Dashboard</h1>
              <p className="text-muted-foreground">Manage your properties and bookings</p>
            </div>
            <Link to="/host/create-listing">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Listing
              </Button>
            </Link>
          </div>

          {/* Mobile Tabs */}
          <div className="mb-6 lg:hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="listings">Listings</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Overview Tab */}
          {(activeTab === "overview" || window.innerWidth >= 1024) && (
            <div className="mb-8 space-y-6">
              {/* Stats Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatNaira(mockStats.totalEarnings)}</div>
                    <p className="text-xs text-muted-foreground">
                      +{formatNaira(mockStats.monthlyEarnings)} this month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.activeBookings}</div>
                    <p className="text-xs text-muted-foreground">
                      {mockStats.totalListings} active listings
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.averageRating}</div>
                    <p className="text-xs text-muted-foreground">
                      From {mockStats.totalReviews} reviews
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.occupancyRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      {mockStats.responseRate}% response rate
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Earnings Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your earnings over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center">
                      <BarChart3 className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Earnings chart will be displayed here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Recent reservations for your properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUpcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={booking.guestAvatar}
                            alt={booking.guestName}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{booking.guestName}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.listingTitle}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(booking.checkIn), "MMM d")} -{" "}
                              {format(new Date(booking.checkOut), "MMM d, yyyy")} · {booking.guests}{" "}
                              {booking.guests === 1 ? "guest" : "guests"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(booking.status)}
                          <p className="mt-1 font-semibold">{formatNaira(booking.totalPrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Listings Tab */}
          {(activeTab === "listings" || window.innerWidth >= 1024) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <p className="text-sm text-muted-foreground">
                  {mockListings.filter((l) => l.status === "active").length} active ·{" "}
                  {mockListings.filter((l) => l.status === "inactive").length} inactive
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {mockListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative h-48 sm:h-auto sm:w-48 shrink-0">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute right-2 top-2">
                          {getStatusBadge(listing.status)}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex-1">
                          <h3 className="mb-1 font-semibold line-clamp-1">{listing.title}</h3>
                          <p className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {listing.location}
                          </p>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-muted-foreground">Price/night</p>
                              <p className="font-semibold">{formatNaira(listing.price)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Rating</p>
                              <p className="font-semibold">
                                ⭐ {listing.rating} ({listing.reviews})
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Bookings</p>
                              <p className="font-semibold">{listing.bookings} total</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Occupancy</p>
                              <p className="font-semibold">{listing.occupancy}%</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                          <Link to={`/listing/${listing.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => toast.info("Edit feature coming soon")}
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(listing.id, listing.status)}
                          >
                            {listing.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteListing(listing.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {mockListings.length === 0 && (
                <Card className="p-12">
                  <div className="text-center">
                    <Home className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 font-semibold">No listings yet</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Start earning by creating your first listing!
                    </p>
                    <Link to="/host/create-listing">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Listing
                      </Button>
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {(activeTab === "bookings" || window.innerWidth >= 1024) && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">All Bookings</h2>

              <Tabs defaultValue="upcoming">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="current">Current</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="mt-6 space-y-4">
                  {mockUpcomingBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={booking.guestAvatar}
                              alt={booking.guestName}
                              className="h-14 w-14 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-semibold">{booking.guestName}</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.listingTitle}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {format(new Date(booking.checkIn), "MMM d")} -{" "}
                                {format(new Date(booking.checkOut), "MMM d, yyyy")} ·{" "}
                                {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              {getStatusBadge(booking.status)}
                              <p className="mt-1 text-lg font-bold">
                                {formatNaira(booking.totalPrice)}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toast.info("Message feature coming soon")}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="current" className="mt-6">
                  <Card className="p-12">
                    <div className="text-center">
                      <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 font-semibold">No current guests</h3>
                      <p className="text-sm text-muted-foreground">
                        You don't have any guests checking in today.
                      </p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="past" className="mt-6">
                  <Card className="p-12">
                    <div className="text-center">
                      <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 font-semibold">No past bookings</h3>
                      <p className="text-sm text-muted-foreground">
                        Your completed bookings will appear here.
                      </p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="cancelled" className="mt-6">
                  <Card className="p-12">
                    <div className="text-center">
                      <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 font-semibold">No cancelled bookings</h3>
                      <p className="text-sm text-muted-foreground">
                        Cancelled reservations will appear here.
                      </p>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HostDashboard;