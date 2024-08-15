import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { privateRequest } from "../../configs/RequestMethod";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateAbout = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const getSingleAbout = async () => {
      try {
        const response = await privateRequest.get(`/users/aboutUs/${id}`);
        const aboutData = response.data.data;
        setTitle(aboutData.title);
        setDesc(aboutData.desc);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleAbout();
  }, []);

  const handleUpdate = async () => {
    try {
      const payload = {
        title: title,
        desc: description,
      };

      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "dakshin_murti");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dkhh3ayz8/auto/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const result = await response.json();
        payload.img = result.secure_url;
      }

      const updateResponse = await privateRequest.put(
        `/users/aboutUs/${id}`,
        payload
      );

      if (updateResponse.data.status === "success") {
        toast.success("About Us updated successfully!");
        navigate("/about");
      } else {
        toast.error("Failed to update About Us.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar title={"Update About Us"} />
      <Sidebar />

      <div className="w-full max-w-xl m-auto mt-8 ">
        <form
          className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-8 justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover-bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover-bg-gray-600">
            {image && (
              <div>
                <img
                  className="max-h-[9rem] object-contain"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleUpdate}
            >
              Update About Us
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAbout;
