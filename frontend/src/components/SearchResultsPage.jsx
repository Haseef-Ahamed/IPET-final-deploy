/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable react/no-unescaped-entities */
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import scales from "../assets/Scales.svg";
// import graduate from "../assets/Graduate.svg";
// import network from "../assets/Network.svg";
// import drone from "../assets/Drone.svg";
// import graduates from "../assets/Graduates.svg";
// import worker from "../assets/Worker.svg";
// import ViewCourses from "../pages/ViewCourses";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// const SearchResultsPage = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("q");
//   // const [results, setResults] = useState({});
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Define your searchable content
//   const searchableContent = {
//     "CPD Courses": [
//       // {
//       //   title: "CPD Courses 01",
//       //   description:
//       //     "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community..",
//       //   path: "/courses",
//       //   category: "CPD Courses",
//       //   image: scales,
//       // },
//       // {
//       //   title: "CPD Courses 02",
//       //   description:
//       //     "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
//       //   path: "/courses",
//       //   category: "CPD Courses",
//       //   image: graduate,
//       // },
//       // {
//       //   title: "CPD Courses 03",
//       //   description:
//       //     "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
//       //   path: "/courses",
//       //   category: "CPD Courses",
//       //   image: network,
//       // },
//       // {
//       //   title: "CPD Courses 04",
//       //   description:
//       //     "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
//       //   path: "/courses",
//       //   category: "CPD Courses",
//       //   image: drone,
//       // },
//       // {
//       //   title: "CPD Courses 05",
//       //   description:
//       //     "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
//       //   path: "/courses",
//       //   category: "CPD Courses",
//       //   image: graduates,
//       // },
//       // {
//       //   title: "CPD Courses 06",
//       //   description:
//       //     "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
//       //   path: "/courses",
//       //   category: "CPD Courses",
//       //   image: worker,
//       // },
//     ],
//     "News & Events": [
//       {
//         title: "News & Events",
//         description: "Upcoming engineering conferences and symposiums.",
//         path: "/newsevents",
//         category: "News & Events",
//         date: "2024-01-15",
//       },
//     ],
//     // "Engineer Types": [
//     //   {
//     //     title: "Civil Engineer",
//     //     description: "Information about civil engineering career paths.",
//     //     path: "/engineers/civil",
//     //     category: "Engineer Types",
//     //     specializations: ["Structural", "Transportation", "Geotechnical"],
//     //   },
//     //   {
//     //     title: "Mechanical Engineer",
//     //     description: "Details about mechanical engineering profession.",
//     //     path: "/engineers/mechanical",
//     //     category: "Engineer Types",
//     //     specializations: ["HVAC", "Automotive", "Robotics"],
//     //   },
//     // ],
//   };

//   useEffect(() => {
//     const fetchAndFilterCourses = async () => {
//       try {
//         setLoading(true);

//         // Fetch all courses
//         const response = await axios.get(
//           "http://localhost:5000/api/events-courses/course"
//         );

//         if (response.data) {
//           if (query && query.trim()) {
//             // Filter courses based on search query
//             const filtered = response.data.filter((course) =>
//               course.title.toLowerCase().includes(query.toLowerCase())
//             );
//             setFilteredCourses(filtered);
//           } else {
//             // If no query, show all courses
//             setFilteredCourses(response.data);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAndFilterCourses();
//   }, [query]);

//   // useEffect(() => {
//   //   const performSearch = () => {
//   //     setLoading(true);

//   //     // If the query is empty, show all CPD courses using ViewCourses
//   //     if (!query || query.trim() === "") {
//   //       setResults({
//   //         "CPD Courses": [],
//   //       });
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     // Otherwise, perform search as before
//   //     const searchResults = {
//   //       "CPD Courses": navigationConfig["CPD Courses"].items.filter((item) =>
//   //         item.title.toLowerCase().includes(query.toLowerCase())
//   //       ),
//   //     };

//   //     setResults(searchResults);
//   //     setLoading(false);
//   //   };

//   //   performSearch();
//   // }, [query]);

//   // useEffect(() => {
//   //   const performSearch = () => {
//   //     setLoading(true);
//   //     // Simulate API call delay
//   //     setTimeout(() => {
//   //       const searchResults = Object.entries(searchableContent).reduce(
//   //         (acc, [category, items]) => {
//   //           const filtered = items.filter(
//   //             (item) =>
//   //               item.title.toLowerCase().includes(query.toLowerCase()) ||
//   //               item.description.toLowerCase().includes(query.toLowerCase())
//   //           );
//   //           if (filtered.length > 0) {
//   //             acc[category] = filtered;
//   //           }
//   //           return acc;
//   //         },
//   //         {}
//   //       );
//   //       setResults(searchResults);
//   //       setLoading(false);
//   //     }, 500);
//   //   };

//   //   if (query) {
//   //     performSearch();
//   //   }
//   // }, [query]);

//   return (
//     <div className="container px-4 py-8 mx-auto">
//       <h1 className="mb-6 text-3xl font-bold">
//         {query ? `Search Results for: "${query}"` : "All CPD Courses"}
//       </h1>

//       {loading ? (
//         <div className="flex items-center justify-center h-64">
//           <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
//         </div>
//       ) : (
//         <>
//           {filteredCourses.length === 0 ? (
//             <div className="py-8 text-center">
//               <p className="text-lg text-gray-600">
//                 No courses found {query ? "matching your search." : ""}
//               </p>
//             </div>
//           ) : (
//             <ViewCourses coursesToShow={filteredCourses} />
//           )}
//         </>
//       )}
//     </div>
//     // <div className="container px-4 py-8 mx-auto">
//     //   <h1 className="mb-6 text-3xl font-bold">Search Results for: "{query}"</h1>

//     //   {loading ? (
//     //     <div className="flex items-center justify-center h-64">
//     //       <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
//     //     </div>
//     //   ) : (
//     //     <>
//     //       {Object.keys(results).length === 0 ? (
//     //         <div className="py-8 text-center">
//     //           <p className="text-lg text-gray-600">
//     //             No results found for your search.
//     //           </p>
//     //           <p className="mt-2 text-gray-500">
//     //             Try different keywords or browse our categories.
//     //           </p>
//     //         </div>
//     //       ) : (
//     //         Object.entries(results).map(([category, items]) => (
//     //           <div key={category} className="mb-28">
//     //             <h2 className="mb-4 text-2xl font-semibold">{category}</h2>

//     //             {category === "CPD Courses" && (
//     //               <>
//     //                 {query && items.length > 0 ? (
//     //                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//     //                     {items.map((item, index) => (
//     //                       <div
//     //                         key={index}
//     //                         className="transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
//     //                         onClick={() => navigate(item.path)}
//     //                       >
//     //                         {item.image && (
//     //                           <div className="relative h-48 overflow-hidden">
//     //                             <img
//     //                               src={item.image}
//     //                               alt={item.title}
//     //                               className="object-cover w-full h-full"
//     //                             />
//     //                           </div>
//     //                         )}
//     //                         <div className="p-6">
//     //                           <h3 className="mb-2 text-xl font-semibold">
//     //                             {item.title}
//     //                           </h3>
//     //                           <button
//     //                             onClick={(e) => {
//     //                               e.stopPropagation();
//     //                               navigate("/register");
//     //                             }}
//     //                             className="w-full text-white bg-[#2D387D] py-2.5 rounded-md hover:bg-blue-900 transition-colors duration-300 text-sm font-medium"
//     //                           >
//     //                             Register Now
//     //                           </button>
//     //                         </div>
//     //                       </div>
//     //                     ))}
//     //                   </div>
//     //                 ) : (
//     //                   // If no query or no results, show all courses using ViewCourses
//     //                   <ViewCourses />
//     //                 )}
//     //               </>
//     //             )}

//     //             {category !== "CPD Courses" && (
//     //               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//     //                 {items.map((item, index) => (
//     //                   <div
//     //                     key={index}
//     //                     className="transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
//     //                   >
//     //                     {/* Card Content based on category */}
//     //                     {category === "CPD Courses" && (
//     //                       <div>
//     //                         <div className="relative h-[400px]">
//     //                           <img
//     //                             src={item.image}
//     //                             alt={item.title}
//     //                             className="object-cover w-full h-full"
//     //                           />
//     //                         </div>
//     //                         <div className="p-6">
//     //                           <h3 className="mb-2 text-xl font-semibold">
//     //                             {item.title}
//     //                           </h3>
//     //                           <p className="mb-4 text-gray-600">
//     //                             {item.description}
//     //                           </p>
//     //                           <button
//     //                             onClick={() => navigate("/register")}
//     //                             className="w-full h-[66px] text-[24px] bg-[#2D387D] text-white py-2.5 rounded-md hover:bg-blue-900 transition-colors duration-300 text-sm font-medium"
//     //                           >
//     //                             Register Now
//     //                           </button>
//     //                         </div>
//     //                       </div>
//     //                     )}

//     //                     {category === "News & Events" && (
//     //                       <div className="p-6">
//     //                         <div className="mb-2 text-sm text-gray-500">
//     //                           {item.date}
//     //                         </div>
//     //                         <h3 className="mb-2 text-xl font-semibold">
//     //                           {item.title}
//     //                         </h3>
//     //                         <p className="mb-4 text-gray-600">
//     //                           {item.description}
//     //                         </p>
//     //                         <a
//     //                           href={item.path}
//     //                           className="font-medium text-blue-500 hover:text-blue-700"
//     //                         >
//     //                           View Details →
//     //                         </a>
//     //                       </div>
//     //                     )}

//     //                     {category === "Engineer Types" && (
//     //                       <div className="p-6">
//     //                         <h3 className="mb-2 text-xl font-semibold">
//     //                           {item.title}
//     //                         </h3>
//     //                         <p className="mb-4 text-gray-600">
//     //                           {item.description}
//     //                         </p>
//     //                         <div className="mb-4">
//     //                           <h4 className="mb-2 text-sm font-medium text-gray-500">
//     //                             Specializations:
//     //                           </h4>
//     //                           <div className="flex flex-wrap gap-2">
//     //                             {item.specializations.map((spec, i) => (
//     //                               <span
//     //                                 key={i}
//     //                                 className="px-2 py-1 text-sm text-gray-700 bg-gray-100 rounded-full"
//     //                               >
//     //                                 {spec}
//     //                               </span>
//     //                             ))}
//     //                           </div>
//     //                         </div>
//     //                         <a
//     //                           href={item.path}
//     //                           className="font-medium text-blue-500 hover:text-blue-700"
//     //                         >
//     //                           Explore Career →
//     //                         </a>
//     //                       </div>
//     //                     )}
//     //                   </div>
//     //                 ))}
//     //               </div>
//     //             )}
//     //           </div>
//     //         ))
//     //       )}
//     //     </>
//     //   )}
//     // </div>
//   );
// };

// export default SearchResultsPage;

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/events-courses/course"
        );
        
        if (response.data) {
          let filteredCourses = response.data;
          
          if (query) {
            filteredCourses = response.data.filter(course =>
              course.title.toLowerCase().includes(query.toLowerCase())
            );
          }
          
          setCourses(filteredCourses);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [query]);

  return (
    <div className="container px-4 py-16 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">
        {query ? `Search Results for: "${query}"` : "All CPD Courses"}
      </h1>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-lg text-gray-600">
            No courses found {query ? "matching your search." : ""}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="mb-20 overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={course.main_image_url}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#2D387D]">
                  {course.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default SearchResultsPage;