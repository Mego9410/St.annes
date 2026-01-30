import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type BookingEnquiryState = {
  bookingType: "single" | "recurring";
  dateStr: string;
  hall: "main" | "small";
  timeStr: string;
};

export default function BookingEnquiry() {
  const location = useLocation();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const booking = location.state as BookingEnquiryState | null;

  useEffect(() => {
    if (!booking?.dateStr || !booking?.timeStr) {
      navigate("/church-centre", { replace: true });
    }
  }, [booking, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!booking?.dateStr || !booking?.timeStr) {
    return null;
  }

  const hallLabel = booking.hall === "main" ? "Main Hall" : "Small Hall";
  const typeLabel = booking.bookingType === "single" ? "Single use" : "Recurring booking";

  return (
    <div className="container mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-24">
      <h1 className="text-section_title mb-4">Hall booking enquiry</h1>
      <p className="text-paragraph_large text-muted-foreground max-w-2xl mb-10">
        Enter your details below to send your hall booking request. We'll get back to you to confirm availability.
      </p>

      <div className="max-w-2xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Your booking request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium text-foreground">Type:</span> {typeLabel}</p>
            <p><span className="font-medium text-foreground">Date:</span> {booking.dateStr}</p>
            <p><span className="font-medium text-foreground">Time:</span> {booking.timeStr}</p>
            <p><span className="font-medium text-foreground">Hall:</span> {hallLabel}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Your details</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <p className="text-primary font-medium">Thank you. Your hall booking enquiry has been sent. We'll be in touch to confirm.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="booking-name">Name</Label>
                  <Input id="booking-name" name="name" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="booking-email">Email address</Label>
                  <Input id="booking-email" name="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="booking-message">Message (optional)</Label>
                  <Textarea
                    id="booking-message"
                    name="message"
                    rows={4}
                    className="mt-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any additional details or questions..."
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="submit">Send enquiry</Button>
                  <Link to="/church-centre">
                    <Button type="button" variant="outline">Back to Church Centre</Button>
                  </Link>
                </div>
              </form>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              Note: This form is a placeholder. To receive enquiries, connect it to Formspree, Netlify Forms, or a serverless function.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
