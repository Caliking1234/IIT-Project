import React from "react";

const page = () => {
  return (
    <div>
      <div className="p-4 lg:p-8 lg:w-[70%] mx-auto">
        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          SSB-SC Modulation
        </h1>
        <p className="pb-6">
          As we see in the case of DSB-SC, only sidebands are transmitted as
          they carry all information about the signal. On the other hand, the
          two sidebands are identical and carry the same information. So, why
          not just send a single sideband and construct the other sideband from
          the transmitted one.{" "}
        </p>

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          SSB-SC Modulator using Hilbert Transform
        </h1>
        <p className="pb-6">
          The SSB-SC modulated signal Sssbsc(t) can be written as
        </p>

        <p className="pb-6">
          Where s(t) is the message (real-valued), s ̂(t) is the Hilbert
          transform, and f0 is the radio carrier frequency.
        </p>

        <p className="pb-6">
          Where (sa(t) is the analytical signal derived from message signal s(t)
          such that sa(t) = s(t) + j. s ̂(t)
        </p>

        <p className="pb-6">
          R(sa(t)exp(j2πf0t)
          {/* = R[{s(t) + j. s ̂(t)}. {cos2πf0t + jsin2πf0t}] */}= R[s(t)cos2πf0t
          + js(t)sin2πf0t + js ̂(t)cos2πf0t - s ̂(t).sin(2πf0t)]
        </p>

        <p className="pb-6">
          So, Sssbsc(t) = s(t).cos(2πf0t) - s ̂(t).sin(2πf0t){" "}
        </p>

        <p className="pb-6">(This results the upper sideband of the signal)</p>

        <p className="pb-6">
          To understand this formula, we may express s(t) as the real part of a
          complex-valued function, with no loss of information.
        </p>
        {/* <p>s(t) = Re{sa(t)} = Re{s(t) + j. s ̂(t)}</p> */}
        <p className="pb-6">
          where j represents the imaginary unit. sa(t) is the analytical
          representation of s(t), which means that it comprises only the
          positive-frequency components of s(t). To avoid negative frequency in
          the Fourier transform, we add Fourier Sine Transform. As we know cos(ω
          + π/2) = sin(π/2). On the other hand, the j operator does the same
          thing. +j operator advances the phase of the signal by 900, and the –j
          operator retards the phase of the signal by 90 degrees.
        </p>

        {/* <p className="pb-6">1/2 Sa(f) = S(f)        for f > 0
           = 0            for f < 0
</p> */}

        <p className="pb-6">
          Where Sa(f) and S(f) are the respective Fourier transforms of sa(t)
          and s(t). Therefore the frequency-translated function Sa(f – f0)
          contains only one side of S(f). Since it also has only
          positive-frequency components, its inverse Fourier transform is the
          analytical representation of sssbsc(t).
        </p>

        {/* <P className="pb-6"> sssbsc(t) + j.s ̂ssbsc(t)  =  F -1 {Sa(f – f0)} = sa(t).e2πf0t,</P> */}

        <p>
          and again the real part of this expression causes no loss of
          information. With Euler&apos;s formula to expand e2πf0t , we obtain
        </p>
        {/* <p className="pb-6">sssbsc(t) = Re{sa(t).e2πf0t}
         = Re {[ s(t) + j. s ̂(t)] . [cos(2πf0t) + j.sin(2πf0t)]}
         = s(t). cos(2πf0t) - s ̂(t). sin(2πf0t)
</p> */}
        <p className="pb-6">
          Coherent demodulation of sssbsc(t) to recover s(t) is the same as AM:
          multiply by cos(2πf0t), and lowpass to remove the “double frequency”
          components around frequency 2f0. If the demodulating carrier is not in
          the correct phase (cosine phase here), then the demodulated signal
          will be some linear combination of s(t) and s ̂(t), which is usually
          acceptable in voice communications.{" "}
        </p>

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Lower sideband Generation
        </h1>
        <p className="pb-6">
          s(t) can also be recovered as the real part of the complex-conjugate,
          sa*(t), which represents the negative frequency portion of S(f), when
          f0 is large enough that S(f - f0) has no negative frequencies, the
          product sa*(t).e2πf0t is another analytical signal, whose real part is
          the actual lower-sideband transmission.
        </p>

        {/* <p>sa*(t).e2πf0t
         = slsb(t) +  j.s ̂lsb(t)  
	slsb(t) = Re{ sa*(t). e2πf0t}
         = Re {[ s(t) + j. s ̂(t)] . [cos(2πf0t) + j.sin(2πf0t)]}
         = s(t). cos(2πf0t) + s ̂(t). sin(2πf0t)
</p> */}

        <p className="pb-6">The sum of the two sideband signals is:</p>
        <p className="pb-6">susb(t) + slsb(t) = 2s(t).cos(2πf0t)</p>
        <p className="pb-6">
          Which is the classic model of suppressed carrier double sideband AM.
          In this way we can recover the original message signal utilizing
          Hilbert transform.
        </p>
        <p className="pb-6">
          One important characteristic of the analytical signal is that its
          spectral content lies in the positive Nyquist interval. If we shift
          the imaginary part of our analytic (complex) signal by 90 degrees (+j)
          and add it to the real part, the negative frequencies will cancel
          while the positive frequencies will add. This results in a signal with
          no negative frequencies. Also, the magnitude of the frequency
          component in the complex signal is twice the magnitude of the
          frequency component in the real signal. This is similar to a one-sided
          spectrum, which contains the total signal power in the positive
          frequencies.{" "}
        </p>
      </div>
    </div>
  );
};

export default page;
