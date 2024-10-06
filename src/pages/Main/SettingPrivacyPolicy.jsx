import { useGetPrivecyPolicyQuery } from "../../redux/features/setting/settingApi";
import { Link } from "react-router-dom";

const SettingPrivacyPolicy = () => {
  const { data } = useGetPrivecyPolicyQuery();
    return (
    <div>
      <div className="w-full pb-3 gap-2 mb-5 space-y-5">
        <div>
          <h1 className="text-[24px] text-primary font-semibold text-black">
            Privacy policy of DapperDriver
          </h1>
          <div className=" text-justify mt-3 text-black">
            <p
              dangerouslySetInnerHTML={{
                __html: data?.privacypolicyDroperDriver,
              }}
            />
          </div>
        </div>
        <div>
          <h1 className="text-[24px] text-primary font-semibold text-black">
          Other policies of DapperDriver
          </h1>
          <div className=" text-justify mt-3 text-black">
            <p
              dangerouslySetInnerHTML={{
                __html: data?.otherPolicyDroperDriver,
              }}
            />
          </div>
        </div>
      </div>
      <Link to="/settings/edit-privacy-policy">
        <button className="w-full py-3 bg-[#1e66ca] rounded-xl text-white">Edit</button>
      </Link>
    </div>
  );
};

export default SettingPrivacyPolicy;
