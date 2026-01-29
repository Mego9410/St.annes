import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function News() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-section_title mb-12">News</h1>
      <div className="grid gap-8 lg:grid-cols-2 max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Newsheet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              The Weekly Newssheet gives details of worship and current events at St. Anne's. Links to recent newsheets are on the church website.
            </p>
            <a
              href="https://www.stannee4.org.uk/Newssheet.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:underline text-sm"
            >
              View all newsheets on stannee4.org.uk
            </a>
            <p className="mt-4 text-xs text-muted-foreground">To view PDFs you will need Acrobat Reader installed.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>St Anne's Record / Hatch Herald</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              The Hatch Herald was the parish magazine; it has been superseded by St Anne's Record, a bi-monthly newssheet. Past issues are available in PDF format on the church website.
            </p>
            <a
              href="https://www.stannee4.org.uk/HHerald.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:underline text-sm"
            >
              View Hatch Herald & Record on stannee4.org.uk
            </a>
            <p className="mt-4 text-xs text-muted-foreground">To view PDFs you will need Acrobat Reader installed.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
