import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className="p-4 lg:p-8 lg:w-[70%] mx-auto">
        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Amplitude Shift Keying (ASK)
        </h1>
        <p className="pb-6">
          In this modulation, binary 1 is represented by the presence of a
          carrier and binary 0 by the absence of a carrier.
        </p>

        <p className="pb-6 font-bold">ASK Transmitter:</p>
        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div> */}

        <p>
          Here, the electrical signal representation technique is ON-OFF coding.
          In which
        </p>
        <p>1 = +ve</p>
        <p className="pb-6">0 = 0 V</p>

        <p className="pb-6 font-bold">ASK Receiver:</p>

        <p>For the demodulation of ASK, a soft detector (SD) will be used</p>
        <p>1 = Ac2 cos22Пfct </p>
        <p>0 = 0 </p>
        <p>1 = (Ac)2/2</p>
        <p>0 = 0 V</p>

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div> */}

        <p>
          Since the soft detector is used, we have to observe whether either one
          occurs or not.
        </p>

        <p className="pb-6 font-bold">a. Constellation Diagram</p>
        <p className="pb-6 font-bold">Energy per bit (Eb):</p>

        <p>
          We know that all periodic signals are power signals. Now we’ll find
          the energy of ASK for the transmission of binary ‘1’.{" "}
        </p>

        <p className="pb-6">
          Eb = ∫_0^Tb▒(Ac.cos2П.fc.t)^2 dt <br />
          = ∫_0^Tb▒(〖Ac)〗^2.(cos2П.fc.t)^2 dt <br />
          = ∫_0^Tb▒〖〖((Ac)〗^2/2)〗 dt + ∫_0^Tb▒〖〖((Ac)〗^2.cos4П.fc.t)/2)〗
          dt <br />= ∫_0^Tb▒〖〖((Ac)〗^2/2)〗 dt + 0 (area = 0 due to complete
          cycle)
        </p>

        <p className="pb-6">
          **where Ac is the amplitude of the carrier signal fc is the carrier
          frequency in Hz
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default page;
