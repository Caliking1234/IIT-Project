import React from 'react'
import Image from "next/image";
import Img1 from "../../../../../public/Image/img1.png";
import Img2 from "../../../../../public/Image/img2.png";
import Img3 from "../../../../../public/Image/img3.png";

const page = () => {
  return (
    <div>

<div className="p-4 lg:p-8 lg:w-[70%] mx-auto ">
        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Pulse Amplitude Modulation (PAM)
        </h1>

        <p className="pb-6">
          It is useful and important to generate a continuous-time (CT) signal
          from a sequence in communication systems, in which discrete data—for
          example, digital or quantized data — is to be transmitted over a
          channel in the form of a continuous-time signal. Unlike in the case of
          discrete-time (DT) processing of CT signals, the resulting
          continuous-time signal will be converted back to a discrete-time
          signal at the receiving end.
        </p>

        <Image className="py-8" src={Img1} />

        <p className="pb-6">
          Pulse–amplitude modulation (PAM) is a form of signal modulation where
          the message information is encoded in the amplitude of a series of
          signal pulses.{" "}
        </p>
        <p className="pb-6">
          The basic idea in PAM for communication over a CT channel is to
          transmit a sequence of CT pulses of some pre-specified shape p(t),
          with the sequence of pulse amplitudes carrying the information.
        </p>

        <div className="px-24 py-8">
          <Image className="py-8" src={Img2} />
          <p className="font-bold ">Fig: Block Diagram of PAM Generation</p>

          <Image className="py-8 px-12" src={Img3} />
          <p className="font-bold ">Fig: Pulse Amplitude Modulation Signal</p>
        </div>

        <p className="pb-6">
          The message signal and the sequence of amplitude-modulated rectangular
          pulses whose amplitude is in accordance with the amplitude of the
          message signal is termed as pulse amplitude modulation signal.{" "}
        </p>
        <p className="pb-6">
          There are two operations involved in the generation of the PAM signal
        </p>

        <p className="pb-6">
          <span className="">1.</span>Instantaneous sampling of the message
          signal (say, m(t)) every Ts seconds, where the sampling rate, fs = 1/
          Ts is chosen in accordance with the sampling theorem.
        </p>
        <p className="pb-6">
          <span className="">2.</span>Lengthening the duration of each sample so
          obtained to some constant value T.
        </p>

        <p className="pb-6">
          Let s(t) denote the sequence of flat-top pulse amplitude signal
          generated then we may express the PAM signal as{" "}
        </p>

        <span className="pb-6">
          s(t) = ∫_(n= -∞)^∞▒〖m(nT_s 〗). h(t - nT_s)
        </span>

        <p className="pb-6">
          where Ts is the sampling period m(nTs) is the sample value of m(t)
          obtained at time t = nT_s .{" "}
        </p>


        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Demodulation
      </h1>
      <p className="pb-6">
        Demodulation is performed by detecting the amplitude level of the
        carrier at every single period. The number of possible pulse amplitudes
        in analog PAM is theoretically infinite. Digital PAM reduces the number
        of pulse amplitudes to some power of two. For example, in 4-level PAM
        there are 22 possible discrete pulse amplitudes; in 8-level PAM there
        are 23 possible discrete pulse amplitudes; and in 16-level PAM there are
        24 possible discrete pulse amplitudes.
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Applications
      </h1>
      <p className="pb-6">
        The translation of a DT signal to a CT signal appropriate for
        transmission, and the translation back to a DT signal at the receiver,
        are both accomplished by devices referred to as modems
        (modulators/demodulators). Pulse Amplitude Modulation (PAM) underlies
        the operation of a wide variety of modems.
      </p>
      <p className="pb-6">
        Power consumption is low in pulse modulation. Explanation: In pulse
        modulation, the carrier is not transmitted continuously but in pulses
        whose width is determined by the amplitude of the modulating signal.
      </p>

      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Effect of Noise on Pulse Amplitude Modulation
      </h1>
      <p className="pb-6">
        The frequency varies according to the modulating signal or message
        signal. Due to these variations in the signal frequency, interferences
        will be there. So the noise will be great. For PAM, noise immunity is
        less when compared to other modulation techniques. It is almost equal to
        amplitude modulation.
      </p>
      
      </div>

      
    </div>
  )
}

export default page