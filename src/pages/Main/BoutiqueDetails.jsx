import { Empty, Image, Spin } from "antd";
import { FaStar } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import ProductCart from "../../components/ProductCart";
import { imageBaseUrl } from "../../config";
import { useGetSingleBoutiqueQuery } from "../../redux/features/boutiques/boutiquesApi";
import { useEffect } from "react";

const BoutiqueDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: boutiqueDetails,
    isFetching,
    refetch,
  } = useGetSingleBoutiqueQuery(id);
  const { userDetails, products } = boutiqueDetails || {};

  useEffect(() => {
    refetch();
  }, [refetch]);
  if (isFetching) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className=" flex justify-between items-center">
        <h1 className="text-[30px] font-bold">Boutique Details</h1>
        <div className="flex flex-col items-center gap-2">
          <p
            onClick={() => navigate(`/boutiques/add-product/${id}`)}
            className="text-[#1E66CA] font-medium flex cursor-pointer items-center gap-2 border px-5 py-2 rounded-xl border-[#1E66CA]"
          >
            <IoMdAdd size={20} />
            Add Boutique Product
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg mt-[24px] py-3">
        <div className="flex items-center gap-4 border-b-2 px-5 pb-3">
          <Image
            width={90}
            height={90}
            src={`${imageBaseUrl}${userDetails?.image?.publicFileUrl}`}
            alt=""
            className="rounded-full"
          />
          <div>
            <div className="flex items-center gap-4 text-[22px] font-medium">
              <h1 className="text-[#1E66CA] font-bold">{userDetails?.name}</h1>
              <FaStar className="text-[gold]" />{" "}
              <span>{userDetails?.rating}</span>
            </div>
            <p>{userDetails?.description}</p>
          </div>
        </div>
        <>
          {products && products?.length !== 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-5 py-3 gap-5">
              {products?.map((item, i) => (
                <ProductCart key={i + 1} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-5">
              <Empty />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default BoutiqueDetails;
