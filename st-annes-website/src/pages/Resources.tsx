import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const policyLinks = [
  { label: "St Anne's Safeguarding Policy", url: "https://www.stannee4.org.uk/Forms/St%20Anne%20Parish%20Safeguarding%20Policy%202305.pdf" },
  { label: "St Anne's Data Privacy Policy", url: "https://www.stannee4.org.uk/Forms/180319DATA%20PRIVACY%20NOTICESTAnnee4.pdf" },
  { label: "St Anne's Electoral Roll Privacy Policy", url: "https://www.stannee4.org.uk/Forms/Electoral-Roll-PN-2019.pdf" },
];

const usefulLinks: { category: string; links: { label: string; url: string }[] }[] = [
  {
    category: "MMU Partners",
    links: [
      { label: "St Andrew's Walthamstow", url: "http://www.standrewswalthamstow.org.uk/" },
      { label: "St Edmund's Chingford", url: "http://www.stedmund.org.uk/" },
    ],
  },
  {
    category: "Church Sites",
    links: [
      { label: "Church of England", url: "http://www.cofe.anglican.org/" },
      { label: "Chelmsford Diocese", url: "http://www.chelmsford.anglican.org/" },
      { label: "Common Worship", url: "http://www.cofe.anglican.org/worship/liturgy/commonworship/index.html" },
      { label: "Church House Publishing", url: "http://www.chpublishing.co.uk/index2.asp" },
      { label: "The Month - Chelmsford Diocesan Magazine", url: "http://www.chelmsford.anglican.org/themonth.html" },
      { label: "Church Times", url: "http://www.churchtimes.co.uk/" },
      { label: "Church of England Newspaper", url: "http://www.churchnewspaper.com/" },
      { label: "Transforming Presence", url: "http://www.chelmsford.anglican.org/publications/transforming_presence/" },
      { label: "A Ministry Strategy", url: "http://www.transformingpresence.org.uk/content/ministry.pdf" },
      { label: "Essex Churches", url: "http://www.essexchurches.co.uk/" },
    ],
  },
  {
    category: "Mission Societies",
    links: [
      { label: "The Bible Society", url: "http://www.biblesociety.org.uk/" },
      { label: "Christian Aid", url: "http://www.christian-aid.org/" },
      { label: "One Life", url: "http://www.onelife-online.org.uk/" },
      { label: "South American Mission Society", url: "http://freespace.virgin.net/sams.gb/" },
      { label: "Charities Aid Foundation", url: "http://www.cafonline.org/" },
    ],
  },
  {
    category: "Transport",
    links: [
      { label: "Transport for London", url: "http://www.tfl.gov.uk/tfl/" },
      { label: "London Underground", url: "http://www.tfl.gov.uk/tube/" },
    ],
  },
  {
    category: "Local",
    links: [
      { label: "London Borough of Waltham Forest", url: "http://www.lbwf.gov.uk/" },
      { label: "Waltham Forest Community Credit Union", url: "http://www.wfccu.org/" },
    ],
  },
  {
    category: "Parish Forms",
    links: [
      { label: "Free Will Offering Form", url: "https://www.stannee4.org.uk/Forms/fwo.pdf" },
      { label: "Electoral Roll Membership Application", url: "https://www.stannee4.org.uk/Forms/ErolFormSG1_2006.pdf" },
      { label: "Nomination for Churchwarden", url: "https://www.stannee4.org.uk/Forms/Churchwarden.pdf" },
      { label: "Nomination for Parochial Church Council", url: "https://www.stannee4.org.uk/Forms/PCCMembers.pdf" },
      { label: "Christian Stewardship Leaflet", url: "https://www.stannee4.org.uk/Forms/ChristianStewardship.pdf" },
    ],
  },
  {
    category: "Fund Raising",
    links: [
      { label: "easyfundraising", url: "http://www.easyfundraising.org.uk/stac" },
      { label: "easysearch", url: "http://stac.easysearch.org.uk/" },
    ],
  },
];

export default function Resources() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-section_title mb-12">Resources</h1>
      <div className="space-y-8 max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Parish Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              The PCC of St Anne's follow best practice guidelines in running our church. The policies adopted with regard to Safeguarding and Data Privacy are given below.
            </p>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-link hover:underline text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Useful Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {usefulLinks.map((group) => (
                <div key={group.category}>
                  <h3 className="font-display font-semibold text-foreground mb-2">{group.category}</h3>
                  <ul className="space-y-1 text-sm">
                    {group.links.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
