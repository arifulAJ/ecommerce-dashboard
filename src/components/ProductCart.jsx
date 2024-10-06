/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
import { imageBaseUrl } from "../config";
import { useDeleteBoutiqueProductMutation } from "../redux/features/boutiques/boutiquesApi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProductCart = ({ item }) => {
  const [deleteProduct] = useDeleteBoutiqueProductMutation();
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      if(res.error){
        message.error(res.error.data?.message)
      }if(res.data){
        message.success(res.data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const navigate = useNavigate();
  return (
    <div className="relative shadow-xl rounded-xl">
      <img
        className="w-full h-72 rounded-t-xl"
        src={`${imageBaseUrl}${item?.images[0]?.publicFileUrl}`}
        alt=""
      />
      <div className="px-3 pt-2 pb-5">
        <p className="text-[black] font-semibold my-1 text-xl">{item?.name}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[#1E66CA] font-medium text-[19px]">
            ${item?.variants[0]?.price}
          </p>
          <div className="flex items-center gap-1">
            <FaStar className="text-[gold]" /> <span>{item.rating}</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5">
          <button
            onClick={() => handleDelete(item?._id)}
            className="w-full cursor-pointer border border-blue-500 py-2 px-7 rounded-xl text-[12px] mt-3"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`/boutiques/edit-product/${item?._id}`)}
            className="w-full cursor-pointer bg-[#1E66CA] text-white py-2 px-7 rounded-xl text-[12px] mt-3"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
