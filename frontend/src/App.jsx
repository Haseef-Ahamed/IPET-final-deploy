/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
 
 
/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FormProvider } from "./contexts/FormContext";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Membership from "./components/Membership";
import { AuthProvider, useAuth } from "./components/Admin/AuthContext";
import { useContext, createContext } from "react";

import Login from "./pages/UserLogin";
import News from "./pages/News";
import NewsEvents from "./components/NewsEvents";
import IPET from "./pages/IPET";
import Courses from "./pages/Courses";

import { BrowserRouter as Router, useLocation } from "react-router-dom";

import { useLayoutEffect } from "react";
import RegisterPage_1 from "./components/RegisterPage_1";
import AcadmicQualificationForm from "./components/AcadmicQualificationForm";
import Proposes from "./components/Proposes";
import TrainingExperience from "./components/TrainingExperience";
import ProfessionalMembershipsForm from "./components/ProfessionalMembershipsForm";
import PersionalInformation from "./pages/PersionalInformation";
import Persional_Information from "./components/User/PersonalInformation";
import Acadamic_Qulification from "./components/User/AcadamicQulification";

import Acadamic from "./components/Admin/RegisteredUsers/AcadamicQulification";
import Training from "./components/Admin/RegisteredUsers/TrainingAndExperience";
import Professional_M from "./components/Admin/RegisteredUsers/ProfessionalMemberships";
import Personal from "./components/Admin/RegisteredUsers/PersonalInformation";
import TrainingAnd_Experience from "./components/User/TrainingAndExperience";

import Professional_Memberships from "./components/User/ProfessionalMemberships";
import PersonalInformationEdit from "./components/Admin/PersonalInformationEdit";
import AcadamicQulificationEdit from "./components/Admin/AcadamicQulificationEdit";
import TrainingExperienceEdit from "./components/Admin/TrainingExperienceEdit";
import ProfessionalMembershipsEdit from "./components/Admin/ProfessionalMembershipsEdit";
import EditProfile from "./components/EditProfile";
import ProfileView from "./components/ProfileView";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import MyIPET from "./components/MyIPET";
import UserProfile from "./components/UserProfile";
import SearchResultsPage from "./components/SearchResultsPage";
import GuestUserProfile from "./components/GuestUserProfile";
import EditProfileForm from "./components/User/EditProfileForm";
import RegisteredUsers from "./components/Admin/RegisteredUsers";
import PendingUsers from "./components/Admin/PendingUsers";
import Declineusers from "./components/Admin/Declineusers";
import ApprovalSection from "./components/Admin/ApprovalSection";
import ForwardSection from "./components/Admin/ForwardSection";
import ForwardUsers from "./components/Admin/ForwardedUsers";
import AllUsers from "./components/Admin/AllUsers";

import PersionalInformation_P from "./components/Admin/PendingUsers/PersonalInformation";
import TrainingAndExperience_P from "./components/Admin/PendingUsers/TrainingAndExperience";
import AcadamicQulification_P from "./components/Admin/PendingUsers/AcadamicQulification";
import ProfessionalMemberships_P from "./components/Admin/PendingUsers/ProfessionalMemberships";
import ForwardSection_P from "./components/Admin/PendingUsers/ForwardSection";
import ApprovalSection_P from "./components/Admin/PendingUsers/ApprovalSection";

import Acadamic_F from "./components/Admin/ForwardUsers/AcadamicQulification";
import Training_F from "./components/Admin/ForwardUsers/TrainingAndExperience";
import Professional_F from "./components/Admin/ForwardUsers/ProfessionalMemberships";
import Personal_F from "./components/Admin/ForwardUsers/PersonalInformation";
import ApprovalSection_F from "./components/Admin/ForwardUsers/ApprovalSection";

import Acadamic_D from "./components/Admin/DeclineUsers/AcadamicQulification";
import Training_D from "./components/Admin/DeclineUsers/TrainingAndExperience";
import Professional_D from "./components/Admin/DeclineUsers/ProfessionalMemberships";
import Personal_D from "./components/Admin/DeclineUsers/PersonalInformation";
import ApprovalSection_D from "./components/Admin/DeclineUsers/ApprovalSection";
import ForwardSection_D from "./components/Admin/DeclineUsers/ForwardSection";
import ReceivedUsers from "./components/Admin/ReceivedUsers";
import AdminRegistrationPage from "./components/Admin/AdminRegistration";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminForgotPassword from "./components/Admin/AdminForgotPassword";
import AdminResetPassword from "./components/Admin/AdminResetPassword";
import AddEventCourseForm from "./pages/AddEventCourseForm";
import MembershipDetails from "./pages/MembershipPage";
import EventDetails from "./pages/SingleEvent";
import ViewEvents from "./pages/ViewEvents";
import ViewCourses from "./pages/ViewCourses";
import CourseDetails from "./pages/SingleCourse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { CookieConsent } from "./cookies/cookies";
import ViewEventsTable from "./pages/ViewEventsTable";
import UpdateEvent from "./pages/UpdateEvent";
import ViewCoursesTable from "./pages/ViewCoursesTable";
import UpdateCourse from "./pages/UpdateCourse";
import LegalPolicy from "./pages/LegalPolicy";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0); // Scroll to the top of the page
  }, [location.pathname]);
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    // Show loading indicator or return null while checking auth state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-b-2 border-blue-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }
  return children;
};

const UserProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-b-2 border-blue-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log("is authenticated " + isAuthenticated);
  console.log("user id " + userId);

  // Check if user is authenticated and has userId
  if (!userId) {
    return <Navigate to="/login" />;
  }

  // Check if the URL userId matches the stored userId
  const { userId: urlUserId } = useParams();
  if (urlUserId && urlUserId !== userId) {
    return <Navigate to={`/user/${userId}`} />;
  }

  return children;
};

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Wrapper>
            <Navbar />
            <FormProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/add-course-event"
                  element={<AddEventCourseForm />}
                />
                <Route path="/events/:eventId" element={<EventDetails />} />
                <Route path="/view-events" element={<ViewEvents />} />
                <Route
                  path="/view-events-table"
                  element={<ViewEventsTable />}
                />
                <Route
                  path="/view-courses-table"
                  element={<ViewCoursesTable />}
                />
                <Route
                  path="/update-event/:eventId"
                  element={<UpdateEvent />}
                />
                <Route
                  path="/update-course/:courseId"
                  element={<UpdateCourse />}
                />
                <Route path="/view-courses" element={<ViewCourses />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetails />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/membership" element={<Membership />} />
                <Route
                  path="/membership-details"
                  element={<MembershipDetails />}
                />
                <Route path="/newsevents" element={<News />} />
                <Route path="/news/:newsId" element={<NewsEvents />} />
                <Route path="/ipetmis" element={<IPET />} />
                <Route path="/myipet" element={<MyIPET />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/legal-policy" element={<LegalPolicy />} />
                {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
                <Route path="/edit-profile" element={<EditProfileForm />} />
                {/* <Route path="/profile" element={<ProfileView  profileData={profileData}/>} /> */}
                <Route path="/register" element={<RegisterPage_1 />} />
                <Route
                  path="/admin-register"
                  element={<AdminRegistrationPage />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
                <Route
                  path="/admin-forgot-password"
                  element={<AdminForgotPassword />}
                />
                <Route
                  path="/admin-reset-password/:token"
                  element={<AdminResetPassword />}
                />

                <Route
                  path="/user/:userId"
                  element={
                    <UserProtectedRoute>
                      <UserProfile userType="user" />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/guest-user"
                  element={
                    <ProtectedRoute>
                      <GuestUserProfile userType="guest-user" />
                    </ProtectedRoute>
                  }
                />

                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/register-users"
                  element={
                    <ProtectedRoute>
                      <RegisteredUsers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pending-users"
                  element={
                    <ProtectedRoute>
                      <PendingUsers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/decline-users"
                  element={
                    <ProtectedRoute>
                      <Declineusers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forward-users"
                  element={
                    <ProtectedRoute>
                      <ForwardUsers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/received-users"
                  element={
                    <ProtectedRoute>
                      <ReceivedUsers />
                    </ProtectedRoute>
                  }
                />
                <Route path="/all-users" element={<AllUsers />} />
                <Route
                  path="/register/register-acadamic"
                  element={<AcadmicQualificationForm />}
                />
                <Route
                  path="/register/register-acadamic/register-proposes"
                  element={<Proposes />}
                />
                <Route
                  path="/register/register-acadamic/register-proposes/training"
                  element={<TrainingExperience />}
                />
                <Route
                  path="/register/register-acadamic/register-proposes/training/professional-membership"
                  element={<ProfessionalMembershipsForm />}
                />
                {/* register users */}
                <Route
                  path="/personal-r/:userId"
                  element={
                    <ProtectedRoute>
                      <Personal />
                    </ProtectedRoute>
                  }
                />
                <Route path="/acadamic-r" element={<Acadamic />} />
                <Route path="/training-r" element={<Training />} />
                <Route path="/memberships-r" element={<Professional_M />} />

                {/* pending  */}
                <Route path="/personal" element={<PersionalInformation_P />} />
                <Route
                  path="/acadamic/:userId"
                  element={
                    <ProtectedRoute>
                      <AcadamicQulification_P />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/training/:userId"
                  element={
                    <ProtectedRoute>
                      <TrainingAndExperience_P />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/memberships/:userId"
                  element={
                    <ProtectedRoute>
                      <ProfessionalMemberships_P />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/professional/:userId"
                  element={
                    <ProtectedRoute>
                      <ApprovalSection_P />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forward/:userId"
                  element={
                    <ProtectedRoute>
                      <ForwardSection_P />
                    </ProtectedRoute>
                  }
                />

                {/* /decling users */}
                <Route path="/personal-d" element={<Personal_D />} />
                <Route path="/acadamic-d" element={<Acadamic_D />} />
                <Route path="/training-d" element={<Training_D />} />
                <Route path="/memberships-d" element={<Professional_D />} />
                <Route path="/professional-d" element={<ApprovalSection_D />} />
                <Route path="/forward-d" element={<ForwardSection_D />} />
                {/* Forwarding users */}

                <Route path="/personal-f" element={<Personal_F />} />
                <Route path="/acadamic-f" element={<Acadamic_F />} />
                <Route path="/training-f" element={<Training_F />} />
                <Route path="/memberships-f" element={<Professional_F />} />
                <Route path="/professional-f" element={<ApprovalSection_F />} />
                <Route
                  path="/personal-edit"
                  element={<PersonalInformationEdit />}
                />
                <Route
                  path="/acadamic-edit"
                  element={<AcadamicQulificationEdit />}
                />
                <Route
                  path="/training-edit"
                  element={<TrainingExperienceEdit />}
                />
                <Route
                  path="/memberships-edit"
                  element={<ProfessionalMembershipsEdit />}
                />

                <Route path="/search" element={<SearchResultsPage />} />
                <Route
                  path="/personal-info/:userId"
                  element={
                    <UserProtectedRoute>
                      <Persional_Information />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/acadamic-info/:userId"
                  element={
                    <UserProtectedRoute>
                      <Acadamic_Qulification />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/training-info/:userId"
                  element={
                    <UserProtectedRoute>
                      <TrainingAnd_Experience />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/memberships-info/:userId"
                  element={
                    <UserProtectedRoute>
                      <Professional_Memberships />
                    </UserProtectedRoute>
                  }
                />
              </Routes>
            </FormProvider>

            <Footer />
          </Wrapper>
          <CookieConsent />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
