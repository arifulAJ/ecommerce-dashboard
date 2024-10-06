import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  useGetPrivecyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "../../redux/features/setting/settingApi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const EditPrivacyPolicy = () => {
  const { data: responseData } = useGetPrivecyPolicyQuery();
  const [privacyPolicyContent, setPrivacyPolicyContent] = useState("");
  const [otherPolicyContent, setOtherPolicyContent] = useState("");

  useEffect(() => {
    if (responseData) {
      setPrivacyPolicyContent(responseData?.privacypolicyDroperDriver);
      setOtherPolicyContent(responseData?.otherPolicyDroperDriver);
    }
  }, [responseData]);

  const [updatePrivacyPolicy] = useUpdatePrivacyPolicyMutation();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const data = {
        privacypolicyDroperDriver: privacyPolicyContent,
        otherPolicyDroperDriver: otherPolicyContent,
      };
      const res = await updatePrivacyPolicy({ id: responseData?._id, data });
      if (res.error) {
        message.error(res.error.data?.message);
        return;
      }
      if (res.data) {
        navigate("/settings");
        message.success(
          "Privacy policy and other policies updated successfully."
        );
      }
    } catch (error) {
      console.error("Failed to update policies", error);
    }
  };

  return (
    <div>
      <h1 className="text-[24px] text-primary font-semibold text-black mb-5">
        Edit Privacy Policy and Other Policies
      </h1>
      <div className="mb-5">
        <h2 className="text-[20px] text-primary font-semibold text-black mb-3">
          Privacy Policy
        </h2>
        <CKEditor
          editor={ClassicEditor}
          data={privacyPolicyContent}
          onChange={(event, editor) => {
            const data = editor.getData();
            setPrivacyPolicyContent(data);
          }}
          config={{
            height: 400,
          }}
        />
      </div>
      <div className="mb-5">
        <h2 className="text-[20px] text-primary font-semibold text-black mb-3">
          Other Policies
        </h2>
        <CKEditor
          editor={ClassicEditor}
          data={otherPolicyContent}
          onChange={(event, editor) => {
            const data = editor.getData();
            setOtherPolicyContent(data);
          }}
          config={{
            height: 400,
          }}
        />
      </div>
      <button
        onClick={handleSave}
        className="w-full py-3 bg-[#1e66ca] rounded-xl text-white"
      >
        Save
      </button>
    </div>
  );
};

export default EditPrivacyPolicy;
