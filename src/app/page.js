import Image from "next/image";
import Textsec1 from "../components/Textsec1";
import Textsec2 from "@/components/Textsec2";
import Footer from "@/components/Footer";
import Textsec3 from "@/components/Textsec3";
import Textsec4 from "@/components/Textsec4";
import Textsec5 from "@/components/Textsec5";

import Experiment from "@/components/experiment";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">

    // </main>
    <main>
      <div className="bg-blue-200  h-[90px]">
        <h1 className="py-8 text-center underline underline-offset-8">hello</h1>
      </div>
      <div className="px-6 lg:px-24 py-20 bg-slate-100">
        <div className="lg:px-24">
          <Textsec1 />
          <Textsec2 />
          <Textsec3 />
          <Textsec4 />
          <Textsec5 />
        </div>
      </div>

      {/* <Experiment /> */}

      <Footer />
    </main>
  );
}
