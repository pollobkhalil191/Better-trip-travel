import Image from 'next/image';

const HeroSection = ({ bgImageUrl, title, subTitle }) => (
  <section className="relative mb-12">
    <Image
      src={bgImageUrl}
      alt="Hero Background"
      width={1200}
      height={700}
      className="w-full h-96 object-cover rounded-lg shadow-md"
    />
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40 rounded-lg"></div>
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center text-white">
      <h1 className="text-4xl font-semibold mb-4">{title}</h1>
      <p className="text-xl mb-6">{subTitle}</p>
      <input
        type="text"
        placeholder="Search for your next tour..."
        className="p-3 w-80 rounded-md shadow-md text-gray-700"
      />
    </div>
  </section>
);

export default HeroSection;
