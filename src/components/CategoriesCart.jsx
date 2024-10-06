import { useNavigate } from "react-router-dom";
import { imageBaseUrl } from "../config";
import { useDeleteCategoriesMutation } from "../redux/features/category/categoryApi";
import { message } from "antd";
// eslint-disable-next-line react/prop-types
const CategoriesCart = ({ category }) => {
  const navigate = useNavigate();
  const { _id, name, description, categoryImage } = category || {};
  const [deleteCategory] = useDeleteCategoriesMutation();

  const handleDelete = async () => {
    const res = await deleteCategory(_id);
    if (res.error) {
      message.error(res.error.data?.message);
      return;
    }
    if (res.data) {
      message.success(res?.data?.message);
      return;
    }
  };
  return (
    <div className="w-full bg-[#f1f7ff] rounded-xl">
      <div className="w-full h-56">
        <img
          className="w-[100%] h-[100%] object-cover rounded-t"
          src={`${imageBaseUrl}/${categoryImage?.publicFileUrl}`}
          alt=""
        />
      </div>
      <div className="space-y-1 mt-1 p-5">
        <p className="text-xl font-semibold">{name}</p>
        <h1>
          {description && description.length > 65
            ? `${description?.slice(0, 65)}`
            : description}
        </h1>
        <div className="flex justify-between items-center gap-5">
          <button
            onClick={handleDelete}
            className="w-full cursor-pointer border border-blue-500 py-2 px-7 rounded-xl text-[12px] mt-3"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`/categories/edit-categories/${_id}`)}
            className="w-full cursor-pointer bg-[#1E66CA] text-white py-2 px-7 rounded-xl text-[12px] mt-3"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCart;
