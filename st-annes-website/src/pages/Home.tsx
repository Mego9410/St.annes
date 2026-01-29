import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { MapPin, Calendar, MessageCircle, Heart } from "lucide-react";
import { useObserveReveal } from "@/lib/useScrollReveal";

const WELCOME_LEAFLET_URL = "https://www.stannee4.org.uk/Forms/Welcome%20to%20St%20Annes.pdf";
const ORDER_SERVICE_URL = "https://www.stannee4.org.uk/OrderService/litbook%20Ordinary%202.pdf";
const SAFEGUARDING_POLICY_URL = "https://www.stannee4.org.uk/Forms/St%20Anne%20Parish%20Safeguarding%20Policy%202305.pdf";
const DIOCESAN_SAFEGUARDING = "https://www.chelmsford.anglican.org/safeguarding";
const DIOCESAN_CONTACTS = "https://www.chelmsford.anglican.org/safeguarding/safeguarding-contacts";

const LOCATION_OPTIONS = [{ value: "st-annes-chingford", label: "St. Anne's Church, Chingford" }];

const nextSteps = [
  { title: "Start here", copy: "Find us, see services, get directions.", to: "/visit-and-contact", icon: MapPin, iconClass: "bg-amber-100 text-amber-700" },
  { title: "Join us Sunday", copy: "Weekly and special services.", to: "/services-and-events", icon: Calendar, iconClass: "bg-emerald-100 text-emerald-700" },
  { title: "Get in touch", copy: "Drop us a message—we’d love to hear from you.", to: "/visit-and-contact", icon: MessageCircle, iconClass: "bg-slate-100 text-slate-600" },
  { title: "Give", copy: "Support St. Anne's with Parish Giving or easyfundraising.", to: "/give", icon: Heart, iconClass: "bg-amber-100 text-amber-700" },
];

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useObserveReveal();

  return (
    <div ref={containerRef}>
      {/* Hero: warm background, grain, text overlaps image on lg for asymmetry */}
      <section className="relative bg-background pt-4 pb-6 md:pt-5 md:pb-8 overflow-hidden grain-overlay">
        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid min-h-[300px] grid-cols-1 gap-6 lg:min-h-[50vh] lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative order-2 lg:order-1 grid min-h-[280px] min-w-0 place-items-center lg:min-h-0 lg:h-full lg:-mr-8">
              <img
                src="/hero-watercolour.png"
                alt="St. Anne's Church, Chingford — watercolour"
                className="h-full max-h-[50vh] w-full max-w-full object-contain object-center drop-shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2 flex flex-col justify-center px-0 py-6 lg:px-4 lg:py-8 lg:pl-0 lg:z-10">
              <h1 className="text-hero text-foreground animate-[fade-in-up_0.6s_ease-out]">
                There's a place for you here
              </h1>
              <p className="mt-5 max-w-xl text-paragraph_large text-muted-foreground animate-[fade-in-up_0.6s_ease-out_0.1s_both]">
                A warm community in Chingford—explore faith, meet people, and figure it out at your own pace.
              </p>
              <div className="mt-8 space-y-4 animate-[fade-in-up_0.6s_ease-out_0.2s_both]">
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
              <div className="mt-6">
                <Link to="/visit-and-contact">
                  <Button variant="warm" size="lg" className="text-base px-8 font-semibold">
                    Start here
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Take your next step — scroll reveal + staggered cards, stronger hover */}
      <section className="reveal-on-scroll container mx-auto max-w-6xl px-4 pt-6 pb-24 sm:px-6 lg:px-8">
        <h2 className="text-section_title text-center mb-14">Take your next step</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto stagger-children">
          {nextSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Link
                key={step.to}
                to={step.to}
                className="group block h-full stagger-child"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${step.iconClass}`} aria-hidden>
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

      {/* New to St. Anne's? — dark full-bleed, scroll reveal, punchier copy */}
      <section className="reveal-on-scroll relative min-h-[400px] overflow-hidden py-24">
        <img
          src="https://www.stannee4.org.uk/images/IMG_5545.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden />
        <div className="container relative mx-auto flex flex-col items-center justify-center px-4 text-center z-10">
          <div className="max-w-2xl">
            <h2 className="text-section_title text-white">New to St. Anne's?</h2>
            <p className="mt-6 text-paragraph_large text-white/95">
              Safe space to explore, ask questions, and connect. Wherever you're at—you're welcome.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/about">
                <Button variant="primary-inverse" size="lg" className="text-base px-8 font-semibold">
                  Learn more about us
                </Button>
              </Link>
              <Link to="/visit-and-contact">
                <Button variant="outline-inverse" size="lg" className="text-base px-8 font-semibold">
                  Start here
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story — scroll reveal, slightly tighter copy */}
      <section className="reveal-on-scroll bg-background">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <img
              src="https://www.stannee4.org.uk/images/IMG_5545.jpg"
              alt="St. Anne's Church community"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-section_title mb-6">Our Story</h2>
            <p className="text-paragraph_large text-muted-foreground">
              We're a warm, friendly community where everyone—including you—is welcome.
              We try to live out God's love in word, worship, service, and joy; we value diversity and equality,
              and we care for each other and for the planet.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/about">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-base px-8 font-semibold">
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

      {/* Experience St. Anne's — full-bleed, scroll reveal, punchier line */}
      <section className="reveal-on-scroll relative min-h-[420px] overflow-hidden py-24">
        <img
          src="https://www.stannee4.org.uk/images/IMG_5545.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-slate-800/55" aria-hidden />
        <div className="container relative mx-auto flex flex-col items-center justify-center px-4 text-center z-10">
          <div className="max-w-2xl">
            <h2 className="text-section_title text-white">Experience St. Anne's for yourself</h2>
            <p className="mt-4 text-paragraph_large text-white/95">
              See what a Sunday looks like—no pressure, just come as you are.
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

      {/* Noticeboard — scroll reveal */}
      <section className="reveal-on-scroll border-t border-border bg-muted/20 py-24">
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

      {/* Orders of Service & Safeguarding — scroll reveal */}
      <section className="reveal-on-scroll container mx-auto px-4 py-24">
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
    </div>
  );
}
