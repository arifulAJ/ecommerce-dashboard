import BoutiquePromotion from "../../components/BoutiquePromotion";
import Status from "../../components/Status";
const DashboardHome = () => {
  return (
    <div className="w-full space-y-10 pb-8">
      <h1 className="text-[35px] font-semibold">Analytics</h1>
      <Status />
      <BoutiquePromotion/>
      {/* <Charts /> */}
    </div>
  );
};

export default DashboardHome;
