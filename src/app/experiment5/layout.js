
import { Inter } from "next/font/google";
import Subnavbar from "../../components/Subnavbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const inter = Inter({ subsets: ["latin"] });

const links = [
    { label: "Aim", url: "/experiment5" },
    { label: "Theory", url: "/experiment5/theory" },
    { label: "Pretest", url: "/experiment5/pretest" },
    { label: "Procedure", url: "/experiment5/procedure" },
    { label: "Simulation", url: "/experiment5/simulation" },
    { label: "Posttest", url: "/experiment5/posttest" },
    { label: "References", url: "/experiment5/reference" },
    { label: "Feedback", url: "/experiment5/feedback" },
  
  ];
  
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <Subnavbar links={links}/>
        {children}
        <Footer />
      </body>
    </html>
  );
}