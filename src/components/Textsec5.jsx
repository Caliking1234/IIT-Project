import React from "react";
import Image from "next/image";
import Img22 from "../../public/Image/img22.png";
import Img23 from "../../public/Image/img23.png";
import Img24 from "../../public/Image/img24.png";
import Img25 from "../../public/Image/img25.png";

const Textsec5 = () => {
  return (
    <div>
      <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
        Companding in PCM Systems
      </h1>
      <p className="pb-6">
        The word Companding is a combination of Compressing and Expanding, which
        means that it does both. This non-linear technique is used in PCM which
        compresses the data at the transmitter and expands the same data at the
        receiver. The effects of noise and crosstalk are reduced by using this
        technique
      </p>

      <div className="lg:px-24 py-8">
        <Image className="" src={Img22} />
        <span className="font-bold">Fig: Companding</span>
      </div>

      <p className="pb-6">
        Companding means it amplifies the low-level signals as well as
        attenuates the high level at the transmitter side. At the receiver side
        reverse operation is done. It attenuates the low-level signals and
        amplifies the high-level signals you get the original signal.{" "}
      </p>
      <div className="lg:px-24 py-8">
        <Image className="" src={Img23} />
        <span className="font-bold">Fig: Companding curves for PCM</span>
      </div>
      <p className="pb-6">
        Companding is used to maintain a constant Signal to Noise Ratio
        throughout the dynamic quantization ratio
      </p>

      <div className="lg:px-24 py-8">
        <Image className="" src={Img24} />
        <span className="font-bold">Fig: Non Uniform Quantizer</span>
      </div>

      <p className="pb-6">
        There are two types of Companding techniques. They are –
      </p>

      <p className="pb-6 font-bold">1. A-law Companding Technique</p>
      <ul className="pb-6 px-8">
        <li>
          i. Uniform quantization is achieved at A = 1, where the characteristic
          curve is linear and no compression is done.
        </li>
        <li>
          ii. A-law has a mid-rise at the origin. Hence, it contains a non-zero
          value.
        </li>
        <li>iii. A-law Companding is used for PCM telephone systems.</li>
      </ul>

      {/* <p>F(x) = sgn(x){(A|x|)/(1+ln⁡(A))},      where |x| <  (1/A)
        = sgn(x) {(1 +ln⁡〖(A|x|)〗)/(1+ln⁡(A))},      where (1/A) ≤ |x| ≤ 1,
</p> */}

      <p className="pb-6">
        Where A is the compression parameter. In Europe, A = 87.6, and sgn(x) is
        the sign function.
      </p>

      <p className="pb-6 font-bold"> 2. μ-law Companding Technique</p>

      <p className="pb-6">
        The μ-law algorithm provides a slightly larger dynamic range than the
        A-law at the cost of worse proportional distortion for small signals.{" "}
      </p>
      <ul className="pb-6 px-8">
        <li>
          i. Uniform quantization is achieved at µ = 0, where the characteristic
          curve is linear and no compression is done.
        </li>
        <li>
          ii. µ-law has mid-tread at the origin. Hence, it contains a zero
          value.
        </li>
        <li>iii. µ-law companding is used for speech and music signals.</li>
      </ul>

      <p className="pb-6">
        For a given input x, the equation for µ-law encoding is
      </p>

      {/* <p className="pb-6">F(x) = sgn(x) {ln⁡〖(1+ µ|x|)〗/(ln(1+ µ))},      -1 ≤ x ≤1, </p> */}

      <p className="pb-6">
        Where, µ = 255 in the North America and Japanese standards.
      </p>

      <p className="font-bold">Quantization Error:</p>

      <div className="lg:px-24 py-8">
        <Image className="" src={Img25} />
        <span className="font-bold">Fig: PDF of Quantization Error</span>
      </div>

      <p className="pb-6">
        Quantization error is uniformly distributed and integrated to 1.
      </p>

      {/* <span>equation to be added</span> */}
    </div>
  );
};

export default Textsec5;
