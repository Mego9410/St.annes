import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const whosWho = [
  { name: "Jude Bullock", role: "Vicar", email: "vicar@stannee4.org.uk" },
  { name: "Mick Scotchmer", role: "Retired Priest PTO", email: "mickscotchmer@stannee4.org.uk" },
  { name: "Marcia Hall", role: "Churchwarden", email: "marcia.hall@stannee4.org.uk" },
  { name: "Anthony Sullivan", role: "Churchwarden", email: "anthony.sullivan@stannee4.org.uk" },
  { name: "Heather Gwynn", role: "PCC Secretary", email: "heather.gwynn@stannee4.org.uk" },
  { name: "Andy Crawford", role: "Treasurer", email: "andy.crawford@stannee4.org.uk" },
];

export default function About() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-section_title mb-12">About Us</h1>
      <div className="grid gap-8 lg:grid-cols-2 max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Who's Who</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-left py-2 pr-4">Role</th>
                  <th className="text-left py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {whosWho.map((person, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 pr-4">{person.name}</td>
                    <td className="py-2 pr-4">{person.role}</td>
                    <td className="py-2">
                      <a href={`mailto:${person.email}`} className="text-link hover:underline">{person.email}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>St Anne – Patron Saint</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed max-h-[400px] overflow-y-auto">
            <p className="mb-4">
              Anne (Hebrew, Hannah, grace; also spelled Ann, Anne, Anna) is the traditional name of the mother of the Blessed Virgin Mary. All our information concerning the names and lives of Saints Joachim and Anne, the parents of Mary, is derived from apocryphal literature, the Gospel of the Nativity of Mary, the Gospel of Pseudo-Matthew and the Protoevangelium of James.
            </p>
            <p className="mb-4">
              Though the earliest form of the latter, on which directly or indirectly the other two seem to be based, goes back to about A.D. 150, we can hardly accept as beyond doubt its various statements on its sole authority. In the Orient the Protoevangelium had great authority and portions of it were read on the feasts of Mary by the Greeks, Syrians, Copts, and Arabians. In the Occident, however, it was rejected by the Fathers of the Church until its contents were incorporated by Jacobus de Voragine in his "Golden Legend" in the thirteenth century. From that time on the story of St. Anne spread over the West and was amply developed, until St. Anne became one of the most popular saints also of the Latin Church.
            </p>
            <p>
              St. Anne is the patroness of Brittany. Her miraculous picture (feast, 7 March) is venerated at Notre Dame d'Auray, Diocese of Vannes. Also in Canada, where she is the principal patron of the province of Quebec, the shrine of St. Anne de Beaupré is well known. St. Anne is patroness of women in labour; she is represented holding the Blessed Virgin Mary in her lap, who again carries on her arm the child Jesus. She is also patroness of miners, Christ being compared to gold, Mary to silver.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
