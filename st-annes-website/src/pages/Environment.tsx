import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Environment() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-section_title mb-12">St. Anne's and the Environment</h1>
      <div className="max-w-3xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Eco Church & Creation Care</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              For many years St Anne's has taken its responsibility to care for the environment seriously. In conjunction with our MMU partners we are now setting out to approach this in a methodical and measured way by participating in the Eco Church project. Details can be found at{" "}
              <a href="https://ecochurch.arocha.org.uk/" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">ecochurch.arocha.org.uk</a>.
            </p>
            <p>
              A similar approach for individual households is provided by the Creation Care project:{" "}
              <a href="https://creationcare.org.uk/" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">creationcare.org.uk</a>.
            </p>
            <p>
              Produced by the Diocesan Environmental Group, a booklet looking at ways churches can work towards net-zero:{" "}
              <a href="https://www.stannee4.org.uk/Leaflets/NZC%20five-marks-mission.pdf" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">The Fifth Mark of Mission</a> (PDF). Further thoughts on the Chelmsford Diocesan website:{" "}
              <a href="https://www.chelmsford.anglican.org/faith-in-action/environment" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Faith in Action – Environment</a>.
            </p>
            <p>
              Suggestions for ways to care for the environment:{" "}
              <a href="https://greenchristian.org.uk/" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Green Christian</a>.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resources (PDFs)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <a href="https://www.stannee4.org.uk/Leaflets/nine-ways.pdf" target="_blank" rel="noopener noreferrer" className="block text-link hover:underline">Nine ways of living gently on earth</a>
            <a href="https://www.stannee4.org.uk/Leaflets/UseYourLoaf.pdf" target="_blank" rel="noopener noreferrer" className="block text-link hover:underline">Use your LOAF leaflet</a>
            <a href="https://www.stannee4.org.uk/Leaflets/biodiversity.pdf" target="_blank" rel="noopener noreferrer" className="block text-link hover:underline">Biodiversity Leaflet</a>
            <a href="https://www.stannee4.org.uk/Leaflets/G.C.-7-Rs-Leaflet.pdf" target="_blank" rel="noopener noreferrer" className="block text-link hover:underline">7Rs Leaflet</a>
            <a href="https://www.stannee4.org.uk/Leaflets/It-is-possible.pdf" target="_blank" rel="noopener noreferrer" className="block text-link hover:underline">It is possible… To live differently</a>
            <a href="https://www.stannee4.org.uk/Leaflets/Lifestyle%20Leaflet.pdf" target="_blank" rel="noopener noreferrer" className="block text-link hover:underline">Ways in which we can make a difference</a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Environmental Challenges</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <p>
              A series of articles by Jenny Miller, first published in the Hatch Herald from May 2003 to April 2004. Many of the suggestions are as relevant now as they were then.
            </p>
            <a href="https://www.stannee4.org.uk/EnvironmentalChallege.php" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-link hover:underline">
              Read Environmental Challenges on stannee4.org.uk
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
