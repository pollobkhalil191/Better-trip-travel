// components/HeroSection.tsx
const HeroSection = () => {
    return (
      <section className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: "url('/assets/hero-image.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center">Explore the World with Us</h1>
          <p className="text-white text-lg mt-4">Discover amazing tours and unforgettable experiences.</p>
          <button className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">Book Now</button>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  