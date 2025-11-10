import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";

const AdminRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    nameWithInitials: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    nic: "",
    mobile: "",
    mobileCode: "+94", // Default value for mobile
    address: "", // Single address field
    password: "", // Password field
  });

  const [errors, setErrors] = useState({}); // State to store error messages

  const countries = [
    { code: "LK", name: "Sri Lanka", telCode: "+94" },
    // Add other countries if needed
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update the telephone code if the country changes
    if (name === "mobileCode") {
      const selectedCountry = countries.find((country) => country.telCode === value);
      if (selectedCountry) {
        setFormData((prevData) => ({
          ...prevData,
          mobileCode: selectedCountry.telCode,
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check each required field
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.nameWithInitials) newErrors.nameWithInitials = "Name with initials is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.nic) newErrors.nic = "NIC is required.";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long and include letters, numbers, and symbols.";
    }

    // NIC validation
    const nicRegex = /^(\d{9}[Vv]|\d{12})$/;
    if (!nicRegex.test(formData.nic)) {
      newErrors.nic = "NIC must be either 9 digits followed by 'V' or 'v' or 12 digits.";
    }

    // DOB validation (must be at least 18 years old)
    const today = new Date();
    const dobDate = new Date(formData.dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    if (age < 18 || (age === 18 && today.getMonth() < dobDate.getMonth()) || (age === 18 && today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())) {
      newErrors.dob = "You must be at least 18 years old.";
    }

    setErrors(newErrors); // Update the errors state

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    try {
      // Send the form data to the backend API
      const response = await fetch("https://ipetlogin-7guixxcyh-dineshs-projects-1830e570.vercel.app/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      const result = await response.json();
      console.log(result.message);

      // Navigate to a success page or show a success message
      navigate("/admin-registration-success");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to submit form data. Please try again.");
    }
  };

  // Calculate the maximum date for DOB (18 years ago from today)
  const today = new Date();
  const maxDobDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  return (
    <div className="min-h-screen bg-[#EDEDED] px-0 py-8">
      <div className="max-w-[1500px] mx-auto bg-[#EDEDED] mb-24 rounded-lg lg:px-16 px-8 py-6">
        <h1 className="text-2xl font-semibold lg:text-left text-center mb-4">
          Admin Registration Form
        </h1>

        <div className="max-w-[1430px] mx-auto lg:bg-white rounded-lg lg:shadow-md lg:p-6">
          <form onSubmit={handleSubmit} className="lg:space-y-6 bg-[#EDEDED] lg:p-6 rounded-lg">
            <div className="lg:bg-white bg-[#EDEDED] lg:p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[18px] text-[#000000] font-[700] mb-1 lg:mt-0 mt-10">
                      Title : *
                    </label>
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full border border-black rounded p-2"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr">Dr</option>
                      <option value="Prof">Prof</option>
                    </select>
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                        Name With Initials : *
                      </label>
                      <input
                        type="text"
                        name="nameWithInitials"
                        placeholder="A B C"
                        value={formData.nameWithInitials}
                        onChange={handleInputChange}
                        className="w-full border border-black rounded p-2"
                        required
                      />
                      {errors.nameWithInitials && (
                        <p className="text-red-500 text-sm mt-1">{errors.nameWithInitials}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                        &nbsp;
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Perera"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-black rounded p-2"
                        required
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-3 text-[18px] text-[#000000] font-[700]">
                      Gender : *
                    </label>
                    <div className="flex gap-4 lg:mb-0 mb-10">
                      <label className="flex items-center mb-4">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />{" "}
                        Male
                      </label>
                      <label className="flex items-center lg:mb-4">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />{" "}
                        Female
                      </label>
                    </div>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                      Date Of Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full border border-black rounded p-2"
                      max={maxDobDate.toISOString().split("T")[0]} // Restrict DOB to 18 years ago
                      required
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                      Address : *
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border border-black rounded p-2"
                      required
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 lg:mt-[89.5px]">
                  <div>
                    <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                      Email Address : *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-black rounded p-2"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                      NIC : *
                    </label>
                    <input
                      type="text"
                      name="nic"
                      value={formData.nic}
                      onChange={handleInputChange}
                      className="w-full border border-black rounded p-2"
                      required
                    />
                    {errors.nic && (
                      <p className="text-red-500 text-sm mt-1">{errors.nic}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                      Mobile Number 1 : *
                    </label>
                    <div className="flex items-center rounded border border-black">
                      <div className="flex items-center">
                        <Select
                          options={countries.map((country) => ({
                            value: country.telCode,
                            label: (
                              <div className="flex items-center gap-2">
                                <ReactCountryFlag
                                  countryCode={country.code}
                                  svg
                                  style={{ width: "20px", height: "15px" }}
                                />
                                <span>{country.telCode}</span>
                              </div>
                            ),
                          }))}
                          value={{
                            value: formData.mobileCode,
                            label: (
                              <div className="flex items-center gap-2">
                                <ReactCountryFlag
                                  countryCode={
                                    countries.find(
                                      (country) => country.telCode === formData.mobileCode
                                    )?.code || "LK"
                                  }
                                  svg
                                  style={{ width: "20px", height: "15px" }}
                                />
                                <span>{formData.mobileCode}</span>
                              </div>
                            ),
                          }}
                          onChange={(selectedOption) => {
                            handleInputChange({
                              target: { name: "mobileCode", value: selectedOption.value },
                            });
                          }}
                          className="flex-1"
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              border: "none",
                              boxShadow: "none",
                            }),
                            dropdownIndicator: (provided) => ({
                              ...provided,
                              padding: "0 8px",
                            }),
                            indicatorSeparator: () => ({ display: "none" }),
                          }}
                        />
                      </div>
                      <input
                        type="number"
                        name="mobile"
                        placeholder="725566777"
                        value={formData.mobile}
                        onChange={(e) => {
                          const value = e.target.value.replace(/^0+/, "");
                          handleInputChange({ target: { name: "mobile", value } });
                        }}
                        className="flex-1 rounded-r p-2 no-arrows focus:outline-none"
                        required
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                      Password : *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full border border-black rounded p-2"
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start mt-10 mb-5">
              <button
                type="submit"
                className="lg:w-[83px] w-full px-4 py-2 bg-[#2D387D] text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistrationPage;