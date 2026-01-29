import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServicesAndEvents() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-section_title mb-12">Services & Events</h1>
      <div className="grid gap-8 lg:grid-cols-2 max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Services</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Day</th>
                  <th className="text-left py-2">Time</th>
                  <th className="text-left py-2">Service</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Sunday</td>
                  <td className="py-2">10:00 AM</td>
                  <td className="py-2">Parish Eucharist</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Friday</td>
                  <td className="py-2">10:00 AM</td>
                  <td className="py-2">Holy Communion</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Events Diary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              See the <a href="https://www.stannee4.org.uk/Newssheet.php" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Weekly Newsheet</a> for current events and the full diary.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
