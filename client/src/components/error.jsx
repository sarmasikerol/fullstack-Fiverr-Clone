const Error = ({ info, retry }) => {
    return (
      <>
        <div className="bg-red-500 text-white rounded-md my-20 p-5 flex flex-col items-center gap-4">
          <h1 className="text-4xl">{info.response.status}</h1>
          <h2 className="text-lg">Üzgünüz bir sorun oluştu</h2>
          <h2 className="text-lg font-semibold">{info.message}</h2>
        </div>
  
        <div className="flex justify-center">
          <button
            onClick={retry}
            className="border shadow px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Tekrar Dene
          </button>
        </div>
      </>
    );
  };
  
  export default Error;
  