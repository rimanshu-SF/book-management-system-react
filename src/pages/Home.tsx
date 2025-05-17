import GirlReading from '../assets/images/Girl-reading.svg';
import star from '../assets/images/star.svg';
import Button from '../components/Button';

function Home() {
  return (
    <div>
      {/* First Page (Hero Section) */}
      <div className="relative flex flex-col min-h-screen justify-center items-center bg-black  backdrop-blur-lg  text-white">
        {/* Background image */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Hero Content */}
        <div className="z-10 flex flex-col items-center text-center space-y-8 px-5 sm:px-20">
          <div className="flex gap-2 justify-center">
            <img src={star} alt="star" className="h-6 w-6" />
            <img src={star} alt="star" className="h-6 w-6" />
            <img src={star} alt="star" className="h-6 w-6" />
            <img src={star} alt="star" className="h-6 w-6" />
            <img src={star} alt="star" className="h-6 w-6" />
            <p>1000+ Loved by</p>
          </div>

          <h1 className="text-4xl sm:text-6xl font-semibold leading-tight">
            READ YOUR FAVORITE ONE
          </h1>
          <p className="text-xl font-canvet sm:text-2xl max-w-lg mx-auto">
            Our Readers are not customers, They are supporters.
          </p>

          {/* Call to Action Button */}
          <div className="flex flex-col mt-8 gap-8">
            <Button
              label="Start Reading..."
              disabled={false}
              className="p-4 shadow-xl text-xl bg-muted-red/10 border-2 border-muted-red/20 hover:bg-muted-red/40 rounded-full text-white"
            />
            <p className="text-xl">It’s free and takes less than a minute!</p>
          </div>
        </div>
      </div>

      {/* Second Section (Informational section with image) */}
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-black to-gray-900 px-4 py-8">
        <div className="w-full max-w-4xl py-8 md:py-12 bg-white/10 rounded-3xl flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          {/* Left Part */}
          <div className="w-full md:w-1/2 px-4 md:px-6 flex flex-col gap-6 md:gap-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white px-2">
              An Easy Way to Read Your Favorites 🫀 🕮
            </h1>
            <p className="text-base sm:text-lg text-white text-justify font-pop font-light max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum porro
              itaque, vitae soluta dolor, cum molestiae illum quidem perferendis
              et modi aliquam, quisquam dicta minus.
            </p>
          </div>

          {/* Right Part - Image */}
          <div className="w-full md:w-1/2 px-4 md:px-6">
            <img
              src={GirlReading}
              alt="Reading Image"
              className="w-full h-auto object-cover rounded-xl max-h-[400px] md:max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
