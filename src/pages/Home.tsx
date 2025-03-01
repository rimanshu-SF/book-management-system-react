import GirlReading from "../assets/images/Girl-reading.svg";
import star from "../assets/images/star.svg";
import Button from "../components/Button";

function Home() {
  return (
    <div>
      {/* first page */}
      <div className="flex flex-col min-h-screen justify-center items-center bg-blue-gray">
        <div className="w-full h-auto mt-10 flex justify-center items-center">
          <p className="flex gap-2">
            <img src={star} alt="star" className="h-6 w-6" />
            <img src={star} alt="star" className="h-6 w-6" />
            <img src={star} alt="star" className="h-6 w-6" />
            <img src={star} alt="star" className="h-6 w-6" />
            <img src={star} alt="star" className="h-6 w-6" />
            <p>1000+ Loved by</p>
          </p>
        </div>
        <div className="flex justify-center items-center w-3/4">
          <h1 className="text-[50px] sm:text-[90px] flex text-navy-blue text-center font-medium sm:font-semibold font-pop">
            READ YOUR FAVORITE ONE
          </h1>
        </div>
        <div className="font-canvet text-center">
          <p className="text-2xl sm:text-4xl text-navy-blue">
            Our Readers are not customer, They are supporter.
          </p>
        </div>
        <div className="w-full flex flex-col mt-8 gap-8 justify-center items-center my-3">
          <Button
            label="Start Reading..."
            disabled={false}
            className="p-4 shadow-xl text-xl bg-lime-green hover:bg-dark-green rounded-full text-white"
          />
          <p className="text-2xl font-canvet text-navy-blue">
            It’s free and takes less than a minute!
          </p>
        </div>
      </div>

      {/* second page */}
      <div className="w-full min-h-screen flex justify-center items-center bg-blue-gray">
        <div className="box2 py-20 shadow-lg bg-white shadow-navy-blue border-2 flex justify-center items-center w-4/5 rounded-3xl">
          {/* left part */}
          <div className="w-full px-3 flex flex-col gap-20 text-center">
            <h1 className="text-6xl font-canvet text-navy-blue font-semibold">
              Trying to give you an easy way to Read your Favorites 🫀 🕮
            </h1>
            <p className="text-lg ml-5 text-slate-700 text-justify font-pop font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum porro
              itaque, vitae soluta dolor, cum molestiae illum quidem perferendis
              et modi aliquam, quisquam dicta minus.
            </p>
          </div>
          {/* right part */}
          <div className="h-full  w-full">
            <img src={GirlReading} className="" alt="second image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
