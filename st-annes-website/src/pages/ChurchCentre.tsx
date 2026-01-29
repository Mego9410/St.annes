import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const regularEvents = [
  { day: "Sunday", time: "11:15 AM", activity: "Coffee (Main Hall)" },
  { day: "Sunday", time: "12:30 PM", activity: "Simple Lunch (4th in month) (Main Hall)" },
  { day: "Monday", time: "9:00 AM", activity: "Pre-School (Small Hall)" },
  { day: "Monday", time: "10:00 AM", activity: "Line Dancing (Main Hall)" },
  { day: "Monday", time: "4:00 PM", activity: "Footsteps Dance School (Main Hall)" },
  { day: "Monday", time: "7:30 PM", activity: "Yoga (Main Hall)" },
  { day: "Tuesday", time: "9:00 AM", activity: "Pre-School (Small Hall)" },
  { day: "Tuesday", time: "9:30 AM", activity: "NHS Pulmonary Rehabilitation Service (Main Hall)" },
  { day: "Tuesday", time: "5:30 PM", activity: "Rainbows (Main Hall)" },
  { day: "Tuesday", time: "5:30 PM", activity: "Brownies (Main Hall)" },
  { day: "Tuesday", time: "6:30 PM", activity: "Weight Watchers (Small Hall)" },
  { day: "Tuesday", time: "7:30 PM", activity: "Bridge Club (Main Hall)" },
  { day: "Wednesday", time: "9:00 AM", activity: "Pre-School (Small Hall)" },
  { day: "Wednesday", time: "1:45 PM", activity: "Keep Fit (Main Hall)" },
  { day: "Thursday", time: "9:00 AM", activity: "Pre-School (Small Hall)" },
  { day: "Thursday", time: "9:30 AM", activity: "NHS Pulmonary Rehabilitation Service (Main Hall)" },
  { day: "Thursday", time: "4:00 PM", activity: "Alcoholics Anonymous (Small Hall)" },
  { day: "Thursday", time: "6:00 PM", activity: "Rainbows (Small Hall)" },
  { day: "Thursday", time: "6:15 PM", activity: "Brownies (Main Hall)" },
  { day: "Friday", time: "9:00 AM", activity: "Pre-School (Small Hall)" },
  { day: "Friday", time: "8:15 PM", activity: "Badminton (Main Hall)" },
  { day: "Saturday", time: "10:00 AM", activity: "St Anne's Church Events (1st in month) (Main Hall)" },
  { day: "Saturday", time: "5:30 PM", activity: "Karate Class (Main Hall)" },
];

export default function ChurchCentre() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-section_title mb-12">Church Centre</h1>
      <Card className="max-w-5xl">
        <CardHeader>
          <CardTitle>Regular Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Day</th>
                  <th className="text-left py-2 pr-4">Time</th>
                  <th className="text-left py-2">Activity</th>
                </tr>
              </thead>
              <tbody>
                {regularEvents.map((row, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 pr-4">{row.day}</td>
                    <td className="py-2 pr-4">{row.time}</td>
                    <td className="py-2">{row.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
