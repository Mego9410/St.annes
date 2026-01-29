import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function VisitAndContact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-section_title mb-12">Visit & Contact</h1>
      <div className="grid gap-8 lg:grid-cols-2 max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-sm">
            <p className="font-medium text-foreground">St. Anne's Church, Chingford</p>
            <p>200a Larkshall Road<br />Chingford E4 6NP</p>
            <p><strong className="text-foreground">Buses:</strong> 212, W16</p>
            <p><strong className="text-foreground">Train:</strong> Highams Park</p>
            <p><strong className="text-foreground">Grid Ref:</strong> TQ 386 928</p>
            <a
              href="https://www.google.com/maps/search/200a+Larkshall+Road+Chingford+E4+6NP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-link hover:underline"
            >
              View location map
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions or comments about this website, or require further information about St. Anne's, please use the form below to send us a message.
            </p>
            {submitted ? (
              <p className="text-sm text-primary font-medium">Thank you. Your message has been sent.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required rows={4} className="mt-1" />
                </div>
                <Button type="submit">Send message</Button>
              </form>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              Note: This form is a placeholder. To receive messages, connect it to Formspree, Netlify Forms, or a serverless function.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
