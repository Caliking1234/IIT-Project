import React from 'react'
import Image from "next/image";
import Img4 from "../../../../../public/Image/img4.png";
import Img5 from "../../../../../public/Image/img5.png";
import Img6 from "../../../../../public/Image/img6.png";

const page = () => {
  return (
    <div>
        <div className="p-4 lg:p-8 lg:w-[70%] mx-auto">
            {/* -----------------pwm-------------------------------- */}

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Pulse-width Modulation (PWM)
      </h1>
      <p className="pb-6">
        Pulse-width modulation (PWM), or pulse-duration modulation (PDM), is a
        method of controlling the average power delivered by an electrical
        signal.{" "}
      </p>

      <div className="lg:px-24 py-8">
        <Image className="" src={Img4} />
      </div>

      <p className="pb-6">
        Fig: An example of PWM in an idealized inductor driven by a blue line
        voltage source modulated as a series of pulses, resulting in a red line
        sine-like current in the inductor. The rectangular voltage pulses
        nonetheless result in a more and more smooth current waveform, as the
        switching frequency increases. The current waveform is the integral of
        the voltage waveform.
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Duty cycle
      </h1>

      <p className="pb-6">
        A low duty cycle equates to low power because the power is off for most
        of the time; the word duty cycle reflects the ratio of &quot;on&quot; time to the
        regular interval or &quot;period&quot; of time. The duty cycle is measured in
        percent, with 100% representing full on. A digital signal has a duty
        cycle of 50% and looks like a &quot;square&quot; wave when it is on 50% of the
        time and off the other 50%. A digital signal has a duty cycle of greater
        than 50% when it spends more time in the on state than the off state. A
        digital signal has a duty cycle of 50% when it alternates between the on
        and off states more often than not.
      </p>

      <div className="lg:px-24 py-8 text-center justify-center mx-auto">

      <Image className="pt-8" src={Img5} />
      <Image className="pb-8" src={Img6} />
      <span className="text-sm font-semibold">Fig: Duty cycle of 75%, 25%, and 50%</span>
      </div>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Mathematical Formulation of pulse-width waveform
      </h1>
      <p className="pb-6">
        {" "}
        Pulse-width modulation uses a rectangular pulse wave whose pulse width
        is modulated resulting in the variation of the average value of the
        waveform. If we consider a pulse waveform f(t), with period T, low-value
        ymin, a high-value ymax, and a duty cycle D, the average value of the
        waveform is given by
      </p>

      <span>y ̅ = (1/T) . ∫_0^t▒f(t)dt</span>
      {/* <span>`As f(t) is a pulse wave, its value is ymax for 0 < t < D.T and ymin for D.T < t <  T. The above expression then becomes</span> */}

      <span></span>

      <p className="pb-6">
        From this, the average value of the signal (y ̅) is directly dependent on
        the duty cycle D.
      </p>

      <p className="pb-6">
        {" "}
        The simplest way to generate a PWM signal is the intersection method,
        which requires only a sawtooth or a triangle waveform (easily generated
        using a simple oscillator) and a comparator. When the value of the
        reference signal is more than the modulation waveform, the PWM signal
        (magenta) is in the high state, otherwise, it is in the low state.
      </p>
        </div>
    </div>
  )
}

export default page