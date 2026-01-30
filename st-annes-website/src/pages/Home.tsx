import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useObserveReveal } from "@/lib/useScrollReveal";
import upcomingEvents from "@/data/events.json";

const EVENTS_DIARY_URL = "https://www.stannee4.org.uk/events.php";
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Parse "3rd February" style string to Date (year from today, or next year if month has passed). */
function parseEventDate(dateStr: string): Date | null {
  const match = dateStr.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+(\w+)$/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const monthIndex = MONTH_NAMES.findIndex((m) => m.toLowerCase().startsWith(match[2].toLowerCase()));
  if (monthIndex === -1) return null;
  const today = new Date();
  let year = today.getFullYear();
  const d = new Date(year, monthIndex, day);
  if (d < today) d.setFullYear(year + 1);
  return d;
}

/** Events within the next 2 months from today. */
function eventsNextTwoMonths(events: typeof upcomingEvents): typeof upcomingEvents {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(today);
  end.setMonth(end.getMonth() + 2);
  return events.filter((e) => {
    const d = parseEventDate(e.date);
    return d && d >= today && d <= end;
  });
}

const WELCOME_LEAFLET_URL = "https://www.stannee4.org.uk/Forms/Welcome%20to%20St%20Annes.pdf";
const SAFEGUARDING_POLICY_URL = "https://www.stannee4.org.uk/Forms/St%20Anne%20Parish%20Safeguarding%20Policy%202305.pdf";
const DIOCESAN_SAFEGUARDING = "https://www.chelmsford.anglican.org/safeguarding";
const DIOCESAN_CONTACTS = "https://www.chelmsford.anglican.org/safeguarding/safeguarding-contacts";
/** Direct link to the most recent weekly newsheet PDF. Update when a new issue is published (see https://www.stannee4.org.uk/Newssheet.php). */
const NEWEST_NEWSLETTER_URL = "https://www.stannee4.org.uk/Newssheet/2026%2002%2001%20news.pdf";

const nextSteps = [
  { title: "Events", copy: "Services, gatherings, and what's on at St. Anne's.", to: "/services-and-events", icon: Calendar, iconClass: "bg-primary/10 text-primary", featured: true },
  { title: "Join us Sunday", copy: "Weekly and special services.", to: "/services-and-events", icon: Calendar, iconClass: "bg-secondary text-foreground" },
  { title: "Book an event", copy: "Hire our hall for your celebration or community group.", to: "/church-centre", icon: Calendar, iconClass: "bg-muted text-muted-foreground" },
];

export default function Home() {
  const containerRef = useObserveReveal();
  const eventsToShow = useMemo(() => eventsNextTwoMonths(upcomingEvents), []);

  return (
    <div ref={containerRef}>
      {/* Wrapper: hero + Take your next step — watercolour 0.9×, shifted left; text left edge on centre line */}
      <div className="relative overflow-hidden bg-background">
        <div
          className="hero-bg absolute top-0 left-0 z-0 h-[864px] w-full bg-contain bg-no-repeat md:h-[936px] lg:h-[1008px]"
          style={{ backgroundImage: "url(/hero-bg-watercolour.png)" }}
          aria-hidden
        />

        <section className="relative z-10 overflow-hidden">
          <div className="container relative mx-auto flex min-h-[320px] max-w-6xl flex-col items-center px-4 pt-[29vh] pb-6 sm:px-6 sm:pt-[25vh] md:min-h-[360px] md:pt-10 md:pb-8 lg:flex-row lg:pb-10 lg:items-center lg:justify-start lg:px-8 lg:pt-12 lg:pb-20">
            <div className="hidden shrink-0 lg:block lg:w-[55%]" aria-hidden />
            <div className="mt-0 flex w-full max-w-lg flex-col justify-center rounded-2xl border border-white/30 bg-white/55 p-5 shadow-lg backdrop-blur-[6px] md:mt-8 md:p-6 lg:mt-12 lg:w-[45%] lg:min-w-0 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                St. Anne's, Chingford
              </p>
              <div className="mt-3 h-px w-12 bg-primary/40" aria-hidden />
              <h1 className="mt-6 text-hero text-foreground">
                There's a place for you here
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                A warm community in Chingford—explore faith, meet people, and figure it out at your own pace.
              </p>
              <div className="mt-10">
                <Link to="/services-and-events">
                  <Button variant="default" size="lg" className="text-base px-10 font-semibold shadow-soft">
                    Start here
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal-on-scroll relative z-10">
          <div className="container mx-auto max-w-6xl px-4 pt-8 pb-28 sm:px-6 lg:px-8 lg:pt-12 lg:pb-28">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto stagger-children">
          {nextSteps.map((step, i) => {
            const Icon = step.icon;
            const featured = (step as { featured?: boolean }).featured === true;
            return (
              <Link
                key={`${step.title}-${i}`}
                to={step.to}
                className={`group block h-full stagger-child ${featured ? "sm:col-span-2 lg:col-span-1" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <Card className={`h-full transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 p-6 ${featured ? "border-primary/25 bg-white" : ""}`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${step.iconClass}`} aria-hidden>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{step.copy}</p>
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
          <p className="mt-8 text-center text-sm text-muted-foreground">
            You can also <Link to="/give" className="text-primary font-medium hover:underline">support St. Anne's</Link> with Parish Giving or easyfundraising.
          </p>
        </div>
        </section>
      </div>

      {/* New to St. Anne's? — almost full-width rounded container, warm overlay, scroll reveal */}
      <section className="reveal-on-scroll px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-8 lg:pb-16">
        <div className="relative mx-auto min-h-[400px] w-full max-w-[1536px] overflow-hidden rounded-3xl">
          <img
            src="/new-to-st-annes.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-100 blur-[4px]"
            aria-hidden
          />
          <div className="container relative z-10 mx-auto flex min-h-[400px] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
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
                <Link to="/services-and-events">
                  <Button variant="outline-inverse" size="lg" className="text-base px-8 font-semibold">
                    Start here
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story — scroll reveal, image only */}
      <section className="reveal-on-scroll bg-background">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div>
            <img
              src="/our-story-church.png"
              alt="St. Anne's Church"
              className="block w-full max-w-full object-contain"
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
                <Button variant="default" size="lg" className="text-base px-8 font-semibold">
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

      {/* Experience St. Anne's — same background as New to St. Anne's (rounded container, image) */}
      <section className="reveal-on-scroll px-4 pt-12 pb-24 sm:px-6 lg:px-8 lg:pt-16">
        <div className="relative mx-auto min-h-[400px] w-full max-w-[1536px] overflow-hidden rounded-3xl">
          <img
            src="https://www.stannee4.org.uk/images/IMG_5545.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-[4px]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[hsl(24_14%_14%_/_.6)]" aria-hidden />
          <div className="container relative z-10 mx-auto flex min-h-[400px] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-section_title text-white">Experience St. Anne's for yourself</h2>
              <p className="mt-6 text-paragraph_large text-white/95">
                See what a Sunday looks like—no pressure, just come as you are.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/services-and-events">
                  <Button variant="default" size="lg" className="text-base px-8">
                    Events calendar
                  </Button>
                </Link>
                <Link to="/news">
                  <Button variant="primary-inverse" size="lg" className="text-base px-8 text-foreground">
                    News
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Noticeboard — varied card styles (warm tint, default, border accent) */}
      <section className="reveal-on-scroll border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-section_header text-center mb-12">Noticeboard</h2>

          {/* Dates for your diary — next 2 months, from stannee4.org.uk/events.php */}
          <div className="max-w-5xl mx-auto mb-10">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Dates for your diary</h3>
            <p className="text-center text-sm text-muted-foreground mb-6">Next 2 months · click an event for full details</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {eventsToShow.map(({ date, title }) => (
                <li key={`${date}-${title}`}>
                  <a
                    href={EVENTS_DIARY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-3 px-3 rounded-md text-sm text-foreground hover:bg-muted/60 hover:text-primary transition-colors group min-h-[44px] md:py-2 md:min-h-0 md:items-baseline"
                  >
                    <span className="shrink-0 font-medium tabular-nums text-muted-foreground group-hover:text-primary">{date}</span>
                    <span className="min-w-0">{title}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-6">
              <Link to="/services-and-events">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white border-0">Services & events</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <Card className="border-l-4 border-l-primary bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Newsheet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For the latest news from St Anne's please see the weekly newsheet.
                </p>
                <a href={NEWEST_NEWSLETTER_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">View latest newsheet</Button>
                </a>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-secondary">
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

      {/* Safeguarding — scroll reveal */}
      <section className="reveal-on-scroll container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-section_header mb-4">Safeguarding Information</h2>
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
