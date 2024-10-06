import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Empty, Spin, Pagination } from "antd";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import CategoriesCart from "../../components/CategoriesCart";
import { IoMdAdd } from "react-icons/io";

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: responseData,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCategoriesQuery(currentPage); // Pass the current page to the query
  const navigate = useNavigate();

  useEffect(() => {
    refetch(); // Refetch data when currentPage changes
  }, [currentPage, refetch]);

  const categoriesData = responseData?.data?.attributes?.allCatagory || [];
  const totalItems = responseData?.meta?.totalItems || 0;

  let content = null;
  if (isFetching) {
    content = (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  } else if ((isError && error) || categoriesData?.length === 0) {
    content = <Empty description="No Data Available" />;
  } else if (categoriesData) {
    content = (
      <>
        <div className="grid md:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
          {categoriesData?.map((category) => (
            <CategoriesCart key={category?._id} category={category} />
          ))}
        </div>
        {/* Pagination Component */}
        <Pagination
          current={currentPage}
          pageSize={10} // Adjust based on your items per page
          total={totalItems}
          onChange={(page) => setCurrentPage(page)} // Update current page on change
          showSizeChanger={false} // Hide the size changer if not needed
          style={{ textAlign: 'center', margin: '20px 0' }} // Centering the pagination
        />
      </>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] font-bold">Categories</h1>
        <div className="flex flex-col items-center gap-2">
          <p
            onClick={() => navigate("/categories/add-categories")}
            className="text-[#1E66CA] font-medium flex cursor-pointer items-center gap-2 border px-5 py-2 rounded-xl border-[#1E66CA]"
          >
            <IoMdAdd size={20} />
            Add Category
          </p>
        </div>
      </div>
      {content}
    </div>
  );
};

export default Categories;
