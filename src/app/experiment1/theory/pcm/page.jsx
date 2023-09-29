import React from 'react'
import Image from "next/image";
import Img16 from "../../../../..//public/Image/img16.png";
import Img17 from "../../../../../public/Image/img17.png";
import Img18 from "../../../../../public/Image/img18.png";
import Img19 from "../../../../../public/Image/img19.png";
import Img20 from "../../../../../public/Image/img20.png";
import Img21 from "../../../../../public/Image/img21.png";

const page = () => {
  return (
    <div>
        <div className="p-4 lg:p-8 lg:w-[70%] mx-auto">

{/* ----------------------------pcm------------------------------- */}

        <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Pulse Code Modulation (PCM)
      </h1>
      <p className="pb-6">
        Starting in the 1920s, long-distance telephone links used frequency
        division multiplexing. A cable with a bandwidth of 3 MHz can support (in
        principle) 1000 3 kHz voice channels. But 1000 filters, modulators, and
        demodulators are needed. Using PCM, multiple connections could be time
        division multiplexed (TDM). The Bell System settled on 1.544 Mbit/s (by
        experimentation). 8000 · (24 · 8 + 1) = 8000 · 193 = 1544000 Where the
        number of frames per second is 8000 and 24 8bit channels plus 1 framing
        bit. This TDM signal is called digital signal level 1 (DS1). This 24 to
        1 digital multiplexing technique was used for the T1 carrier system for
        voice communication.
      </p>

      <div className="lg:px-24 py-8">
        <Image className="" src={Img16} />
        <Image className="py-8" src={Img17} />
        <span className="font-bold">Fig: PCM waveform</span>
      </div>
      <p className="pb-6">
        Instead of a pulse train, PCM produces a series of numbers or digits,
        and hence this process is called as digital. Each one of these digits,
        though in binary code, represent the approximate amplitude of the signal
        sample at that instant.
      </p>

      <p className="font-bold">Bit rate and bandwidth requirements of PCM</p>
      <ul className="px-16 py-6">
        <li className="pb-4">
          • The bit rate of a PCM signal can be calculated form the number of
          bits per sample × the sampling rate. Bit rate =𝑛𝑏×𝑓𝑠. The bandwidth
          required to transmit this signal depends on the type of line encoding
          used.
        </li>
        <li>
          • A digitized signal will always need more bandwidth than the original
          analog signal. Price we pay for robustness and other features of
          digital transmission.
        </li>
      </ul>

      <h1 className="text-xl pb-4 font-bold">
        Linear Pulse Code Modulation (LPCM)
      </h1>
      <p className="pb-6">
        Pulse-code modulation (PCM) is a multiplexing technique used to
        digitally represent sampled analog signals. Linear pulse-code modulation
        (LPCM) is a specific type of PCM in which the quantization levels are
        linearly uniform.
      </p>

      <h1 className="text-xl pb-4 font-bold">
        Differential Pulse Code Modulation (DPCM)
      </h1>
      <p className="pb-6">
        The encoder performs the function of differentiation; a quantizer
        precedes the differencing of adjacent quantized samples; the decoder is
        an accumulator, which if correctly initialized exactly recovers the
        quantized signal. DPCM takes the values of two consecutive samples; if
        they are analog samples, quantize them; calculate the difference between
        the first one and the next; the output is the difference. For example,
        m[k] is the sampled unquantized signal we want to transmit, and mq[k] is
        the quantized signal. m^[k] is the prediction of m[k] based on previous
        samples mq[k]. d[k] = m[k] − mˆ [k], the unquantized difference between
        m[k] and the prediction. dq[k] is the actual quantized difference that
        will be transmitted. A predictor will take previous samples of the
        signal, and compute the next expected sample. At the receiver side, the
        input is quantized difference signal dq[k]. The receiver will produce
        previous values of mq[k]. Then the predictor computes mq^[k], the next
        predicted sample. Then dq[k] is added to the predicted signal mq^[k] to
        recover the transmitted signal.
      </p>

      <h1 className="text-xl pb-4 font-bold">Basic Elements of PCM</h1>

      <div className="lg:px-24 py-8">
        <Image className="" src={Img18} />
        <span className="font-bold">Fig: Pulse Code Modulation</span>
      </div>

      <h1 className="text-xl pb-4 font-bold">Pulse Code Modulation</h1>

      <p className="pb-6">
        The transmitter section of a Pulse Code Modulator circuit consists of
        Sampling, Quantizing and Encoding, which are performed in the
        analog-to-digital converter section. The low pass filter prior to
        sampling prevents aliasing of the message signal. The construction
        filter helps to obtain the original signal. The signal strength can be
        enhanced through this regenerative repeater. So, the channel&apos;s output
        also includes a regenerative repeater circuit to balance the signal
        loss, renovate the signal & also increases the signal strength.
      </p>

      <h1 className="text-xl pb-4 font-bold">Pulse Code Demodulation</h1>
      <p className="pb-6">
        Pulse Code Demodulation will be doing the same modulation process in
        reverse. Demodulation starts with the decoding process, during
        transmission the PCM signal will be affected by noise interference. So,
        before the PCM signal sends to the PCM demodulator, we have to recover
        the signal to the original level for that we are using a comparator. The
        PCM signal is a series pulse wave signal, but for demodulation, we need
        a wave to be parallel.
      </p>
      <p className="pb-6">
        By using a serial to parallel converter the series pulse wave signal
        will be converted into a parallel digital signal. After that the signal
        will pass through the n-bits decoder, it should be a Digital to Analog
        converter. Decoder recovers the original quantization values of the
        digital signal. This quantization value also includes a lot of
        high-frequency harmonics with original audio signals. For avoiding
        unnecessary signals we utilize a low-pass filter at the final part.
      </p>

      <h1 className="text-xl pb-4 font-bold">Quantization Process:</h1>
      <p className="pb-6">
        A continuous signal, such as voice, has a continuous range of amplitudes
        and therefore its samples have a continuous amplitude range. In other
        words, within the finite amplitude range of the signal, we find an
        infinite number of amplitude levels. It is not necessary in fact to
        transmit the exact amplitudes of the samples. Any human sense (the ear
        or the eye), as an ultimate receiver, can detect only finite intensity
        differences.
        <div className="lg:px-24 py-8">
          <Image className="" src={Img19} />
          <span className="font-bold">
            Fig: Description of a memoryless quantizer
          </span>
        </div>
        This means the original continuous signal may be approximated by a
        signal constructed of discrete amplitudes selected on a minimum error
        basis from an available set. For example, amplitude quantization is
        defined as the process of transforming the sample amplitude m(nTs) of a
        message signal m(t) at time t = nTs into a discrete amplitude v(nTs)
        taken from finite set of possible amplitudes.{" "}
      </p>

      <h1 className="text-xl pb-4 font-bold">Quantization Noise in PCM:</h1>
      <p className="pb-6">
        It is the type of quantization error, which usually occurs in analog to
        digital converter. For example, in music, the signals keep changing
        continuously, where regularity is not found in errors. Such errors
        create a wideband noise called Quantization Noise.
      </p>
      <p className="pb-6">
        Quantization approximates the sampled value to the nearest discrete
        value from the set of finite discrete levels. Quantizers are of two
        types.
      </p>
      <ul>
        <li className="text-xl pb-4 font-semibold">1. Mid-treed quantizer</li>
        <li className="text-xl pb-4 font-semibold">2. Mid-rise quantizer</li>
      </ul>

      <p>Quantizing step size, Δ=(xmax-xmin)/q </p>
      <p>Q=number of quantized level</p>
      <p className="pb-6">Δ=(xmax-xmin)/2n</p>

      <p className="pb-6">
        {" "}
        Where n is the number of bits used to represent each level
      </p>

      <h1 className="text-xl pb-4 font-bold">1. Mid treed Quantizer</h1>

      <div className="lg:px-24 py-8">
        <Image className="" src={Img20} />
        {/* <span className="font-bold">Fig: Description of a memoryless quantizer</span> */}
      </div>

      <p className="pb-6">
        Quantization error=quantized value-actual sampled value
        Qe=xq(nTs)-x(nTs). In mid treed quantization the input values lies
        between ± Δ/2, ± 3Δ/2, ± 5Δ/2, . . . in that output values are quantized
        values at ± Δ,± 2Δ,±3Δ,……. Suppose the input (i.e. sampled value) lies
        between ± Δ/2 which is approximated as zero. If the input values lie
        between Δ/2 to 3Δ/2 this quantizer approximates sampled value as Δ. Here
        the origin of the treed of staircase lies at the midpoint so the name is
        called mid treed quantizer. In that maximum quantization error is Δ/2
        and the minimum quantization error is -Δ/2.
      </p>

      <h1 className="text-xl pb-4 font-bold">2. Mid-Rise Quantizer:-</h1>
      <div className="lg:px-24 py-8">
        <Image className="" src={Img21} />
        <span className="font-bold">Fig: Mid-Rise Quantizer</span>
      </div>
      <p className="pb-6">
        In mid-rise quantizer the input values are ± Δ,± 2Δ,± 3Δ,….. the
        quantized values are ± Δ/2, ± 3Δ/2, ± 5Δ/2,…. The quantization error is
        ± Δ/2
      </p>

        </div>
    </div>
  )
}

export default page