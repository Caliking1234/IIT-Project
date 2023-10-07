import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className="p-4 lg:p-8 lg:w-[70%] mx-auto">
        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          DSB-SC Modulation
        </h1>
        <p className="pb-6">
          Double-sideband suppressed-carrier transmission (DSB-SC) is
          transmission in which frequencies produced by amplitude modulation
          (AM) are symmetrically spaced above and below the carrier frequency
          and the carrier level is reduced to the lowest practical level,
          ideally being completely suppressed. <br />
          In the DSB-SC modulation, unlike in AM, the wave carrier is not
          transmitted; thus, much of the power is distributed between the
          sidebands, which implies an increase of the cover in DSB-SC, compared
          to AM, for the same power use. <br />
          DSB-SC transmission is a special case of double-sideband reduced
          carrier transmission. It is used for radio data systems. This model is
          frequently used in Amateur radio voice communications, especially on
          High-Frequency bands.
        </p>

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Spectrum
        </h1>
        <p className="pb-6">
          DSB-SC is basically an amplitude modulation wave without the carrier,
          therefore reducing power waste, and making it more efficient. This is
          an increase compared to normal AM transmission (DSB) that has a
          maximum efficiency of 33.3% since 2/3 of the power is in the carrier
          which conveys no useful information and both sidebands contain
          identical copies of the same information. Single Side Band Suppressed
          Carrier (SSB-SC) is 100% efficient. Theoretically, the DSB-SC wave has
          two frequencies. Those are upper sideband frequency fc + fm, and lower
          sideband frequency fc - fm.
        </p>

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div> */}

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">DSB-SC Modulator</h1>
        <p className="pb-6">
          DSB-SC is generated by a mixer. In its most common application, two
          signals are applied to a mixer, producing new signals at the sum and
          difference of the original frequencies. This consists of a message
          signal multiplied by a carrier signal. The mathematical representation
          of this process is shown below, where the product-to-sum trigonometric
          identity is used. Vmcos(ωmt) X Vccos(ωct) = (VmVc/2) [cos((ωm + ωc)t)
          + cos((ωm - ωc)t)] (Modulated signal) Where, Vmcos(ωmt) is the message
          signal Vccos(ωct) is the message signal
        </p>

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div> */}

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">Normal AM modulation vs DSB-SC</h1>
        <p className="pb-6">
          The normal AM modulation process is represented as xAM(t) = Ac[1 +
          mx(t)]cosꞷct where m is the modulation index and m = M/A; M =
          modulation amplitude and A = carrier amplitude.
        </p>

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          (a)
        </span>
      </div> */}

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          (b)
        </span>
      </div> */}

        <p className="pb-6">
          In case of AM Modulation carrier is modulated by varying amplitude
          linearly proportional to baseband signal.
        </p>

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          (b)
        </span>
      </div> */}

        <p className="pb-6">
          Theoretically, the amplitude-modulated wave has three frequencies.
          Those are carrier frequency fc, upper sideband frequency fc + fm, and
          lower sideband frequency fc - fm. After modulation, this signal in the
          frequency domain looks like this
        </p>

        {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          (b)
        </span>
      </div> */}

        <p className="pb-6">
          We know the information is in sidebands. So there is no need to send
          only carrier frequency when it consumes 50% of the total transmitted
          power. This system will be more efficient when we send only a single
          sideband as sidebands containing identical copies of the same
          information and construct another sideband from the transmitted one.
          We basically follow this procedure in a single sideband suppressed
          carrier (SSB-SC) modulation process.
        </p>

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">The efficiency of DSB-SC modulation</h1>
        <p className="pb-6">
          PAM = 0.5Ac2 + 0.25m2Ac2 Sidebands contain power 0.25m2Ac2 (say, Psb),
          carrier frequency contains power 0.5Ac2 (say Pc), and each sideband
          contains the same power. In the case of DSB-SC, we transmit sidebands
          and suppress the carrier. So, the efficiency of a DSB-SC signal is
          calculated as ղ = [Psb / (Pc + Psb)]
          {/* = [0.25m2Ac2  / (0.5Ac2  +  0.25m2Ac2)]  <  (1/3) */}
          Less than 33% of AM's power is in the sidebands. For DSB, 100% of the
          power is the sidebands.
        </p>

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">DSB-SC Detector</h1>

        <p className="pb-6">
          For DSBSC, Coherent Demodulation is done by multiplying the DSB-SC
          signal with the carrier signal (with the same phase as in the
          modulation process) just like the modulation process. This resultant
          signal is then passed through a low pass filter to produce a scaled
          version of the original message signal.
        </p>

        <p className="pb-6">
          (VmVc/2) [cos((ωm + ωc)t) + cos((ωm - ωc)t)] X Vc‘ cos(ωct) = (1/2.
          Vc. Vc‘)Vm cos(ωmt) + (1/4. Vc. Vc‘Vm) [cos((ωm + 2ωc)t) + cos((ωm -
          2ωc)t)]
        </p>

        <p className="pb-6">
          (VmVc/2) [cos((ωm + ωc)t) + cos((ωm - ωc)t)] X Vc‘ cos(ωct) = (1/2.
          Vc. Vc‘)Vm cos(ωmt) + (1/4. Vc. Vc‘Vm) [cos((ωm + 2ωc)t) + cos((ωm -
          2ωc)t)]
        </p>
      </div>
    </div>
  );
};

export default page;