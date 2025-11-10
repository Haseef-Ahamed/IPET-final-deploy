import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ViewEventsTable = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Fetch all events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://72.60.42.161/api/events-courses/event"
        );
        setEvents(response.data);
        setFilteredEvents(response.data); // Initialize filtered events with all events
      } catch (error) {
        console.error("Error fetching events:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch events. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchEvents();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const results = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.uploaded_date.includes(searchTerm)
    );
    setFilteredEvents(results);
  }, [searchTerm, events]);

  // Handle delete event
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
          setEvents(events.filter((event) => event.id !== id)); // Remove deleted event from state
          Swal.fire({
            title: "Deleted!",
            text: "The event has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error deleting event:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete event. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          View Events
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search events by title, description, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {event.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="text-sm text-gray-900">
                      {event.description.length > 100
                        ? `${event.description.substring(0, 100)}...` // Truncate to 100 characters
                        : event.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(event.uploaded_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/update-event/${event.id}`)}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
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
        <div className="md:hidden space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <div className="mb-3">
                <h3 className="text-lg font-medium text-gray-900">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(event.uploaded_date).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                {event.description.length > 100
                  ? `${event.description.substring(0, 100)}...`
                  : event.description}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/update-event/${event.id}`)}
                  className="flex-1 text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex-1 text-sm bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No events found message */}
        {filteredEvents.length === 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <p className="text-gray-500">No events found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEventsTable;