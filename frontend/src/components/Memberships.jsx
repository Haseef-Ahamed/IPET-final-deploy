/* eslint-disable react/prop-types */

import memebership_bg from "../assets/Membership_bg.svg";
import youthClub from "../assets/YouthClub.svg";
import Fric from "../assets/Fric.svg";
import techHub from "../assets/Tech_envirinment.svg";

const YouthClubIcon = () => (
  <img
    src={youthClub}
    alt="Youth Club"
    className="w-12 h-12 md:w-[141px] sm:w-[100px] md:h-[104px] sm:h-[35px]"
  />
);

const FRICIcon = () => (
  <img
    src={Fric}
    alt="FRIC"
    className="w-12 h-12 md:w-[87px] sm:w-[50px] md:h-[104px] sm:h-[35px]"
  />
);

const TechHubIcon = () => (
  <img
    src={techHub}
    alt="Tech Hub"
    className="w-12 h-12 md:w-[120px] sm:w-[50px] md:h-[104px] sm:h-[35px]"
  />
);

const MembershipCard = ({ title, description, Icon }) => {
  return (
    <div
      //   initial={{ opacity: 0, y: 20 }}
      //   whileInView={{ opacity: 1, y: 0 }}
      //   transition={{ duration: 0.5 }}
      //   whileHover={{ scale: 1.02 }}
      className="bg-[#E9ECF7] p-6 md:p-8 shadow-lg backdrop-blur-sm md:w-[350px] sm:w-[180px] md:h-[340px] sm:h-[200px]"
    >
      <div className="">
        <div className="flex flex-col items-center md:space-y-4  sm:space-x-1">
          <Icon />
          <h3 className="text-[#2543B1] text-lg md:text-[20px] sm:text-[10px] font-[600] text-center">
            {title}
          </h3>
          <p className="text-[#777777] text-center text-sm md:text-[16px] sm:text-[10px] font-[300]">
            {description}
          </p>
          <button className="mt-4 text-[#000000] font-[600] md:text-[16px] sm:text-[14px] hover:text-blue-700 transition-colors duration-300 group">
            Explore More
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
              +
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Memberships = () => {
  const memberships = [
    {
      title: "Youth Club",
      description:
        "Take control of your future in the rapidly growing with Youth Club in Sri Lanka",
      Icon: YouthClubIcon,
    },
    {
      title: "FRIC",
      description:
        "Take control of your future in the rapidly growing with Youth Club in Sri Lanka",
      Icon: FRICIcon,
    },
    {
      title: "Tech Innovators Hub",
      description:
        "Take control of your future in the rapidly growing with Youth Club in Sri Lanka",
      Icon: TechHubIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full py-12 md:py-16 lg:py-24">
      <div className="relative z-10 container mx-auto px-4 sm:px-0 md:px-4">
        <div className="text-center space-y-2 md:mb-16 sm:mb-16">
          <p className="text-gray-600 text-sm md:text-[20px] font-[400]">
            Memberships
          </p>
          <h2 className="text-[#1e3a8a] md:text-[30px]  font-[600]">
            What we offer for your future
          </h2>
        </div>

        <div className="relative aspect-[16/9] w-full max-w-[1360px] mx-auto mt-20 md:-mb-10 sm:mb-20 ">
          <img
            src={memebership_bg}
            alt="membership background"
            className="md:w-[1300px] sm:w-[1200px] md:h-[509px] sm:h-[500px] object-cover object-center"
          />

          <div className="absolute inset-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  md:gap-20 sm:gap-28 p-4 md:p-5 md:-bottom-20 sm:-bottom-28 md:mt-48 sm:mt-64 mr-6 md:-ml-6 sm:-ml-16">
            {memberships.map((membership, index) => (
              <MembershipCard
                key={index}
                title={membership.title}
                description={membership.description}
                Icon={membership.Icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memberships;
