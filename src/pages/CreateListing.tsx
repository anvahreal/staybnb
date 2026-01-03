import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload, X, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { amenitiesList } from "@/data/mockListings";

const STEPS = [
  { id: 1, title: "Property Details", description: "Tell us about your place" },
  { id: 2, title: "Location", description: "Where is it located?" },
  { id: 3, title: "Amenities", description: "What does it offer?" },
  { id: 4, title: "Photos", description: "Show off your space" },
  { id: 5, title: "Pricing", description: "Set your price" },
];

const CreateListing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Property Details
    title: "",
    description: "",
    propertyType: "",
    maxGuests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    
    // Step 2: Location
    city: "Lagos",
    location: "",
    address: "",
    
    // Step 3: Amenities
    amenities: [] as string[],
    
    // Step 4: Photos
    images: [] as string[],
    
    // Step 5: Pricing
    pricePerNight: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success("Listing created successfully!");
    setTimeout(() => {
      navigate("/host/dashboard");
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
    
    // Create preview URLs
    const newImages = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...newImages] });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setUploadedFiles(newFiles);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: newAmenities });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container max-w-4xl">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Create a Listing</h1>
                <p className="text-muted-foreground">
                  Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
                </p>
              </div>
              <Button variant="ghost" onClick={() => navigate("/host/dashboard")}>
                Save & Exit
              </Button>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
              <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Property Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Listing Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Cozy Studio in Lekki"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your place, what makes it special, nearby attractions..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.description.length}/500 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxGuests">Max Guests</Label>
                      <Input
                        id="maxGuests"
                        type="number"
                        min="1"
                        value={formData.maxGuests}
                        onChange={(e) =>
                          setFormData({ ...formData, maxGuests: parseInt(e.target.value) || 1 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        min="0"
                        value={formData.bedrooms}
                        onChange={(e) =>
                          setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="beds">Beds</Label>
                      <Input
                        id="beds"
                        type="number"
                        min="1"
                        value={formData.beds}
                        onChange={(e) =>
                          setFormData({ ...formData, beds: parseInt(e.target.value) || 1 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        min="1"
                        step="0.5"
                        value={formData.bathrooms}
                        onChange={(e) =>
                          setFormData({ ...formData, bathrooms: parseFloat(e.target.value) || 1 })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => setFormData({ ...formData, city: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lagos">Lagos</SelectItem>
                        <SelectItem value="Abuja">Abuja</SelectItem>
                        <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                        <SelectItem value="Ibadan">Ibadan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Neighborhood/Area *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Lekki Phase 1, Ikoyi, Victoria Island"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Street address, building name, etc."
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Your exact address will only be shared with confirmed guests
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Amenities */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Select all amenities that apply to your property
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {amenitiesList.map((amenity) => (
                      <label
                        key={amenity}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-secondary"
                      >
                        <Checkbox
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Selected: {formData.amenities.length} amenities
                  </p>
                </div>
              )}

              {/* Step 4: Photos */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label>Property Photos *</Label>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Upload at least 5 high-quality photos. The first photo will be the cover image.
                    </p>

                    {/* Upload Area */}
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors hover:bg-secondary">
                      <Upload className="mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="mb-1 font-medium">Click to upload photos</p>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG or WebP (Max 5MB each)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>

                  {/* Preview Grid */}
                  {formData.images.length > 0 && (
                    <div>
                      <p className="mb-3 text-sm font-medium">
                        Uploaded Photos ({formData.images.length})
                      </p>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
                            <img
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            {index === 0 && (
                              <div className="absolute left-2 top-2 rounded bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                                Cover
                              </div>
                            )}
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Pricing */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="pricePerNight">Price Per Night (₦) *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₦
                      </span>
                      <Input
                        id="pricePerNight"
                        type="number"
                        min="1000"
                        step="1000"
                        placeholder="25000"
                        className="pl-8"
                        value={formData.pricePerNight}
                        onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Set a competitive price based on your property's features and location
                    </p>
                  </div>

                  {formData.pricePerNight && (
                    <Card className="bg-secondary">
                      <CardHeader>
                        <CardTitle className="text-base">Earnings Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Guest pays per night</span>
                          <span className="font-semibold">
                            ₦{parseInt(formData.pricePerNight).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service fee (12%)</span>
                          <span className="text-destructive">
                            -₦{Math.round(parseInt(formData.pricePerNight) * 0.12).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-semibold">
                          <span>You earn</span>
                          <span className="text-primary">
                            ₦
                            {Math.round(parseInt(formData.pricePerNight) * 0.88).toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h4 className="mb-2 font-semibold">Pricing Tips</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Similar listings in your area charge ₦20,000 - ₦50,000/night</li>
                      <li>• You can adjust your price anytime</li>
                      <li>• Consider offering weekly/monthly discounts later</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            {currentStep < STEPS.length ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2">
                Publish Listing
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateListing;