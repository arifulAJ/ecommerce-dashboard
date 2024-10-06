import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Auth from "../layouts/Auth/Auth";
import Login from "../pages/Auth/Login";
import DashboardHome from "../pages/Main/DashboardHome";
import Boutiques from "../pages/Main/Boutiques";
import Shoppers from "../pages/Main/Shoppers";
import AddBoutiques from "../pages/Main/AddBoutiques";
import EditBoutiques from "../pages/Main/EditBoutiques";
import BoutiqueDetails from "../pages/Main/BoutiqueDetails";
import Drivers from "../pages/Main/Drivers";
import Notification from "../pages/Main/Notification";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyOtp from "../pages/Auth/verifyOtp";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import Categories from "../pages/Main/Categories";
import AddCategory from "../pages/Main/AddCategory";
import EditCategory from "../pages/Main/EditCategory";
import AdminRoutes from "./AdminRoutes";
import Withdraw from "../pages/Main/Withdraw";
import ProfileInformation from "../components/ProfileInformation";
import EditProfileInformation from "../components/EditProfileInformation";
import DriverDetails from "../pages/Main/DriverDetails";
import AddBoutiqueProduct from "../pages/Main/AddBoutiqueProduct";
import Settings from "../pages/Main/Settings";
import SettingsDeliveryFee from "../pages/Main/SettingsDelivery&ServiceFee";
import SettingPrivacyPolicy from "../pages/Main/SettingPrivacyPolicy";
import EditPrivacyPolicy from "../pages/Main/EditPrivacyPolicy";
import EditBoutiqueProduct from "../pages/Main/EditBoutiqueProduct";
import EditSettingsDeliveryServiceFee from "../pages/Main/EditSettingsDelivery&ServiceFee";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
        <Main />
      </AdminRoutes>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "/boutiques",
        element: <Boutiques />,
      },
      {
        path: "/add-boutiques",
        element: <AddBoutiques />,
      },
      {
        path: "/boutiques/add-product/:boutiqueId",
        element: <AddBoutiqueProduct/>
      },
      {
        path: "/boutiques/edit-product/:productId",
        element: <EditBoutiqueProduct/>
      },
      {
        path: "/edit-boutiques/:id",
        element: <EditBoutiques />,
      },
      {
        path: "/boutique-details/:id",
        element: <BoutiqueDetails />,
      },
      {
        path: "/shoppers",
        element: <Shoppers />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/add-categories",
        element: <AddCategory />,
      },
      {
        path: "/categories/edit-categories/:id",
        element: <EditCategory />,
      },
      {
        path: "/drivers",
        element: <Drivers />,
      },
      {
        path:"/drivers/:driverId",
        element:<DriverDetails/>
      },
      {
        path: "/withdraw",
        element: <Withdraw />,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
      {
        path: "/profile-information",
        element: <ProfileInformation />,
      },
      {
        path: "/edit-profile/:id",
        element: <EditProfileInformation />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/settings/privacy-policy",
        element: <SettingPrivacyPolicy />,
      },
      {
        path: "/settings/edit-privacy-policy",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "/settings/delivery&service-fee",
        element: <SettingsDeliveryFee />,
      },
      {
        path:"/settings/edit-delivery&service-fee/:id",
        element: <EditSettingsDeliveryServiceFee/>
      }
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify/:email",
        element: <VerifyOtp />,
      },
      {
        path: "update-password/:email",
        element: <UpdatePassword />,
      },
    ],
  },
]);

export default router;
