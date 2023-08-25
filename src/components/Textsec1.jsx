import React from "react";
import Image from "next/image";
import Img1 from "../../public/Image/img1.png";
import Img2 from "../../public/Image/img2.png";
import Img3 from "../../public/Image/img3.png";

const textsec1 = () => {
  return (
    <div className=" ">
      <div className=" py-12">
        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
          Introduction
        </h1>

        <p className="">
          Many Signals in Modern Communication Systems are digital. Also, analog
          signals are transmitted digitally. Data transmission, digital
          transmission, or digital communications is the physical transfer of
          data (a digital bit stream or a digitized analogue signal) over a
          point-to-point or point-to-multipoint communication channel. Reduced
          distortion and improvement in signal to noise ratios is the great
          advantages of digital transmission over analog transmission. PAM, PWM
          , PPM , DM and PCM etc., are used to transmit a signal digitally. For
          example, these pulse modulation techniques are used in optical fibers,
          wireless channels, computer buses, etc.
        </p>
      </div>

      <div className="">
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
      </div>
    </div>
  );
};

export default textsec1;
