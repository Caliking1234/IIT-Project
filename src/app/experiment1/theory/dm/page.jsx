import React from 'react'
import Image from "next/image";
import Img13 from "../../../../../public/Image/img13.png";
import Img14 from "../../../../../public/Image/img14.png";
import Img15 from "../../../../../public/Image/img15.png";

const page = () => {
  return (
    <div>
        <div className="p-4 lg:p-8 lg:w-[70%] mx-auto ">
            {/* ----------------------------------Delta Modulation------------------------------------ */}
            
        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Delta Modulation
      </h1>
      <p className="pb-6">
        DM is the simplest form of differential pulse-code modulation (DPCM).
        The encoder performs the function of differentiation; a quantizer
        precedes the differencing of adjacent quantized samples; the decoder is
        an accumulator, which if correctly initialized exactly recovers the
        quantized signal. In this technique, the difference between successive
        samples is encoded into n-bit data streams. In delta modulation, the
        transmitted data are reduced to a 1-bit data stream. It uses the
        simplest possible quantizer i.e. two-level or one-bit quantizer.{" "}
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Generation of Delta Modulated Signal
      </h1>

      <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          Fig: Delta Modulation and Demodulation
        </span>
      </div>

      <p className="pb-6">
        DPCM is much simpler if we just use th e previous sample for the
        predictor. The predictor is just a delay. In delta modulation, the
        transmitted data are reduced to a 1-bit data stream. It uses the
        simplest possible quantizer i.e. two-level or one-bit quantizer.{" "}
      </p>

      <div className="px-24 py-8">
        <Image className="py-8" src={Img14} />
        <span className="font-bold">
          Fig: Waveform representation of delta modulation where m(t) is the
          analog signal and u(t) is the staircase function.
        </span>
      </div>

      <p className="pb-6">
        Here, the present sample value is compared with the previous sample
        value and this result whether the amplitude is increased or decreased is
        transmitted. If the difference is positive then the approximated signal
        is increased by one step i.e. &quot;∆&quot; and &quot;1&quot; is transmitted. If the
        difference is negative then the approximated signal is reduced by &quot;∆&quot;
        and &quot;0&quot; is transmitted as shown in the figure. Since the delta
        modulation transmits only one bit per sample. Therefore, the signalling
        rate and transmission bandwidth is quite small for delta modulation as
        compared to PCM and DPCM.
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Effects of noise on delta modulation or drawbacks of delta modulation
      </h1>

      <p className="pb-6">
        There are two kinds of quantization errors or noises that are present in
        delta modulation. They are
        <span className="font-bold">1. Granular noise</span> and{" "}
        <span className="font-bold">2. Slope Overload Distortion.</span>
      </p>

      <p className="text-xl pb-4 font-bold ">1. Granular noise</p>

      <div className="px-24 py-8">
        <Image className="py-8" src={Img15} />
        <span className="font-bold">
          Fig: Delta Modulation where x(t) is the analog signal and u(t) is the
          staircase function.
        </span>
      </div>

      <p className="pb-6">
        Granular or Idle noise occurs when the step size is too large compared
        to a small variation in the input signal. This means that for very small
        variations in the input signal, the staircase signal is changed by a
        large amount (Δ) because of the large step size. The figure shows that
        when the input signal is almost flat, the staircase signal u(t) keeps on
        oscillating by ±Δ around the signal. The error between the input and
        approximated signal is called granular noise. The solution to this
        problem is to make the step size small.
      </p>

      <p className="text-xl pb-4 font-bold">2. Slope Overload Distortion</p>
      <p className="pb-6">
        Slope overload distortion occurs due to the large dynamic range of the
        input signal. In the above figure, the rate of rise of input signal x(t)
        is so high that the staircase signal cannot approximate it, the step
        size delta becomes too small for staircase signal u(t) to follow the
        step segment of x(t). Hence, there is a large error between the
        staircase approximated signal and the original input signal x(t). This
        error or noise is known as slope overload distortion.
      </p>

      <p>Applications</p>

      <p className="pb-6">
        The Delta Modulation method is generally used for the encoding of
        signals from analog to PCM. It is also applied for signal conversion in
        television systems. One of the most critical applications of this
        technique is that it is used for real-time Signal Processing
      </p>
        </div>
    </div>
  )
}

export default page