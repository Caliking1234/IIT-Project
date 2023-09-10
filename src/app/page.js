import Image from "next/image";
import Textsec1 from "../components/Textsec1";
import Textsec2 from "@/components/Textsec2";
import Textsec3 from "@/components/Textsec3";
import Textsec4 from "@/components/Textsec4";
import Textsec5 from "@/components/Textsec5";

import Experiment from "@/components/experiment";
import Sidebar from "@/components/Sidebar";
import Landingpg from "./Landingpg";
import PAM from "@/components/PAM";

export default function Home() {
  return (
    <main>
      <div>
        {/* <Landingpg /> */}
        <PAM />
      </div>
    </main>
  );
}
