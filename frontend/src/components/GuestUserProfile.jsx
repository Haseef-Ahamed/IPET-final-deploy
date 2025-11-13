/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GuestUserProfile = ({ userType}) => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('userProfile');
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    }
  }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate('/login');
//   };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    // <>
   
    //   <div className="hidden md:block">
    //     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-28">


    //       <div className="max-w-[1366px] w-full h-[750px] mb-10 bg-white shadow-lg p-24 flex flex-col md:flex-row gap-8 -mt-14">

        
    //         <div className="md:w-[444px] h-[558px] flex flex-col items-center bg-[#E9ECF7] rounded-lg p-6 space-y-4">
    //           <div className="w-48 h-48 rounded-full overflow-hidden mt-10 mb-5">
    //             <img
    //               src={profileData.photoUrl || "default-avatar.png"}
    //               alt="Profile"
    //               className="w-full h-full object-cover"
    //             />
    //           </div>

    //           <div className="text-center">
    //             <h2 className="text-2xl font-bold text-[#2543B1]">
    //               {profileData.name}
    //             </h2>
    //             <p className="text-black font-semibold mb-3">
    //               {profileData.title}
    //             </p>
    //           </div>

    //           <div className="text-center space-y-2">
    //             <p className="text-black font-semibold">{profileData.email}</p>
    //             <p className="text-black font-semibold">{profileData.phone}</p>
    //           </div>

    //           <div className="flex space-x-4">
    //             <a href="#" className="text-[#2543B1] hover:text-blue-700">
    //               <FaFacebook size={24} />
    //             </a>
    //             <a href="#" className="text-[#2543B1] hover:text-blue-700">
    //               <FaLinkedin size={24} />
    //             </a>
    //             <a href="#" className="text-[#2543B1] hover:text-blue-700">
    //               <FaInstagram size={24} />
    //             </a>
    //           </div>
    //         </div>

         
    //         <div className="md:w-[628px] space-y-6">
        
    //           <div className="border rounded-lg p-6 h-[174px]">
    //             <h3 className="text-xl font-semibold text-[#2543B1] mb-4">
    //               Work Experiences
    //             </h3>
    //             <div className="space-y-4">
    //               <div className="flex justify-between">
    //                 <span className="text-black font-medium">
    //                   {profileData.duration1}
    //                 </span>
    //                 <span className="font-medium">
    //                   {profileData.companyName1}
    //                 </span>
    //               </div>
    //               <div className="flex justify-between">
    //                 <span className="text-black font-medium">
    //                   {profileData.duration2}
    //                 </span>
    //                 <span className="font-medium">
    //                   {profileData.companyName2}
    //                 </span>
    //               </div>
    //             </div>
    //           </div>

            
    //           <div className="border rounded-lg p-6 h-[131px]">
    //             <h3 className="text-xl font-semibold text-[#2543B1] mb-4">
    //               Education Qualifications
    //             </h3>
    //             <p className="text-black font-medium">
    //               {profileData.education}
    //             </p>
    //           </div>

           
    //           <div className="border rounded-lg p-6 h-[131px]">
    //             <h3 className="text-xl font-semibold text-[#2543B1] mb-4">
    //               Engineering Projects
    //             </h3>
    //             <p className="text-black font-medium">
    //               {profileData.engineeringProjects}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

     
    //     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-7 py-24 md:hidden">
    //     <div className="max-w-full w-full h-[1130px] mb-10 bg-white  shadow-lg p-8 flex flex-col md:flex-row gap-8 -mt-14">

 
    //       <div className="max-w-full md:w-[444px] w-full h-[558px] flex flex-col items-center bg-[#E9ECF7] rounded-lg p-6 space-y-4">
    //         <div className="w-48 h-48 rounded-full overflow-hidden mt-10 mb-5">
    //           <img
    //             src={profileData.photoUrl || "default-avatar.png"}
    //             alt="Profile"
    //             className="w-full h-full object-cover"
    //           />
    //         </div>

    //         <div className="text-center">
    //           <h2 className="text-[20px] font-bold text-[#2543B1]">
    //             {profileData.name}
    //           </h2>
    //           <p className="text-black font-semibold text-[14px] mb-3">
    //             {profileData.title || "Engineer"}
    //           </p>
    //         </div>

    //         <div className="text-center space-y-2 text-[14px]">
    //           <p className="text-black font-semibold">{profileData.email}</p>
    //           <p className="text-black font-semibold">{profileData.phone}</p>
    //         </div>

    //         <div className="flex space-x-4">
    //           <a href="#" className="text-[#2543B1] hover:text-blue-700">
    //             <FaFacebook size={24} />
    //           </a>
    //           <a href="#" className="text-[#2543B1] hover:text-blue-700">
    //             <FaLinkedin size={24} />
    //           </a>
    //           <a href="#" className="text-[#2543B1] hover:text-blue-700">
    //             <FaInstagram size={24} />
    //           </a>
    //         </div>
    //       </div>

    //       <div className="md:w-[628px] space-y-6">
      
    //         <div className="border rounded-lg p-6 h-[154px]">
    //           <h3 className="text-[18px] font-semibold text-[#2543B1] mb-4">
    //             Work Experiences
    //           </h3>
    //           <div className="space-y-4 text-[12px]">
    //             <div className="flex justify-between ">
    //               <span className="text-black font-medium">
    //                 {profileData.duration1}
    //               </span>
    //               <span className="font-medium">
    //                 {profileData.companyName1}
    //               </span>
    //             </div>
    //             <div className="flex justify-between">
    //               <span className="text-black font-medium">
    //                 {profileData.duration2}
    //               </span>
    //               <span className="font-medium">
    //                 {profileData.companyName2}
    //               </span>
    //             </div>
    //           </div>
    //         </div>

          
    //         <div className="border rounded-lg p-6 h-[125px]">
    //           <h3 className="text-[18px] font-semibold text-[#2543B1] mb-4">
    //             Education Qualifications
    //           </h3>
    //           <p className="text-black text-[12px] font-medium">
    //             {profileData.education}
    //           </p>
    //         </div>

    //         <div className="border rounded-lg p-6 h-[125px]">
    //           <h3 className="text-[18px] font-semibold text-[#2543B1] mb-4">
    //             Engineering Projects
    //           </h3>
    //           <p className="text-black text-[12px] font-medium">
    //             {profileData.engineeringProjects}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
      
    // </>
    <div className="min-h-screen bg-gray-50 p-0 px-6 md:px-0 md:p-8 lg:p-12 ">
    <div className="max-w-7xl mx-auto md:mb-20 mb-28 md:mt-0 mt-10">
      {/* Edit Profile Button */}
      {/* <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/edit-profile", { state: { profileData } })}
          className="bg-[#2D387D] text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-[#1a2359] transition-colors duration-300 flex items-center gap-2"
        >
          <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Profile
        </button>
      </div> */}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12">
        {/* Profile Info */}
        <div className="w-full lg:w-1/3 bg-[#E9ECF7] rounded-lg p-6 space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden">
              <img
                src={profileData.photoUrl || "default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center mt-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2543B1]">{profileData.name}</h2>
              <p className="text-sm md:text-base font-semibold mt-2">{profileData.title || "Engineer"}</p>
            </div>

            <div className="text-center space-y-2 mt-4">
              <p className="text-sm md:text-base font-semibold">{profileData.email}</p>
              <p className="text-sm md:text-base font-semibold">{profileData.phone}</p>
            </div>

            <div className="flex gap-4 mt-6">
              <FaFacebook className="w-5 h-5 md:w-6 md:h-6 text-[#2543B1] hover:text-blue-700 cursor-pointer" />
              <FaLinkedin className="w-5 h-5 md:w-6 md:h-6 text-[#2543B1] hover:text-blue-700 cursor-pointer" />
              <FaInstagram className="w-5 h-5 md:w-6 md:h-6 text-[#2543B1] hover:text-blue-700 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg md:text-xl font-semibold text-[#2543B1] mb-4">Work Experiences</h3>
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <span className="font-medium">{profileData.duration1}</span>
                <span className="font-medium">{profileData.companyName1}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <span className="font-medium">{profileData.duration2}</span>
                <span className="font-medium">{profileData.companyName2}</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg md:text-xl font-semibold text-[#2543B1] mb-4">Education Qualifications</h3>
            <p className="text-sm md:text-base font-medium">{profileData.education}</p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg md:text-xl font-semibold text-[#2543B1] mb-4">Engineering Projects</h3>
            <p className="text-sm md:text-base font-medium">{profileData.engineeringProjects}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default GuestUserProfile;