import React from "react";
import Input from "../../components/input";
import { inputs } from "../../utils/constants";
import { useMutation } from "@tanstack/react-query";
import Select from "./select";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AddGig = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (body) =>
      api.post(`gigs`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      }),

    onSuccess: (data) => {
      toast.success("Hizmet başarıyla oluşturuldu");

      navigate(`/detail/${data.data.gig._id}`);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });


  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    //inputlardaki verileri al
    const formData = new FormData(e.target);

    // api'a post isteği at
    mutate(formData);
  };

  
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">Yeni Hizmet Oluştur</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {inputs.map((props, key) => (
            <Input key={key} {...props} />
          ))}

          <Select />
        </div>

        <div className="flex md:justify-center my-5">
          <button
            disabled={isPending}
            className="bg-green-500 px-6 py-2 rounded-md text-white hover:bg-green-600 max-md:w-full w-1/2"
          >
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGig;
