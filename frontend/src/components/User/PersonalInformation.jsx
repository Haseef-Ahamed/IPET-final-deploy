import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import Swal from "sweetalert2";

const PersonalInformation = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [formData, setFormData] = useState({
    title: "",
    nameWithInitials: "",
    nameDenoted: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    nic: "",
    passport: "",
    mobile: "",
    mobileCode: "+94",
    homeTelCode: "+94",
    officeTelCode: "+94",
    homeFaxCode: "+94",
    officeFaxCode: "+94",
    homeTel: "",
    officeTel: "",
    homeFax: "",
    officeFax: "",
    workplace: "",
    designation: "",
    currentAddressLine1: "",
    currentAddressLine2: "",
    currentCity: "",
    currentProvince: "",
    currentCountry: "Sri Lanka",
    officialAddressLine1: "",
    officialAddressLine2: "",
    officialCity: "",
    officialProvince: "",
    officialCountry: "Sri Lanka",
    permanentAddressLine1: "",
    permanentAddressLine2: "",
    permanentCity: "",
    permanentProvince: "",
    permanentCountry: "Sri Lanka",
    profile_picture_path: "",
    birth_certificate_path: "",
  });
  const [loading, setLoading] = useState(true);

  const countries = [
    { code: "AF", name: "Afghanistan", telCode: "+93" },
    { code: "AL", name: "Albania", telCode: "+355" },
    { code: "DZ", name: "Algeria", telCode: "+213" },
    { code: "AS", name: "American Samoa", telCode: "+1-684" },
    { code: "AD", name: "Andorra", telCode: "+376" },
    { code: "AO", name: "Angola", telCode: "+244" },
    { code: "AI", name: "Anguilla", telCode: "+1-264" },
    { code: "AQ", name: "Antarctica", telCode: "+672" },
    { code: "AG", name: "Antigua and Barbuda", telCode: "+1-268" },
    { code: "AR", name: "Argentina", telCode: "+54" },
    { code: "AM", name: "Armenia", telCode: "+374" },
    { code: "AW", name: "Aruba", telCode: "+297" },
    { code: "AU", name: "Australia", telCode: "+61" },
    { code: "AT", name: "Austria", telCode: "+43" },
    { code: "AZ", name: "Azerbaijan", telCode: "+994" },
    { code: "BS", name: "Bahamas", telCode: "+1-242" },
    { code: "BH", name: "Bahrain", telCode: "+973" },
    { code: "BD", name: "Bangladesh", telCode: "+880" },
    { code: "BB", name: "Barbados", telCode: "+1-246" },
    { code: "BY", name: "Belarus", telCode: "+375" },
    { code: "BE", name: "Belgium", telCode: "+32" },
    { code: "BZ", name: "Belize", telCode: "+501" },
    { code: "BJ", name: "Benin", telCode: "+229" },
    { code: "BM", name: "Bermuda", telCode: "+1-441" },
    { code: "BT", name: "Bhutan", telCode: "+975" },
    { code: "BO", name: "Bolivia", telCode: "+591" },
    { code: "BA", name: "Bosnia and Herzegovina", telCode: "+387" },
    { code: "BW", name: "Botswana", telCode: "+267" },
    { code: "BR", name: "Brazil", telCode: "+55" },
    { code: "IO", name: "British Indian Ocean Territory", telCode: "+246" },
    { code: "BN", name: "Brunei Darussalam", telCode: "+673" },
    { code: "BG", name: "Bulgaria", telCode: "+359" },
    { code: "BF", name: "Burkina Faso", telCode: "+226" },
    { code: "BI", name: "Burundi", telCode: "+257" },
    { code: "KH", name: "Cambodia", telCode: "+855" },
    { code: "CM", name: "Cameroon", telCode: "+237" },
    { code: "CA", name: "Canada", telCode: "+1" },
    { code: "CV", name: "Cape Verde", telCode: "+238" },
    { code: "KY", name: "Cayman Islands", telCode: "+1-345" },
    { code: "CF", name: "Central African Republic", telCode: "+236" },
    { code: "TD", name: "Chad", telCode: "+235" },
    { code: "CL", name: "Chile", telCode: "+56" },
    { code: "CN", name: "China", telCode: "+86" },
    { code: "CX", name: "Christmas Island", telCode: "+61" },
    { code: "CC", name: "Cocos (Keeling) Islands", telCode: "+61" },
    { code: "CO", name: "Colombia", telCode: "+57" },
    { code: "KM", name: "Comoros", telCode: "+269" },
    { code: "CG", name: "Congo", telCode: "+242" },
    { code: "CD", name: "Congo, the Democratic Republic of the", telCode: "+243" },
    { code: "CK", name: "Cook Islands", telCode: "+682" },
    { code: "CR", name: "Costa Rica", telCode: "+506" },
    { code: "CI", name: "Cote d'Ivoire", telCode: "+225" },
    { code: "HR", name: "Croatia", telCode: "+385" },
    { code: "CU", name: "Cuba", telCode: "+53" },
    { code: "CY", name: "Cyprus", telCode: "+357" },
    { code: "CZ", name: "Czech Republic", telCode: "+420" },
    { code: "DK", name: "Denmark", telCode: "+45" },
    { code: "DJ", name: "Djibouti", telCode: "+253" },
    { code: "DM", name: "Dominica", telCode: "+1-767" },
    { code: "DO", name: "Dominican Republic", telCode: "+1-809, +1-829, +1-849" },
    { code: "EC", name: "Ecuador", telCode: "+593" },
    { code: "EG", name: "Egypt", telCode: "+20" },
    { code: "SV", name: "El Salvador", telCode: "+503" },
    { code: "GQ", name: "Equatorial Guinea", telCode: "+240" },
    { code: "ER", name: "Eritrea", telCode: "+291" },
    { code: "EE", name: "Estonia", telCode: "+372" },
    { code: "ET", name: "Ethiopia", telCode: "+251" },
    { code: "FK", name: "Falkland Islands (Malvinas)", telCode: "+500" },
    { code: "FO", name: "Faroe Islands", telCode: "+298" },
    { code: "FJ", name: "Fiji", telCode: "+679" },
    { code: "FI", name: "Finland", telCode: "+358" },
    { code: "FR", name: "France", telCode: "+33" },
    { code: "GF", name: "French Guiana", telCode: "+594" },
    { code: "PF", name: "French Polynesia", telCode: "+689" },
    { code: "TF", name: "French Southern Territories", telCode: "+262" },
    { code: "GA", name: "Gabon", telCode: "+241" },
    { code: "GM", name: "Gambia", telCode: "+220" },
    { code: "GE", name: "Georgia", telCode: "+995" },
    { code: "DE", name: "Germany", telCode: "+49" },
    { code: "GH", name: "Ghana", telCode: "+233" },
    { code: "GI", name: "Gibraltar", telCode: "+350" },
    { code: "GR", name: "Greece", telCode: "+30" },
    { code: "GL", name: "Greenland", telCode: "+299" },
    { code: "GD", name: "Grenada", telCode: "+1-473" },
    { code: "GP", name: "Guadeloupe", telCode: "+590" },
    { code: "GU", name: "Guam", telCode: "+1-671" },
    { code: "GT", name: "Guatemala", telCode: "+502" },
    { code: "GN", name: "Guinea", telCode: "+224" },
    { code: "GW", name: "Guinea-Bissau", telCode: "+245" },
    { code: "GY", name: "Guyana", telCode: "+592" },
    { code: "HT", name: "Haiti", telCode: "+509" },
    { code: "HM", name: "Heard Island and McDonald Islands", telCode: "+672" },
    { code: "VA", name: "Holy See (Vatican City State)", telCode: "+379" },
    { code: "HN", name: "Honduras", telCode: "+504" },
    { code: "HK", name: "Hong Kong", telCode: "+852" },
    { code: "HU", name: "Hungary", telCode: "+36" },
    { code: "IS", name: "Iceland", telCode: "+354" },
    { code: "IN", name: "India", telCode: "+91" },
    { code: "ID", name: "Indonesia", telCode: "+62" },
    { code: "IR", name: "Iran, Islamic Republic of", telCode: "+98" },
    { code: "IQ", name: "Iraq", telCode: "+964" },
    { code: "IE", name: "Ireland", telCode: "+353" },
    { code: "IL", name: "Israel", telCode: "+972" },
    { code: "IT", name: "Italy", telCode: "+39" },
    { code: "JM", name: "Jamaica", telCode: "+1-876" },
    { code: "JP", name: "Japan", telCode: "+81" },
    { code: "JO", name: "Jordan", telCode: "+962" },
    { code: "KZ", name: "Kazakhstan", telCode: "+7" },
    { code: "KE", name: "Kenya", telCode: "+254" },
    { code: "KI", name: "Kiribati", telCode: "+686" },
    { code: "KP", name: "Korea, Democratic People's Republic of", telCode: "+850" },
    { code: "KR", name: "Korea, Republic of", telCode: "+82" },
    { code: "KW", name: "Kuwait", telCode: "+965" },
    { code: "KG", name: "Kyrgyzstan", telCode: "+996" },
    { code: "LA", name: "Lao People's Democratic Republic", telCode: "+856" },
    { code: "LV", name: "Latvia", telCode: "+371" },
    { code: "LB", name: "Lebanon", telCode: "+961" },
    { code: "LS", name: "Lesotho", telCode: "+266" },
    { code: "LR", name: "Liberia", telCode: "+231" },
    { code: "LY", name: "Libyan Arab Jamahiriya", telCode: "+218" },
    { code: "LI", name: "Liechtenstein", telCode: "+423" },
    { code: "LT", name: "Lithuania", telCode: "+370" },
    { code: "LU", name: "Luxembourg", telCode: "+352" },
    { code: "MO", name: "Macao", telCode: "+853" },
    { code: "MK", name: "Macedonia, the Former Yugoslav Republic of", telCode: "+389" },
    { code: "MG", name: "Madagascar", telCode: "+261" },
    { code: "MW", name: "Malawi", telCode: "+265" },
    { code: "MY", name: "Malaysia", telCode: "+60" },
    { code: "MV", name: "Maldives", telCode: "+960" },
    { code: "ML", name: "Mali", telCode: "+223" },
    { code: "MT", name: "Malta", telCode: "+356" },
    { code: "MH", name: "Marshall Islands", telCode: "+692" },
    { code: "MQ", name: "Martinique", telCode: "+596" },
    { code: "MR", name: "Mauritania", telCode: "+222" },
    { code: "MU", name: "Mauritius", telCode: "+230" },
    { code: "YT", name: "Mayotte", telCode: "+262" },
    { code: "MX", name: "Mexico", telCode: "+52" },
    { code: "FM", name: "Micronesia, Federated States of", telCode: "+691" },
    { code: "MD", name: "Moldova, Republic of", telCode: "+373" },
    { code: "MC", name: "Monaco", telCode: "+377" },
    { code: "MN", name: "Mongolia", telCode: "+976" },
    { code: "MS", name: "Montserrat", telCode: "+1-664" },
    { code: "MA", name: "Morocco", telCode: "+212" },
    { code: "MZ", name: "Mozambique", telCode: "+258" },
    { code: "MM", name: "Myanmar", telCode: "+95" },
    { code: "NA", name: "Namibia", telCode: "+264" },
    { code: "NR", name: "Nauru", telCode: "+674" },
    { code: "NP", name: "Nepal", telCode: "+977" },
    { code: "NL", name: "Netherlands", telCode: "+31" },
    { code: "AN", name: "Netherlands Antilles", telCode: "+599" },
    { code: "NC", name: "New Caledonia", telCode: "+687" },
    { code: "NZ", name: "New Zealand", telCode: "+64" },
    { code: "NI", name: "Nicaragua", telCode: "+505" },
    { code: "NE", name: "Niger", telCode: "+227" },
    { code: "NG", name: "Nigeria", telCode: "+234" },
    { code: "NU", name: "Niue", telCode: "+683" },
    { code: "NF", name: "Norfolk Island", telCode: "+672" },
    { code: "MP", name: "Northern Mariana Islands", telCode: "+1-670" },
    { code: "NO", name: "Norway", telCode: "+47" },
    { code: "OM", name: "Oman", telCode: "+968" },
    { code: "PK", name: "Pakistan", telCode: "+92" },
    { code: "PW", name: "Palau", telCode: "+680" },
    { code: "PS", name: "Palestinian Territory, Occupied", telCode: "+970" },
    { code: "PA", name: "Panama", telCode: "+507" },
    { code: "PG", name: "Papua New Guinea", telCode: "+675" },
    { code: "PY", name: "Paraguay", telCode: "+595" },
    { code: "PE", name: "Peru", telCode: "+51" },
    { code: "PH", name: "Philippines", telCode: "+63" },
    { code: "PN", name: "Pitcairn", telCode: "+64" },
    { code: "PL", name: "Poland", telCode: "+48" },
    { code: "PT", name: "Portugal", telCode: "+351" },
    { code: "PR", name: "Puerto Rico", telCode: "+1-787, +1-939" },
    { code: "QA", name: "Qatar", telCode: "+974" },
    { code: "RE", name: "Reunion", telCode: "+262" },
    { code: "RO", name: "Romania", telCode: "+40" },
    { code: "RU", name: "Russian Federation", telCode: "+7" },
    { code: "RW", name: "Rwanda", telCode: "+250" },
    { code: "SH", name: "Saint Helena", telCode: "+290" },
    { code: "KN", name: "Saint Kitts and Nevis", telCode: "+1-869" },
    { code: "LC", name: "Saint Lucia", telCode: "+1-758" },
    { code: "PM", name: "Saint Pierre and Miquelon", telCode: "+508" },
    { code: "VC", name: "Saint Vincent and the Grenadines", telCode: "+1-784" },
    { code: "WS", name: "Samoa", telCode: "+685" },
    { code: "SM", name: "San Marino", telCode: "+378" },
    { code: "ST", name: "Sao Tome and Principe", telCode: "+239" },
    { code: "SA", name: "Saudi Arabia", telCode: "+966" },
    { code: "SN", name: "Senegal", telCode: "+221" },
    { code: "RS", name: "Serbia", telCode: "+381" },
    { code: "SC", name: "Seychelles", telCode: "+248" },
    { code: "SL", name: "Sierra Leone", telCode: "+232" },
    { code: "SG", name: "Singapore", telCode: "+65" },
    { code: "SK", name: "Slovakia", telCode: "+421" },
    { code: "SI", name: "Slovenia", telCode: "+386" },
    { code: "SB", name: "Solomon Islands", telCode: "+677" },
    { code: "SO", name: "Somalia", telCode: "+252" },
    { code: "ZA", name: "South Africa", telCode: "+27" },
    { code: "GS", name: "South Georgia and the South Sandwich Islands", telCode: "+500" },
    { code: "ES", name: "Spain", telCode: "+34" },
    { code: "LK", name: "Sri Lanka", telCode: "+94" },
    { code: "SD", name: "Sudan", telCode: "+249" },
    { code: "SR", name: "Suriname", telCode: "+597" },
    { code: "SJ", name: "Svalbard and Jan Mayen", telCode: "+47" },
    { code: "SZ", name: "Swaziland", telCode: "+268" },
    { code: "SE", name: "Sweden", telCode: "+46" },
    { code: "CH", name: "Switzerland", telCode: "+41" },
    { code: "SY", name: "Syrian Arab Republic", telCode: "+963" },
    { code: "TW", name: "Taiwan, Province of China", telCode: "+886" },
    { code: "TJ", name: "Tajikistan", telCode: "+992" },
    { code: "TZ", name: "Tanzania, United Republic of", telCode: "+255" },
    { code: "TH", name: "Thailand", telCode: "+66" },
    { code: "TL", name: "Timor-Leste", telCode: "+670" },
    { code: "TG", name: "Togo", telCode: "+228" },
    { code: "TK", name: "Tokelau", telCode: "+690" },
    { code: "TO", name: "Tonga", telCode: "+676" },
    { code: "TT", name: "Trinidad and Tobago", telCode: "+1-868" },
    { code: "TN", name: "Tunisia", telCode: "+216" },
    { code: "TR", name: "Turkey", telCode: "+90" },
    { code: "TM", name: "Turkmenistan", telCode: "+993" },
    { code: "TC", name: "Turks and Caicos Islands", telCode: "+1-649" },
    { code: "TV", name: "Tuvalu", telCode: "+688" },
    { code: "UG", name: "Uganda", telCode: "+256" },
    { code: "UA", name: "Ukraine", telCode: "+380" },
    { code: "AE", name: "United Arab Emirates", telCode: "+971" },
    { code: "GB", name: "United Kingdom", telCode: "+44" },
    { code: "US", name: "United States", telCode: "+1" },
    { code: "UM", name: "United States Minor Outlying Islands", telCode: "+1" },
    { code: "UY", name: "Uruguay", telCode: "+598" },
    { code: "UZ", name: "Uzbekistan", telCode: "+998" },
    { code: "VU", name: "Vanuatu", telCode: "+678" },
    { code: "VE", name: "Venezuela", telCode: "+58" },
    { code: "VN", name: "Viet Nam", telCode: "+84" },
    { code: "VG", name: "Virgin Islands, British", telCode: "+1-284" },
    { code: "VI", name: "Virgin Islands, U.S.", telCode: "+1-340" },
    { code: "WF", name: "Wallis and Futuna", telCode: "+681" },
    { code: "EH", name: "Western Sahara", telCode: "+212" },
    { code: "YE", name: "Yemen", telCode: "+967" },
    { code: "ZM", name: "Zambia", telCode: "+260" },
    { code: "ZW", name: "Zimbabwe", telCode: "+263" },
  ];

  const sriLankanProvinces = [
    "Central Province",
    "Eastern Province",
    "North Central Province",
    "Northern Province",
    "North Western Province",
    "Sabaragamuwa Province",
    "Southern Province",
    "Uva Province",
    "Western Province",
  ];

  const tabs = [
    "Personal Information",
    "Academic Qualifications",
    "Training & Experience",
    "Professional Memberships",
  ];
  const mobileTabs = ["Personal Information"];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://72.60.42.161/api/user-details/${userId}`);
        const userData = response.data;

        // Convert the dob field to yyyy-MM-dd format
        if (userData.dob) {
          const date = new Date(userData.dob);
          const formattedDate = date.toISOString().split("T")[0];
          userData.dob = formattedDate;
        }

        setFormData(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          title: "Fetch Error",
          text: "Failed to load user details.",
        });
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      if (name === "profile_picture" && !files[0].type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please upload a valid image file.",
        });
        return;
      }
      if (name === "birth_certificate" && files[0].type !== "application/pdf") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please upload a valid PDF file.",
        });
        return;
      }
      if (files[0].size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "File size must be less than 5MB.",
        });
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", files[0]);
        const endpoint =
          name === "profile_picture"
            ? "upload/profile-picture"
            : "upload/birth-certificate";
        const response = await axios.post(`http://72.60.42.161/api/${endpoint}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setFormData((prev) => ({
          ...prev,
          [`${name}_path`]: response.data.filePath,
        }));
      } catch (error) {
        console.error(`Error uploading ${name}:`, error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to upload ${name === "profile_picture" ? "profile picture" : "birth certificate"}.`,
        });
      }
    }
  };

  const handleCertificateDownload = async () => {
    try {
      if (!formData.birth_certificate_path) {
        Swal.fire({
          icon: "error",
          title: "No Certificate",
          text: "No birth certificate available for download.",
        });
        return;
      }

      const response = await axios({
        url: `http://72.60.42.161/api/download-birth-certificate/${userId}`,
        method: "GET",
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = formData.birth_certificate_path.split("/").pop() || "certificate.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Unable to download the certificate.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://72.60.42.161/api/update-user/${userId}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message === "User updated successfully!") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User information updated successfully!",
          confirmButtonColor: "#2A3990",
        });
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user information.",
        confirmButtonColor: "#2A3990",
      });
    }
  };

  const handleNext = () => {
    navigate(`/acadamic-info/${userId}`);
  };

  return (
    <div className="bg-[#D9D9D9] lg:py-4 py-6 lg:px-6 px-4">
      <div className="max-w-[1360px] mx-auto lg:bg-white lg:px-8 lg:py-6 py-4 rounded-lg">
        {/* Profile Picture (Mobile: Top Center) */}
        <div className="lg:hidden flex justify-center mb-6">
          <div className="w-[88px] h-[90px] bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            {formData.profile_picture_path ? (
              <img
                src={formData.profile_picture_path}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            ) : (
              <svg
                width="88"
                height="90"
                viewBox="0 0 153 142"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="76.5" cy="74" rx="76.5" ry="78" fill="#D9D9D9" />
                <path
                  d="M76 70.5C69.5375 70.5 64.0052 68.3214 59.4031 63.9641C54.801 59.6068 52.5 54.3687 52.5 48.25C52.5 42.1313 54.801 36.8932 59.4031 32.5359C64.0052 28.1786 69.5375 26 76 26C82.4625 26 87.9948 28.1786 92.5969 32.5359C97.199 36.8932 99.5 42.1313 99.5 48.25C99.5 54.3687 97.199 59.6068 92.5969 63.9641C87.9948 68.3214 82.4625 70.5 76 70.5ZM29 115V99.425C29 96.2729 29.8578 93.3767 31.5733 90.7364C33.2888 88.096 35.5643 86.0787 38.4 84.6844C44.4708 81.8104 50.6396 79.6559 56.9062 78.2207C63.1729 76.7856 69.5375 76.0662 76 76.0625C82.4625 76.0588 88.8271 76.7782 95.0937 78.2207C101.36 79.6633 107.529 81.8178 113.6 84.6844C116.44 86.075 118.717 88.0923 120.433 90.7364C122.148 93.3804 123.004 96.2766 123 99.425V115H29Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative flex items-center justify-start lg:gap-4">
              {(window.innerWidth < 1024 ? mobileTabs : tabs).map((tabName) => (
                <button
                  key={tabName}
                  onClick={() => handleStepClick(tabName)}
                  className={`relative py-2 px-4 h-[48px] sm:h-[56px] text-[14px] sm:text-[16px] font-[500] rounded-md transition-colors ${
                    window.innerWidth < 1024
                      ? "w-full text-center bg-[#2A3990] text-white"
                      : activeTab === tabName
                      ? "bg-[#2A3990] text-white px-6"
                      : "text-gray-700 hover:bg-gray-200 px-6"
                  }`}
                  disabled={window.innerWidth < 1024 && tabName !== "Personal Information"}
                >
                  {tabName}
                  {activeTab === tabName && (
                    <div className="absolute -bottom-[8px] left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#2A3990]"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2A3990]"></div>
        </div>

        {/* Form Content */}
        <div className="lg:bg-[#EDEDED] lg:p-6 p-4 rounded-lg lg:shadow-sm">
          <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-[18px] sm:text-[20px] font-[700] mb-6 text-[#2A3990]">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Title *
                  </label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Name With Initials *
                  </label>
                  <input
                    type="text"
                    name="nameWithInitials"
                    value={formData.nameWithInitials}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Name Denoted by Initials *
                  </label>
                  <input
                    type="text"
                    name="nameDenoted"
                    value={formData.nameDenoted}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Gender *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleInputChange}
                        className="mr-2"
                        required
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleInputChange}
                        className="mr-2"
                        required
                      />
                      Female
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    NIC *
                  </label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    name="passport"
                    value={formData.passport}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="flex items-center rounded border border-gray-300">
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
                                countries.find((country) => country.telCode === formData.mobileCode)
                                  ?.code || "LK"
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
                        dropdownIndicator: (provided) => ({ ...provided, padding: "0 8px" }),
                        indicatorSeparator: () => ({ display: "none" }),
                      }}
                    />
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
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Home Telephone Number
                  </label>
                  <div className="flex items-center rounded border border-gray-300">
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
                        value: formData.homeTelCode,
                        label: (
                          <div className="flex items-center gap-2">
                            <ReactCountryFlag
                              countryCode={
                                countries.find((country) => country.telCode === formData.homeTelCode)
                                  ?.code || "LK"
                              }
                              svg
                              style={{ width: "20px", height: "15px" }}
                            />
                            <span>{formData.homeTelCode}</span>
                          </div>
                        ),
                      }}
                      onChange={(selectedOption) => {
                        handleInputChange({
                          target: { name: "homeTelCode", value: selectedOption.value },
                        });
                      }}
                      className="flex-1"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "none",
                          boxShadow: "none",
                        }),
                        dropdownIndicator: (provided) => ({ ...provided, padding: "0 8px" }),
                        indicatorSeparator: () => ({ display: "none" }),
                      }}
                    />
                    <input
                      type="number"
                      name="homeTel"
                      placeholder="725566777"
                      value={formData.homeTel}
                      onChange={handleInputChange}
                      className="flex-1 rounded-r p-2 no-arrows focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Office Telephone Number
                  </label>
                  <div className="flex items-center rounded border border-gray-300">
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
                        value: formData.officeTelCode,
                        label: (
                          <div className="flex items-center gap-2">
                            <ReactCountryFlag
                              countryCode={
                                countries.find((country) => country.telCode === formData.officeTelCode)
                                  ?.code || "LK"
                              }
                              svg
                              style={{ width: "20px", height: "15px" }}
                            />
                            <span>{formData.officeTelCode}</span>
                          </div>
                        ),
                      }}
                      onChange={(selectedOption) => {
                        handleInputChange({
                          target: { name: "officeTelCode", value: selectedOption.value },
                        });
                      }}
                      className="flex-1"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "none",
                          boxShadow: "none",
                        }),
                        dropdownIndicator: (provided) => ({ ...provided, padding: "0 8px" }),
                        indicatorSeparator: () => ({ display: "none" }),
                      }}
                    />
                    <input
                      type="number"
                      name="officeTel"
                      placeholder="725566777"
                      value={formData.officeTel}
                      onChange={handleInputChange}
                      className="flex-1 rounded-r p-2 no-arrows focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Home Fax Number
                  </label>
                  <div className="flex items-center rounded border border-gray-300">
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
                        value: formData.homeFaxCode,
                        label: (
                          <div className="flex items-center gap-2">
                            <ReactCountryFlag
                              countryCode={
                                countries.find((country) => country.telCode === formData.homeFaxCode)
                                  ?.code || "LK"
                              }
                              svg
                              style={{ width: "20px", height: "15px" }}
                            />
                            <span>{formData.homeFaxCode}</span>
                          </div>
                        ),
                      }}
                      onChange={(selectedOption) => {
                        handleInputChange({
                          target: { name: "homeFaxCode", value: selectedOption.value },
                        });
                      }}
                      className="flex-1"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "none",
                          boxShadow: "none",
                        }),
                        dropdownIndicator: (provided) => ({ ...provided, padding: "0 8px" }),
                        indicatorSeparator: () => ({ display: "none" }),
                      }}
                    />
                    <input
                      type="number"
                      name="homeFax"
                      placeholder="725566777"
                      value={formData.homeFax}
                      onChange={handleInputChange}
                      className="flex-1 rounded-r p-2 no-arrows focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Office Fax Number
                  </label>
                  <div className="flex items-center rounded border border-gray-300">
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
                        value: formData.officeFaxCode,
                        label: (
                          <div className="flex items-center gap-2">
                            <ReactCountryFlag
                              countryCode={
                                countries.find((country) => country.telCode === formData.officeFaxCode)
                                  ?.code || "LK"
                              }
                              svg
                              style={{ width: "20px", height: "15px" }}
                            />
                            <span>{formData.officeFaxCode}</span>
                          </div>
                        ),
                      }}
                      onChange={(selectedOption) => {
                        handleInputChange({
                          target: { name: "officeFaxCode", value: selectedOption.value },
                        });
                      }}
                      className="flex-1"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "none",
                          boxShadow: "none",
                        }),
                        dropdownIndicator: (provided) => ({ ...provided, padding: "0 8px" }),
                        indicatorSeparator: () => ({ display: "none" }),
                      }}
                    />
                    <input
                      type="number"
                      name="officeFax"
                      placeholder="725566777"
                      value={formData.officeFax}
                      onChange={handleInputChange}
                      className="flex-1 rounded-r p-2 no-arrows focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Workplace *
                  </label>
                  <input
                    type="text"
                    name="workplace"
                    value={formData.workplace}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profile_picture"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    accept="image/*"
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                    Birth Certificate
                  </label>
                  {formData.birth_certificate_path && (
                    <div className="mb-2">
                      <button
                        type="button"
                        onClick={handleCertificateDownload}
                        className="text-[14px] sm:text-[16px] text-[#2A3990] hover:underline"
                      >
                        Download Existing Certificate
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    name="birth_certificate"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    accept="application/pdf"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Current Address Section */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
                  <h3 className="text-[16px] font-[600] text-gray-700 mb-4">
                    Current Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        name="currentAddressLine1"
                        value={formData.currentAddressLine1}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="currentAddressLine2"
                        value={formData.currentAddressLine2}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="currentCity"
                        value={formData.currentCity}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Province *
                      </label>
                      {formData.currentCountry === "Sri Lanka" ? (
                        <select
                          name="currentProvince"
                          value={formData.currentProvince}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                          required
                        >
                          <option value="">Select Province</option>
                          {sriLankanProvinces.map((province, index) => (
                            <option key={index} value={province}>
                              {province}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="currentProvince"
                          value={formData.currentProvince}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                          placeholder="Enter Province/State"
                          required
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        name="currentCountry"
                        value={formData.currentCountry}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      >
                        <option value="">Select</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Permanent Address Section */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
                  <h3 className="text-[16px] font-[600] text-gray-700 mb-4">
                    Permanent Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        name="permanentAddressLine1"
                        value={formData.permanentAddressLine1}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="permanentAddressLine2"
                        value={formData.permanentAddressLine2}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="permanentCity"
                        value={formData.permanentCity}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Province *
                      </label>
                      {formData.permanentCountry === "Sri Lanka" ? (
                        <select
                          name="permanentProvince"
                          value={formData.permanentProvince}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                          required
                        >
                          <option value="">Select Province</option>
                          {sriLankanProvinces.map((province, index) => (
                            <option key={index} value={province}>
                              {province}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="permanentProvince"
                          value={formData.permanentProvince}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                          placeholder="Enter Province/State"
                          required
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        name="permanentCountry"
                        value={formData.permanentCountry}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      >
                        <option value="">Select</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Official Address Section */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
                  <h3 className="text-[16px] font-[600] text-gray-700 mb-4">
                    Official Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        name="officialAddressLine1"
                        value={formData.officialAddressLine1}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="officialAddressLine2"
                        value={formData.officialAddressLine2}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="officialCity"
                        value={formData.officialCity}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Province *
                      </label>
                      {formData.officialCountry === "Sri Lanka" ? (
                        <select
                          name="officialProvince"
                          value={formData.officialProvince}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                          required
                        >
                          <option value="">Select Province</option>
                          {sriLankanProvinces.map((province, index) => (
                            <option key={index} value={province}>
                              {province}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="officialProvince"
                          value={formData.officialProvince}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                          placeholder="Enter Province/State"
                          required
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        name="officialCountry"
                        value={formData.officialCountry}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      >
                        <option value="">Select</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-4 mt-6 flex-col sm:flex-row">
              <button
                type="submit"
                className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors mb-20"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;