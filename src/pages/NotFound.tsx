import NotFoundImg from "../assets/images/not-found.svg";
export const NotFound = () => {
  return (
    <div className="min-w-screen min-h-screen bg-blue-gray flex flex-col justify-center items-center">
      <div className="w-full flex flex-col h-auto border justify-center items-center ">
        <img className="w-2/5" src={NotFoundImg} alt="NotFoundImage" />
        <h1 className="text-5xl text-navy-blue font-pop font-semibold">
          OOP's, I Got You
        </h1>
        <p className="text-2xl font-canvet font-semibold">
          Surely not this page, Where you want to go.
        </p>
      </div>
    </div>
  );
};
