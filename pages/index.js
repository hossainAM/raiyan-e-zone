import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Raiyan E-Zone"/>
        <meta name="author" content="Amir Hossain"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>

      <h1 className="text-xl font-bold text-center mt-5">Welcome to Raiyan E-Zone!</h1>
    </>
  );
};

export default Home;