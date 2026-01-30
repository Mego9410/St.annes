import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ServicesAndEvents from "./pages/ServicesAndEvents";
import News from "./pages/News";
import Give from "./pages/Give";
import ChurchCentre from "./pages/ChurchCentre";
import Environment from "./pages/Environment";
import About from "./pages/About";
import VisitAndContact from "./pages/VisitAndContact";
import Resources from "./pages/Resources";
import BookingEnquiry from "./pages/BookingEnquiry";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services-and-events" element={<ServicesAndEvents />} />
        <Route path="news" element={<News />} />
        <Route path="give" element={<Give />} />
        <Route path="church-centre" element={<ChurchCentre />} />
        <Route path="church-centre/booking-enquiry" element={<BookingEnquiry />} />
        <Route path="environment" element={<Environment />} />
        <Route path="about" element={<About />} />
        <Route path="visit-and-contact" element={<VisitAndContact />} />
        <Route path="resources" element={<Resources />} />
      </Route>
    </Routes>
  );
}
