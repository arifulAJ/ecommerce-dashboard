import { Link } from "react-router-dom";
import { useGetDeliveryAndServiceFeeQuery } from "../../redux/features/setting/settingApi";

const SettingsDeliveryAndServiceFee = () => {
  const { data: responseData } = useGetDeliveryAndServiceFeeQuery();
  const deliveryAndServiceData = responseData?.data?.attributes;
  return (
    <div>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold py-2">Delivery Fee</h1>
          <div className="w-full px-5 py-3 rounded-xl border border-blue-500 text-start text-[17px]">
            {deliveryAndServiceData?.delivaryFee}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold py-2">Service Fee</h1>
          <div className="w-full px-5 py-3 rounded-xl border border-blue-500 text-start text-[17px]">
            {deliveryAndServiceData?.chargeFee}
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end items-center">
        <Link
          to={`/settings/edit-delivery&service-fee/${deliveryAndServiceData?._id}`}
        >
          <button className="w-56 py-3 bg-blue-500 rounded-xl text-white">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SettingsDeliveryAndServiceFee;
