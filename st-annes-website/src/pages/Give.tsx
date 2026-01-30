import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Give() {
  return (
    <div className="container mx-auto px-4 sm:px-6 pt-8 pb-24">
      <h1 className="text-section_title mb-12">Parish Giving</h1>
      <div className="max-w-3xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>St. Anne's Parish Giving Scheme (PGS)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              The upkeep of St. Anne's Church is dependent on the very generous and regular giving of its members. To ensure St. Anne's remains a transforming presence in Chingford Hatch for us and for the generations to come, we need to encourage more people to give regularly, which is why we are involved with the Parish Giving Scheme (PGS).
            </p>
            <p>
              The team at PGS makes it safe and easy for you to give regularly, and just as safe and easy for St. Anne's to receive all donations made. There's also an option for you to increase your gift annually to keep pace with the rising cost of living, with the peace of mind that you can adjust your donation at any time if your circumstances change. If you are a UK taxpayer you can opt to add Gift Aid, increasing the value of your donation by 25%, which PGS will collect from HMRC on our behalf.
            </p>
            <p>
              There are three easy ways to donate: set up a Direct Debit online, by telephone (0333 002 1271, Monday–Friday 9am–5pm), or fill in a gift form and post it to PGS. You will need the PGS code for St. Anne's: <strong className="text-foreground">080608169</strong>.
            </p>
            <a
              href="https://www.parishgiving.org.uk/donors/find-your-parish/chingford-st-anne-london/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-link font-medium hover:underline transition-colors"
            >
              St Anne's Parish Giving (PGS)
            </a>
            <p>
              For gift forms or questions, contact Lindsey Archer (Parish Giving Officer) at church or by email when you <Link to="/visit-and-contact" className="text-link hover:underline">contact us</Link>.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fund Raising – easyfundraising & easysearch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              <strong className="text-foreground">easyfundraising</strong> – Shop online at 2000+ stores (Amazon, Argos, M&S, Next, John Lewis, etc.) and at no extra cost to you we receive a free donation of up to 15%. Register at{" "}
              <a href="https://www.easyfundraising.org.uk/stac" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">easyfundraising.org.uk/stac</a> and select St Anne's Church – Chingford.
            </p>
            <p>
              <strong className="text-foreground">easysearch</strong> – Use easysearch instead of Google and raise funds with every search. Check out{" "}
              <a href="http://stac.easysearch.org.uk/" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">stac.easysearch.org.uk</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
