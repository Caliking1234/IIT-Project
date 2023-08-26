// import Head from 'next/head';
import DiscreteEquationInputForm from './DiscreteEquationInputForm';
// import EquationInputForm from './EquationInputForm';

export default function page() {
  return (
    <div>
      {/* <Head>
        <title>Equation Input and Plotting</title>
        <meta
          name="description"
          content="Taking equations as input and plotting the corresponding curves in Next.js"
        />
      </Head> */}
      <main>
        <h1>Equation Input and Plotting</h1>
        {/* <EquationInputForm /> */}
        <DiscreteEquationInputForm/>
      </main>
    </div>
  );
}
