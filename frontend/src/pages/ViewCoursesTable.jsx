/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ViewCoursesTable = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Fetch all courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://72.60.42.161/api/events-courses/course"
        );
        setCourses(response.data);
        setFilteredCourses(response.data); // Initialize filtered courses with all courses
      } catch (error) {
        console.error("Error fetching courses:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch courses. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchCourses();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const results = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.uploaded_date.includes(searchTerm)
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

  // Handle delete course
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://72.60.42.161/api/events-courses/${id}`
          );
          setCourses(courses.filter((course) => course.id !== id)); // Remove deleted course from state
          Swal.fire({
            title: "Deleted!",
            text: "The course has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error deleting course:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete course. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-blue-600">
          View Courses
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search courses by title, description, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Desktop View - Table */}
        <div className="hidden overflow-hidden bg-white rounded-lg shadow-md md:block">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {course.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="text-sm text-gray-900">
                      {course.description.length > 100
                        ? `${course.description.substring(0, 100)}...` // Truncate to 100 characters
                        : course.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(course.uploaded_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/update-course/${course.id}`)}
                      className="px-3 py-1 mr-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="space-y-4 md:hidden">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
            >
              <div className="mb-3">
                <h3 className="text-lg font-medium text-gray-900">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(course.uploaded_date).toLocaleDateString()}
                </p>
              </div>
              <p className="mb-4 text-sm text-gray-700">
                {course.description.length > 100
                  ? `${course.description.substring(0, 100)}...`
                  : course.description}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/update-course/${course.id}`)}
                  className="flex-1 px-3 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex-1 px-3 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No courses found message */}
        {filteredCourses.length === 0 && (
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No courses found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCoursesTable;