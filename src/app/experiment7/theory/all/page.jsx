import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className="p-4 lg:p-8 lg:w-[70%] mx-auto">
        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Performance Differences of ASK, FSK, and PSK
        </h1>
        <p className="pb-6">
          Amplitude Shift Keying (ASK), Frequency Shift Keying (FSK), and Phase
          Shift Keying (PSK) are three different digital modulation techniques
          used for transmitting digital information over communication channels.
          Each of these modulation techniques has its own characteristics and
          performance differences based on factors like noise, bandwidth
          efficiency, complexity, and resilience to various channel conditions.
          Let&apos;s compare these three modulation techniques:
        </p>

        {/* ---------------------------------------------------------------------- */}

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Amplitude Shift Keying (ASK):
        </h1>
        <p className="pb-6 font-bold">Advantages:</p>
        <p> - Simple to implement and demodulate. </p>
        <p> - Bandwidth-efficient when compared to FSK.</p>
        <p className="pb-6">
          {" "}
          - Well-suited for digital transmission over analog channels.
        </p>

        <p className="pb-6 font-bold">Disadvantages:</p>
        <p>
          {" "}
          - Sensitive to amplitude variations and noise, leading to higher error
          rates.{" "}
        </p>
        <p className="pb-6">
          {" "}
          - Limited resilience to fading and multipath propagation.
        </p>

        {/* ---------------------------------------------------------------------- */}

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Frequency Shift Keying (FSK):
        </h1>
        <p className="pb-6 font-bold">Advantages:</p>
        <p>
          {" "}
          - More robust against amplitude variations and noise compared to ASK.{" "}
        </p>
        <p>
          {" "}
          - Well-suited for applications with limited bandwidth availability.
        </p>
        <p className="pb-6">
          {" "}
          - Relatively simple to implement and demodulate.
        </p>

        <p className="pb-6 font-bold">Disadvantages:</p>
        <p>
          {" "}
          - Requires wider bandwidth compared to PSK for the same data rate.{" "}
        </p>
        <p className="pb-6">
          {" "}
          - Can be affected by frequency-selective fading.
        </p>

        {/* ---------------------------------------------------------------------- */}

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Phase Shift Keying (PSK):
        </h1>
        <p className="pb-6 font-bold">Advantages:</p>
        <p>
          {" "}
          - Less susceptible to amplitude variations and noise compared to ASK.{" "}
        </p>
        <p> - More bandwidth-efficient than FSK for the same data rate.</p>
        <p>
          {" "}
          - Well-suited for coherent demodulation, allowing accurate phase
          recovery.
        </p>

        <p className="pb-6 font-bold">Disadvantages:</p>
        <p>
          {" "}
          - Susceptible to phase errors introduced by carrier synchronization
          issues.{" "}
        </p>
        <p className="pb-6">
          {" "}
          - Can have higher complexity in coherent detection compared to ASK or
          FSK.
        </p>

        {/* ---------------------------------------------------------------------- */}

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Performance Comparison:
        </h1>

        <p className="pb-6 font-bold">1. Noise Sensitivity:</p>
        <p>
          {" "}
          - ASK is the most sensitive to noise due to its reliance on amplitude
          variations.
        </p>
        <p> - PSK is less sensitive to noise compared to ASK.</p>
        <p className="pb-6">
          {" "}
          - FSK is relatively more robust against noise, making it suitable for
          noisy environments.
        </p>

        {/* ---------------------------------------------------------------------- */}

        <p className="pb-6 font-bold">2. Bandwidth Efficiency:</p>
        <p>
          {" "}
          - PSK is the most bandwidth-efficient, requiring less bandwidth than
          FSK for the same data rate.
        </p>
        <p> - FSK requires wider bandwidth compared to PSK.</p>
        <p className="pb-6">
          {" "}
          - ASK&apos;s bandwidth efficiency lies between FSK and PSK.
        </p>

        {/* ---------------------------------------------------------------------- */}

        <p className="pb-6 font-bold">3. Complexity:</p>
        <p>
          {" "}
          - ASK and FSK are relatively simpler to implement and demodulate.
        </p>
        <p className="pb-6">
          {" "}
          - Coherent PSK demodulation can be more complex due to carrier
          synchronization requirements.
        </p>

        {/* ---------------------------------------------------------------------- */}

        <p className="pb-6 font-bold">4. Fading and Multipath Resilience:</p>
        <p>
          {" "}
          - FSK tends to perform well in fading and multipath scenarios due to
          its frequency diversity properties..
        </p>
        <p>
          {" "}
          - PSK can be affected by fading, especially in frequency-selective
          fading conditions.
        </p>
        <p className="pb-6">
          {" "}
          - ASK may experience significant performance degradation in fading and
          multipath channels.
        </p>

        {/* ---------------------------------------------------------------------- */}

        <p className="pb-6 font-bold">5. Applications:</p>
        <p>
          {" "}
          - ASK is commonly used in simple applications such as remote controls,
          RFID, and binary communication.
        </p>
        <p>
          {" "}
          - FSK is suitable for applications where noise immunity is important,
          such as wireless communication and telemetry systems.
        </p>
        <p className="pb-6">
          {" "}
          - PSK is widely used in digital communication systems, including
          modems, Wi-Fi, and digital broadcasting..
        </p>

        {/* ---------------------------------------------------------------------- */}

        <p>
          The choice of modulation technique depends on the specific
          requirements of the communication system, including the channel
          characteristics, noise levels, data rate, and complexity constraints.
          Each modulation technique has its strengths and weaknesses, and the
          best choice will depend on balancing these factors for the given
          scenario.
        </p>
      </div>
    </div>
  );
};

export default page;
