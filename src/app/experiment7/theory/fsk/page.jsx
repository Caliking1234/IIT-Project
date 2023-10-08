import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className="p-4 lg:p-8 lg:w-[70%] mx-auto">
        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Frequency Shift Keying (FSK)
        </h1>
        <p className="pb-6 font-bold">FSK Transmitter:</p>

        <p className="pb-6">
          In this binary 1 is represented by high frequency (say, f1) carrier
          and binary 0 by low frequency carrier (say, f2).
        </p>
        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div> */}

        <p className="pb-6">
          Here, the electrical signal representation technique is NRZ coding. In
          which 1 = +ve
        </p>
        <p>1 = +ve</p>
        <p className="pb-6">0 = -ve</p>

        <p className="pb-6 font-bold">VCO :</p>

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div> */}

        <p className="pb-6">fi = 1 / (2П√((L1+L2)(C+C')) )</p>

        <p className="pb-6 font-bold">Transmission of binary ‘1’:</p>

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div> */}

        <p className="pb-6">
          Here, the varactor diode is connected in reverse mode. And as C’ α
          1/w, so, higher the width of the depletion layer, the lower the
          capacitance C’. So, fi is high in this case.
        </p>
        <p className="pb-6">
          On the other hand, as the width increases because reverse bias
          increases the frequency fi increases. This frequency is termed ‘f1’.
        </p>

        <p className="pb-6 font-bold">Transmission of binary ‘0’:</p>

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div> */}

        <p className="pb-6">
          Here, the varactor diode is connected in forward mode. As it is
          connected in the forward mode so, the depletion region decreases. As
          the depletion region decreases, capacitance increases. So, fi
          decreases. This frequency is termed ‘f2’ and f1 `&gt;` f2.
        </p>
        <p className="pb-6 font-bold">FSK Receiver:</p>
        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div> */}

        <p className="pb-6">
          Here in the above figure, the threshold is 0 V. If the received input
          signal in the upper half of the circuit is Accos2Пf1t then, the output
          before the threshold comparator will be Accos2Пf1t. Accos2Пf1t or
          (Ac)2cos22Пf1t. In this case, the average power will be (Ac)2 / 2. If
          the received input signal is Accos2Пf2t, then the output before the
          threshold comparator will be Accos2Пf1t. Accos2Пf2t. In this case, the
          average power will be 0.{" "}
        </p>
        <p className="pb-6">
          Similarly, for the lower half of the circuit, if the received input
          signal is Accos2Пf1t then, the output before the threshold comparator
          will be Accos2Пf1t. Accos2Пf2t. In this case, the average power will
          be 0. If the received input signal is Accos2Пf2t, then the output
          before the threshold comparator will be Accos2Пf2t. Accos2Пf2t. In
          this case, the average power will be (Ac)2 / 2.{" "}
        </p>
        <p className="pb-6">
          After summation in the above circuit, if the output is ((Ac)2 / 2) – 0
          ) or (Ac)2 / 2, then the output will be binary ‘1’. On the other hand,
          if the output is (-(Ac)2 / 2) – 0 ) or -(Ac)2 / 2, then the output
          will be binary ‘0’.
        </p>

        <p className="pb-6 font-bold">a. Constellation Diagram</p>
        <p className="pb-6 font-bold">Energy per bit (Eb):</p>
        <p className="pb-6">** for transmission of binary ‘1’</p>


        
      </div>
    </div>
  );
};

export default page;
