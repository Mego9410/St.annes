import { Card, CardContent } from "@/components/ui/card";
import { useObserveReveal } from "@/lib/useScrollReveal";

const PHOTO_BASE = "https://www.stannee4.org.uk";

const whosWho = [
  { name: "Jude Bullock", role: "Vicar", email: "vicar@stannee4.org.uk", photo: `${PHOTO_BASE}/People/Jude.gif` },
  { name: "Mick Scotchmer", role: "Retired Priest PTO", email: "mickscotchmer@stannee4.org.uk", photo: `${PHOTO_BASE}/People/Mick2.gif` },
  { name: "Marcia Hall", role: "Churchwarden", email: "marcia.hall@stannee4.org.uk", photo: null },
  { name: "Anthony Sullivan", role: "Churchwarden", email: "anthony.sullivan@stannee4.org.uk", photo: null },
  { name: "Heather Gwynn", role: "PCC Secretary", email: "heather.gwynn@stannee4.org.uk", photo: null },
  { name: "Andy Crawford", role: "Treasurer", email: "andy.crawford@stannee4.org.uk", photo: `${PHOTO_BASE}/People/Andy.gif` },
];

function PersonCard({ person }: { person: (typeof whosWho)[0] }) {
  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <Card className="overflow-hidden border-border/80 bg-card shadow-card hover:shadow-soft transition-shadow duration-300 flex flex-row">
      <CardContent className="p-0 flex flex-row w-full">
        <div className="w-16 h-16 shrink-0 bg-muted/60 flex items-center justify-center overflow-hidden">
          {person.photo ? (
            <img
              src={person.photo}
              alt={person.name}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <span className="text-lg font-display font-semibold text-muted-foreground/70">
              {initials}
            </span>
          )}
        </div>
        <div className="pl-2 pr-3 py-2 flex flex-col justify-center min-w-0">
          <h3 className="font-display font-semibold text-foreground text-base leading-tight">{person.name}</h3>
          <p className="text-sm text-muted-foreground leading-tight">{person.role}</p>
          <a
            href={`mailto:${person.email}`}
            className="text-link text-sm mt-0.5 inline-block hover:underline truncate"
          >
            {person.email}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function About() {
  const revealRef = useObserveReveal();
  return (
    <div ref={revealRef} className="container mx-auto px-4 sm:px-6 pt-8 pb-24">
      <h1 className="text-section_title mb-6">About Us</h1>

      {/* Who's Who */}
      <section className="mb-16">
        <h2 className="text-section_header mb-2 reveal-on-scroll">Who's Who</h2>
        <p className="text-muted-foreground text-sm max-w-2xl mb-4 reveal-on-scroll">
          Meet the people who help lead and serve our church community.
        </p>
        <div className="flex flex-col gap-3 max-w-2xl">
          {whosWho.map((person, i) => (
            <div key={i} className="reveal-on-scroll stagger-child" style={{ transitionDelay: `${i * 50}ms` }}>
              <PersonCard person={person} />
            </div>
          ))}
        </div>
      </section>

      {/* St Anne – Patron Saint (mini-article) */}
      <section className="max-w-3xl reveal-on-scroll">
        <h2 className="text-section_header mb-6">St Anne – Patron Saint</h2>
        <p className="text-paragraph_large text-muted-foreground mb-8">
          Our church is dedicated to Saint Anne, the maternal grandmother of Jesus.
        </p>

        <article className="prose prose-neutral max-w-none">
          <figure className="my-10 rounded-xl overflow-hidden shadow-soft bg-muted/40">
            <img
              src="/st-anne-painting.png"
              alt="The Virgin and Child with St. Anne by Leonardo da Vinci"
              className="w-full h-auto object-cover"
            />
            <figcaption className="text-sm text-muted-foreground px-4 py-2 text-center">
              The Virgin and Child with St. Anne, Leonardo da Vinci
            </figcaption>
          </figure>

          <h3 className="font-display font-semibold text-foreground text-xl mt-10 mb-3">
            Who was Saint Anne?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Anne (Hebrew, Hannah, grace; also spelled Ann, Anne, Anna) is the traditional name of
            the mother of the Blessed Virgin Mary. All our information concerning the names and
            lives of Saints Joachim and Anne, the parents of Mary, is derived from apocryphal
            literature, the Gospel of the Nativity of Mary, the Gospel of Pseudo-Matthew and the
            Protoevangelium of James. Though the earliest form of the latter, on which directly or
            indirectly the other two seem to be based, goes back to about A.D. 150, we can hardly
            accept as beyond doubt its various statements on its sole authority.
          </p>

          <h3 className="font-display font-semibold text-foreground text-xl mt-10 mb-3">
            Tradition and devotion
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            In the Orient the Protoevangelium had great authority and portions of it were read on
            the feasts of Mary by the Greeks, Syrians, Copts, and Arabians. In the Occident,
            however, it was rejected by the Fathers of the Church until its contents were
            incorporated by Jacobus de Voragine in his &quot;Golden Legend&quot; in the thirteenth
            century. From that time on the story of St. Anne spread over the West and was amply
            developed, until St. Anne became one of the most popular saints also of the Latin
            Church.
          </p>

          <h3 className="font-display font-semibold text-foreground text-xl mt-10 mb-3">
            The story of Joachim and Hannah
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            The Protoevangelium gives the following account: In Nazareth there lived a rich and
            pious couple, Joachim and Hannah. They were childless. When on a feast day Joachim
            presented himself to offer sacrifice in the temple, he was repulsed by a certain Ruben,
            under the pretext that men without offspring were unworthy to be admitted. Whereupon
            Joachim, bowed down with grief, did not return home, but went into the mountains to
            make his plaint to God in solitude. Also Hannah, having learned the reason of the
            prolonged absence of her husband, cried to the Lord to take away from her the curse of
            sterility, promising to dedicate her child to the service of God. Their prayers were
            heard; an angel came to Hannah and said: &quot;Hannah, the Lord has looked upon thy
            tears; thou shalt conceive and give birth and the fruit of thy womb shall be blessed
            by all the world&quot;. The angel made the same promise to Joachim, who returned to
            his wife. Hannah gave birth to a daughter whom she called Miriam (Mary).
          </p>

          <h3 className="font-display font-semibold text-foreground text-xl mt-10 mb-3">
            Feast days and veneration
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            In the Orient the cult of St. Anne can be traced to the fourth century. Justinian I
            (d. 565) had a church dedicated to her. Her feast is celebrated in the East on the 25th
            day of July. The Greeks keep a collective feast of St. Joachim and St. Anne on the 9th
            of September. In the Latin Church St. Anne was not venerated, except perhaps in the
            south of France, before the thirteenth century. Her feast, under the influence of the
            &quot;Golden Legend&quot;, is first found (26 July) in the thirteenth century. It was
            introduced in England by Urban VI, 21 November, 1378, from which time it spread all
            over the Western Church. It was extended to the universal Latin Church in 1584.
          </p>

          <h3 className="font-display font-semibold text-foreground text-xl mt-10 mb-3">
            Patronage
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            St. Anne is the patroness of Brittany. Her miraculous picture (feast, 7 March) is
            venerated at Notre Dame d'Auray, Diocese of Vannes. Also in Canada, where she is the
            principal patron of the province of Quebec, the shrine of St. Anne de Beaupré is well
            known. St. Anne is patroness of women in labour; she is represented holding the Blessed
            Virgin Mary in her lap, who again carries on her arm the child Jesus. She is also
            patroness of miners, Christ being compared to gold, Mary to silver.
          </p>
        </article>
      </section>
    </div>
  );
}
