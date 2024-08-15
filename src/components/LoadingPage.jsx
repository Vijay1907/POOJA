import { Grid } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-[100px]">
      <Grid
        height="80"
        width="80"
        color="rgb(100 116 139)"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className="text-3xl mt-6 pl-3 font-semibold text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingPage;
