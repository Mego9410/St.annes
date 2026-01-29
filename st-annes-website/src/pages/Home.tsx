import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { MapPin, Calendar, MessageCircle, Heart } from "lucide-react";

const WELCOME_LEAFLET_URL = "https://www.stannee4.org.uk/Forms/Welcome%20to%20St%20Annes.pdf";
const ORDER_SERVICE_URL = "https://www.stannee4.org.uk/OrderService/litbook%20Ordinary%202.pdf";
const SAFEGUARDING_POLICY_URL = "https://www.stannee4.org.uk/Forms/St%20Anne%20Parish%20Safeguarding%20Policy%202305.pdf";
const DIOCESAN_SAFEGUARDING = "https://www.chelmsford.anglican.org/safeguarding";
const DIOCESAN_CONTACTS = "https://www.chelmsford.anglican.org/safeguarding/safeguarding-contacts";

const LOCATION_OPTIONS = [{ value: "st-annes-chingford", label: "St. Anne's Church, Chingford" }];

const nextSteps = [
  { title: "Plan your visit", copy: "Find us, see our services, and get directions.", to: "/visit-and-contact", icon: MapPin, iconClass: "bg-amber-100 text-amber-700" },
  { title: "Join us Sunday", copy: "See our weekly and special services.", to: "/services-and-events", icon: Calendar, iconClass: "bg-emerald-100 text-emerald-700" },
  { title: "Get in touch", copy: "Send a message or ask a question.", to: "/visit-and-contact", icon: MessageCircle, iconClass: "bg-slate-100 text-slate-600" },
  { title: "Give", copy: "Support St. Anne's through Parish Giving or easyfundraising.", to: "/give", icon: Heart, iconClass: "bg-amber-100 text-amber-700" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero: condensed vertically, closer to top */}
      <section className="bg-background pt-4 pb-6 md:pt-5 md:pb-8">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[300px] grid-cols-1 gap-6 lg:min-h-[50vh] lg:grid-cols-2 lg:gap-10 lg:items-stretch">
            <div className="relative grid min-h-[280px] min-w-0 place-items-center bg-background lg:min-h-0 lg:h-full">
              <img
                src="/hero-watercolour.png"
                alt="St. Anne's Church, Chingford — watercolour"
                className="h-full max-h-[50vh] w-full max-w-full object-contain object-center"
              />
            </div>
            <div className="flex flex-col justify-center px-0 py-6 lg:px-4 lg:py-8">
              <h1 className="text-hero text-foreground animate-[fade-in-up_0.6s_ease-out]">
                There's a place for you here
              </h1>
              <p className="mt-6 max-w-xl text-paragraph_large text-muted-foreground animate-[fade-in-up_0.6s_ease-out_0.1s_both]">
                A warm, caring community in Chingford where you can explore faith and connect with others.
              </p>
              <div className="mt-10 space-y-4 animate-[fade-in-up_0.6s_ease-out_0.2s_both]">
                <Link
                  to="/visit-and-contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-link underline underline-offset-4 hover:no-underline"
                >
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                  Find your closest location
                </Link>
                <Select
                  options={LOCATION_OPTIONS}
                  placeholder="Choose a Location"
                  className="max-w-sm"
                  defaultValue="st-annes-chingford"
                  onValueChange={(value) => value && navigate("/visit-and-contact")}
                  aria-label="Choose a location"
                />
              </div>
              <div className="mt-8">
                <Link to="/visit-and-contact">
                  <Button size="lg" className="text-base px-8">
                    Plan your visit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Take your next step — icon-driven cards (Life.Church style) */}
      <section className="container mx-auto max-w-6xl px-4 pt-6 pb-24 sm:px-6 lg:px-8">
        <h2 className="text-section_title text-center mb-14">Take your next step</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {nextSteps.map((step) => {
            const Icon = step.icon;
            return (
              <Link key={step.to} to={step.to} className="group block h-full">
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${step.iconClass}`} aria-hidden>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{step.copy}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Go <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* New to St. Anne's? — dark full-bleed with dual CTAs (Life.Church style) */}
      <section className="relative min-h-[400px] overflow-hidden py-24">
        <img
          src="https://www.stannee4.org.uk/images/IMG_5545.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden />
        <div className="container relative mx-auto flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-2xl">
            <h2 className="text-section_title text-white">New to St. Anne's?</h2>
            <p className="mt-6 text-paragraph_large text-white/95">
              You'll find a safe place to explore your beliefs and connect with others. Wherever you are in life, you're welcome here.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/about">
                <Button variant="primary-inverse" size="lg" className="text-base px-8">
                  Learn more about us
                </Button>
              </Link>
              <Link to="/visit-and-contact">
                <Button variant="outline-inverse" size="lg" className="text-base px-8">
                  Plan your visit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Vision — two-column: media left, text + CTA right (Life.Church style) */}
      <section className="bg-background">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
            <img
              src="https://www.stannee4.org.uk/images/IMG_5545.jpg"
              alt="St. Anne's Church community"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-section_title mb-6">Our Story</h2>
            <p className="text-paragraph_large text-muted-foreground">
              St. Anne's Church Vision is of a warm, friendly, caring community, where all, including you, are welcome.
              We are committed to living out the love of God, revealed in Jesus Christ, in word, worship, service and joy.
              We celebrate human diversity and actively promote equality and acceptance.
              We aspire to respond to the needs of others and to be faithful stewards of God's creation, our mother earth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/about">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-base px-8">
                  Our beliefs
                </Button>
              </Link>
              <a href={WELCOME_LEAFLET_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-base px-8">
                  Download Welcome Leaflet
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience St. Anne's for yourself — full-bleed with overlay and location (Life.Church style) */}
      <section className="relative min-h-[420px] overflow-hidden py-24">
        <img
          src="https://www.stannee4.org.uk/images/IMG_5545.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-slate-800/55" aria-hidden />
        <div className="container relative mx-auto flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-2xl animate-[fade-in-up_0.6s_ease-out]">
            <h2 className="text-section_title text-white">Experience St. Anne's for yourself</h2>
            <p className="mt-4 text-paragraph_large text-white/95">
              Find out what you can expect when you attend at St. Anne's.
            </p>
            <div className="mt-10 space-y-4">
              <Link
                to="/visit-and-contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4 hover:no-underline"
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                Find your closest location
              </Link>
              <div className="flex justify-center">
                <div className="w-full max-w-sm [&_select]:border-white/80 [&_select]:bg-white/10 [&_select]:text-white [&_option]:bg-foreground [&_option]:text-background">
                  <Select
                    options={LOCATION_OPTIONS}
                    placeholder="Choose a Location"
                    defaultValue="st-annes-chingford"
                    onValueChange={(value) => value && navigate("/visit-and-contact")}
                    aria-label="Choose a location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Noticeboard */}
      <section className="border-t border-border bg-muted/20 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-section_header text-center mb-12">Noticeboard</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Newsheet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For the latest news from St Anne's please see the weekly newsheet.
                </p>
                <Link to="/news"><Button size="sm">View Newsheet</Button></Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">easyfundraising</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Shop online and raise funds for St. Anne's at no extra cost to you.
                </p>
                <a href="https://www.easyfundraising.org.uk/causes/stac/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">St Anne's at easyfundraising</Button>
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">easysearch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Search the web and raise funds for St. Anne's with every search.
                </p>
                <a href="http://stac.easysearch.org.uk/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">Use easysearch</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Orders of Service & Safeguarding */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-section_header mb-4">Orders of Service</h2>
          <p className="text-muted-foreground mb-8">
            <a href={ORDER_SERVICE_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-medium underline hover:no-underline">
              Ordinary Time 2
            </a>
          </p>

          <h2 className="text-section_header mt-16 mb-4">Safeguarding Information</h2>
          <p className="text-paragraph_large text-muted-foreground">
            We are committed to Safeguarding Children, Young People, Vulnerable Adults, and Victims of Domestic Abuse.
            The PCC has adopted the Church of England's policies and best practice on safeguarding which may be found on the Church of England's website.
            Our Parish Safeguarding Officer is Lindsey Archer, who may be contacted at church or by email (safeguarding@stannee4.org.uk).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={SAFEGUARDING_POLICY_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">Parish Safeguarding Policy</Button>
            </a>
            <a href={DIOCESAN_SAFEGUARDING} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">Diocesan Safeguarding Information</Button>
            </a>
            <a href={DIOCESAN_CONTACTS} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">Diocesan Safeguarding Contacts</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
