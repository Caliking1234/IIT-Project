import React from 'react'

const page = () => {
  return (
    <div>
        <div className="p-4 lg:p-8 lg:w-[70%] mx-auto">
          <h1 className="text-4xl pb-4 font-bold  ">Other SSB-SC Modulators</h1>

          <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">Bandpass filtering</h1>
          <p className="pb-6">One method of producing an SSB-SC signal is to remove one of its sidebands via filtering, leaving only either the upper sideband (USB), and the sideband with the higher frequency, or less commonly, the lower sideband (LSB), the sideband with lower frequency. Most often, the carrier is reduced or removed entirely (suppressed), being referred to in full as a single sideband suppressed carrier (SSBSC). </p>
          <p className="pb-6">Assuming both sidebands are symmetric, which is the case for a normal AM signal, no information is lost in the process.</p>

          <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">Hartley modulator</h1>
          <p className="pb-6">Hartley modulator uses phasing to suppress the unwanted sideband. To generate an SSB signal with this method, two versions of the original signal are generated, mutually 900 out of phase for any single frequency within the operating bandwidth. Each one of these signals then modulates carrier waves (of one frequency) that are also 900 out of phase with each other. By either adding or subtracting the resulting signals, a lower or upper sideband signal results. A benefit is to allow an analytical expression for SSB signals, which can be used to understand effects such as synchronous detection of SSB.</p>
           
           {/* <div className="px-24 py-8">
        <Image className="py-8" src={Img13} />
        <span className="font-bold">
          (b)
        </span>
      </div> */}

          <p className="pb-6">In the above figure, m(t) represents the message signal. And waveform of the message signal is defined as cos(ꞷmt).</p>

          <p className="pb-6">Shifting the baseband signal 900 out of phase cannot be done simply by delaying it, as it contains a large range of frequencies. In analog circuits, a wideband 90-degree phase difference network is used. The method was popular in the days of vacuum radios. Nowadays, this method, utilizing the Hilbert transform to phase shift the baseband audio, can be done at low cost with digital circuitry.  </p>

          <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">Weaver modulator </h1>
          <p className="pb-6">The Weaver modulator uses only lowpass filters and quadrature mixers and is favored in digital implementations. In Weaver’s method, the band of interest is first translated to be centered at zero, conceptually by modulating a complex exponential exp(jωt) with frequency in the middle of the voiceband, but implemented by a quadrature pair of sine and cosine modulators at the frequency (e.g. 2KHz). This complex signal or pair of real signals is then lowpass filtered to remove the undesired sideband that is not centered to zero. Then, the single sideband complex signal centered at zero is upconverted to a real signal, by another pair of quadrature mixers, to the desired center frequency.</p>


          <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">SSB-SC Detector</h1>
          <p className="pb-6">The front end of an SSB receiver is similar to that of an AM or FM receiver, consisting of a superheterodyne RF front end that produces a frequency-shifted version of the radio frequency (RF) signal within a standard intermediate frequency (IF) band.</p>
          <p className="pb-6">To recover the original signal from the IF SSB signal, the sideband must be frequency shifted to down its original range of baseband frequencies, by using a product detector which mixes it with the output of a beat frequency oscillator (BFO). In other words, it is just another stage of heterodyning. For this work, the BFO must be exactly adjusted. </p>
          <p className="pb-6">In communications and electronic engineering, an intermediate frequency (IF) is created by mixing the carrier signal with a local oscillator signal in a process called heterodyning, resulting in a signal at the difference or beat frequency. Intermediate frequencies are used in superheterodyne radio receivers, in which an incoming signal is shifted to an IF for amplification before final detection is done.</p>

          <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">A simple example  </h1>
          <p className="pb-6">A receiver is tuned to a Morse code signal, and the receiver’s intermediate frequency (IF) is fIF = 45000 Hz. That means Morse code’s dits (dots) and dahs (dashes) have become pulses of 45000 Hz signal, which is inaudible. To make them audible, the frequency needs to be shifted into audio range, for instance  faudio = 1000 Hz. To achieve that, the desired BFO frequency is fBFO = 44000 or 46000. Because it produces new signals at the sum and difference of the two signal frequencies.</p>

          <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">Detection of an SSB signal</h1>
          <p className="pb-6">For example, consider an IF SSB signal centered at frequency Fif = 45000 Hz. The baseband frequency it needs to be shifted to is Fb = 2000 Hz. The BFO output waveform is cos(2π. fBFO . t). When the signal is multiplied by the BFO waveform, it shifts the signal to (Fif  +  Fbfo), and to | Fif  -  Fbfo |, which is known as the beat frequency or image frequency. The objective is to choose an FBFO  that results in | Fif  -  Fbfo | = Fb = 2000 Hz. The unwanted components at (Fif  +  Fbfo) can be removed by lowpass filter.</p>


          <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">Advantages of SSB-SC over DSB-SC</h1>
          <p className="pb-3">•	SSB-SC uses half the bandwidth of DSB-SC</p>
          <p className="pb-6">•	Half of the power is needed for transmission in SSB-SC in comparison to DSBSC.</p>

        </div>
    </div>
  )
}

export default page