import { useNavigate, useParams } from "react-router-dom";
import {
  useGetDeliveryAndServiceFeeQuery,
  useUpdateDeliveryAndServiceFeeMutation,
} from "../../redux/features/setting/settingApi";
import { message } from "antd";

const EditSettingsDeliveryServiceFee = () => {
  const { id } = useParams();
  const [updateDeliveryAndServiceFee] =
    useUpdateDeliveryAndServiceFeeMutation();
  const { data: responseData } = useGetDeliveryAndServiceFeeQuery();
  const deliveryAndServiceData = responseData?.data?.attributes;

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const delivaryFee = form.delivaryFee.value;
    const chargeFee = form.chargeFee.value;
    try {
      const res = await updateDeliveryAndServiceFee({
        id,
        data: { delivaryFee, chargeFee },
      });
      if (res.error) {
        message.error(res.error.message);
      }
      if (res.data) {
        message.success(res.data?.message);
        navigate('/settings/delivery&service-fee')
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold py-2">Delivery Fee</h1>
          <input
            type="text"
            name="delivaryFee"
            defaultValue={deliveryAndServiceData?.delivaryFee}
            className="w-full px-5 py-3 rounded-xl border border-blue-500 text-start text-[17px] outline-none"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold py-2">Service Fee</h1>
          <input
            type="text"
            name="chargeFee"
            defaultValue={deliveryAndServiceData?.chargeFee}
            className="w-full px-5 py-3 rounded-xl border border-blue-500 text-start text-[17px] outline-none"
          />
        </div>
        <div className="flex justify-end items-center">
          <button className="w-56 py-3 bg-blue-500 rounded-xl text-white">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSettingsDeliveryServiceFee;
