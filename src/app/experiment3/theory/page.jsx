import React from "react";

const page = () => {
  return (
    <div>
      <div className="p-4 lg:p-8 lg:w-[70%] mx-auto">
        <div>
          <p className="pb-6 font-semibold">Random variable</p>
          <p className="pb-6">
            A random variable is a mathematical formalization of a quantity or
            object which depends on random events.
          </p>

          <p className="pb-6 font-semibold">Random process</p>
          <p className="pb-6">
            A random process is a mathematical object that usually depends on a
            sequence defined as a sequence of random variables, where the index
            of the sequence has the interpretation of time.{" "}
          </p>
        </div>

        <div>
          <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">
            3. Definition of Stationary and Wide Sense Stationary Process
          </h1>
          <p className="pb-6">
            A stochastic process {"{ ... , Xt-1, Xt, Xt+1, Xt+2, … }"}{" "}
            consisting of random variables indexed by time index t is a time
            series.
          </p>{" "}
          {/* &hellip; */}
          <p className="pb-6">
            The stochastic behavior of {"{Xt}"} is determined by specifying the
            probability density or mass functions (pdf’s).{" "}
          </p>
          <p className="pb-6">p(xt1, ¬ xt2, xt3, …, xtm)</p>
          <p className="pb-6">for all finite collections of time indexes</p>
          <p className="pb-6">{"{(t1, t2, ..., tm), m < ∞}"}</p>
          <p className="pb-6">
            i.e., all finite-dimensional distributions of {"{Xt}"}
          </p>
          <p className="pb-6">
            A time series {"{Xt}"} is strictly stationary if{" "}
          </p>
          <p className="pb-6">
            p(t1 + τ, t2 + τ, …, tm + τ) = p(t1, t2, …, tm),
          </p>
          <p className="pb-6">∀τ, ∀m, ∀(t1, t2, …, tm).</p>
          <p className="pb-6">
            Where p(t1 + τ, t2 + τ, …, tm + τ) represents the cumulative
            distribution function of the unconditional (i.e., with no reference
            to any particular starting value) joint distribution (parameters
            such as mean and variance) of {"{Xt}"} is said to be strictly
            stationary or strict-sense stationary if τ doesn’t affect the
            function p. So, p is not a function of time.
          </p>
          <p className="pb-6">
            A time series {"{Xt}"} is called covariance stationary if{" "}
          </p>
          <p className="pb-6 font-semibold">E(Xt) = μ</p>
          <p className="pb-6 font-semibold">Var(Xt) = σ2x </p>
          <p className="pb-6 font-semibold">Cov(Xt, Xt+τ) = γ(τ)</p>
          <p className="pb-6 ">** (All constant over time t)</p>
          
          <p className="pb-6 font-bold">Wide Sense Stationary Process</p>
          <p className="pb-6 ">
            A random process is called weak-sense stationary or wide-sense
            stationary (WSS) if its mean function and its correlation function
            do not change by shifts in time.
          </p>
          <p className="pb-6 ">µx(t) = µx</p>
          <p className="pb-6 ">
            Rxx(t1, t2) = Rxx(t1 + α, t2 + α) for every α = Rxx(t1 - t2, 0)
          </p>
        </div>

        <div>
            <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">3. a. The output of a Wide Sense Stationary When the System is LTI</h1>
            <p className="pb-6 ">The output of filter is Y(t) = h(t) * X(t), where h(t) is the impulse response of a filter. Let the output mean be µy. </p>
            <p className="pb-6 ">µy = E[Y(t)] = E[h(t) * X(t)]                                            </p>
            <p className="pb-6 ">[‘E’ denotes the expected value]</p>

            <p></p>
            <p></p>
            <p className="pb-6 ">Now, if X(t) is WSS, a shift in time does not affect its mean, i.e.,</p>

            <p className="pb-6 "></p>

            <p className="pb-6 "></p>

            <p className="pb-6 "></p>

            <p className="pb-6 "></p>

            <p className="pb-6 ">Since the H(0) will be some constant, we conclude that the output will also have the same nature as the input signal.  </p>
            <p className="pb-6 ">So, the output of a wide sense stationary when the system is LTI is zero mean and WSS signal.</p>
        </div>

        <div>
            <h1 className="text-2xl pb-4 font-bold underline underline-offset-4">3. b. When the system is Linear and the input is Gaussian</h1>
            <p className="pb-6 ">An important property of the Gaussian random process is that their Probability density function is completely determined by their mean and covariance, i.e.,</p>
            <p className="pb-6 "></p>
            <p className="pb-6 ">Where u is mean</p>

            <p className="pb-6 ">And σ is standard deviation</p>
            <p className="pb-6 ">The Fourier analysis states that any Linear system in the frequency spectrum can be represented as the sum of sinusoids, i.e., </p>



        </div>

      </div>
    </div>
  );
};

export default page;
