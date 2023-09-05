import React from "react";
import Image from "next/image";
import Img7 from "../../public/Image/img7.png"
import Img8 from "../../public/Image/img8.png"
import Img9 from "../../public/Image/img9.png"
import Img10 from "../../public/Image/img10.png"
import Img11 from "../../public/Image/img11.png"
import Img12 from "../../public/Image/img12.png"

const Textsec3 = () => {
  return (
    <div>
      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Generation of PWM and PPM Signals
      </h1>
    
    <div className="px-24 py-8">
      <Image className="py-8" src={Img7} />
      <span className="font-bold">Fig: PWM and PPM Generator</span>
      </div>

      <p className="pb-6">
        (i) A sawtooth generator generates a sawtooth signal of frequency fs,
        and this sawtooth signal in this case is used as a sampling signal.
      </p>
      <p>(ii) It is applied to the inverting terminal of a comparator.</p>
      <p className="pb-6">
        (iii) The modulating signal x (t) is applied to the non-inverting
        terminal of the same comparator.
      </p>
      <p className="pb-6">
        (iv) The comparator output will remain high as long as the instantaneous
        amplitude of x (t) is higher than that of the ramp signal.
      </p>
      <p className="pb-6">
        (v) This gives rise to a PWM signal at the comparator output as shown in
        the figure below
      </p>


<div className="px-24 py-8">
      <Image className="py-8" src={Img8} />
      <span className="font-bold">Fig: PWM and PPM Modulation</span>
</div>

      <p className="pb-6">
        Here, it may be noted that the leading edges of the PWM waveform
        coincide with the falling edges of the ramp signal. Thus, the leading
        edges of the PWM signal are always generated at fixed time instants.
      </p>
      <p className="pb-6">
        However, the occurrence of its trailing edges will be dependent on the
        instantaneous amplitude of x(t). Therefore, this PWM signal is said to
        be trail edge modulated PWM.
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Demodulation of PWM Signal
      </h1>

      <div className="px-24 py-8">
      <Image className="py-8" src={Img9} />
      <span className="font-bold">Fig: Schematic diagram of Pulse Width Modulation</span>
</div>

      <p className="pb-6">
        PWM signal must first be converted to a pulse-amplitude modulation (PAM)
        signal and then passed through a low-pass filter. The PWM signal is
        applied to an integrator and hold circuit. When the positive edge of
        pulse appears, the integrator generates ramp output whose magnitude is
        proportional to the pulse width. After the negative edge, the hold
        circuit maintains the peak ramp voltage for a given period and then
        forces the output voltage to zero. The waveform is the sum of a sequence
        of constant-amplitude and constant-width pulse generated by demodulator.
        This signal is then applied to the input of clipping circuit, which cuts
        off the portion of signal below the threshold voltage and outputs the
        reminder. Therefore the output of clipping circuit is a PAM signal whose
        amplitude is proportional to the width of PWM signal. Finally, the PAM
        signal passes through a simple low-pass filter and the original audio
        signal is obtained.
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Effect of Distortion on pulse width modulation
      </h1>

      <p className="pb-6">
        Distortion for a PWM waveform is a direct function of the transmission
        channel. For a given step function, the rise time of the pulse edge will
        increase as the cable length increases. Since a pulse is composed of
        several harmonics of sine functions, the high-frequency components of
        the pulse will have the highest susceptibility to attenuation and delay.
        If the frequency of the transmission exceeds the bandwidth of the
        channel, significant distortion will occur.
      </p>

      <div className="px-24 py-8">
      <Image className="py-8" src={Img10} />
      <span className="font-bold">Fig: Example of Distortion of a Pulse Edge with Increased Cable Lengt</span>
</div>


      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Effect of noise on pulse width modulation
      </h1>
      <p className="pb-6">
        Like frequency modulation, PWM has inherent noise immunity that permits
        an analog signal to be sent on a relatively lengthy wire-line
        communication channel with minimal interference. The amplitude assumes
        one of two relatively discrete values similar to digital communication;
        thereby the noise has to be significant enough to change the switching
        of the states. However, as the length of the transmission channel
        increases, the probability of outside interference affecting the signal
        integrity also increases. Noise and distortion can compromise the
        function of PWM by skewing the duty cycle and altering the wave shape of
        the pulse.
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4"> Applications</h1>
      <p  className="pb-6">
        Pulse-width modulation (PWM), or pulse-duration modulation (PDM), is a
        method of controlling the average power delivered by an electrical
        signal.
      </p>
      <p  className="pb-6">
        {" "}
        For telecommunication purposes, the utility of pulse width modulation
        (PWM) lies within the duty cycle of the encoded signal. Like frequency
        modulation, PWM has inherent noise immunity that permits an analog
        signal to be sent on a relatively lengthy wire-line communication
        channel with minimal interference
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">Pulse-position modulation (PPM)</h1>
      <p className="pb-6">
        Pulse-position modulation (PPM) is a form of signal modulation in which
        M message bits are encoded by transmitting a single pulse in one of 2M
        possible required time shifts. This is repeated every T seconds, such
        that the transmitted bit rate is M/T bits per second.
      </p>
      <p className="pb-6">
        Pulse position modulation is one type of analog modulation which allows
        variation within the position of the pulses based on the sampled
        modulating signal&apos;s amplitude is called PPM or Pulse Position
        Modulation. In this type of modulation, the amplitude & width of the
        pulses are kept stable & the position of the pulses only varied.
      </p>
      <p className="pb-6">
        {" "}
        The PPM technique allows computers to transmit data by simply measuring
        the time taken to reach each data packet to the computer. So is
        frequently used within optical communication where there is small
        multi-pathway interference. This modulation totally transmits digital
        signals & cannot be utilized by analog systems. It transmits simple data
        which is not efficient while transferring files.
      </p>

      <div className="px-24 py-8">
      <Image className="py-8" src={Img11} />
      <span className="font-bold">Fig: PPM Waveforms</span>
</div>
      

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">Demodulation of PPM Signal</h1>
      <div className="px-24 py-8">
      <Image className="py-8" src={Img12} />
     
</div>

      <p className="pb-6">
        The noise corrupted PPM waveform is received by the PPM demodulator
        circuit. The pulse generator develops a pulsed waveform at its output of
        fixed duration and applies these pulses to the reset pin (R) of a SR
        flip-flop. A fixed period reference pulse is generated from the incoming
        PPM waveform and the SR flip-flop is set by the reference pulses. Due to
        the set and reset signals applied to the flip-flop, we get a PWM signal
        at its output. The PWM signal can be demodulated using the PWM
        demodulator.
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">Effect of noise on pulse position modulation</h1>
      <p className="pb-6">
        Since in a PPM system the transmitted information is contained in the
        relative positions of the modulated pulses, the presence of additive
        noise affects the performance of such a system by falsifying the time at
        which the modulated pulses are judged to occur. Immunity to noise can be
        established by making the pulse build up too rapidly that the time
        interval during which noise can exert any perturbation is very short.
        Indeed, additive noise would have no effect on the pulse positions if
        the received pulses were perfectly rectangular, because the presence of
        noise introduces only vertical perturbations. However, the reception of
        perfectly rectangular pulses would require an infinite channel
        bandwidth, and the received pulses have a finite rise time, so the
        performance of the PPM receiver is affected by noise, which is to be
        expected.
      </p>

      <p className="pb-6">As in a continuous wave (CW) modulation system, the noise performance of a PPM system may be described in terms of the output signal-to-noise ratio (SNR). Also, to find the noise improvement produced by PPM over baseband transmission of a message signal, we may use the figure of merit defined as the output signal-to-noise ratio of the PPM system divided by the channel signal-to-noise ratio. Assuming that the average power of the channel noise is small as compared to the peak pulse power, the figure of merit of the PPM system is proportional to the square of the transmission bandwidth of the (say, BT) normalized with respect to the message signal bandwidth (say, W). When, however, the input signal-to-noise ratio drops below a critical value, the system suffers a loss of the wanted message signal at the receiver output. That is a PPM system suffers from a threshold effect of its own.</p>


    </div>
  );
};

export default Textsec3;
