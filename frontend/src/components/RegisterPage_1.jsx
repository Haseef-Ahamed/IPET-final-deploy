import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";

const RegisterPage_1 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  const [picturePreview, setPicturePreview] = useState(null);
  const [pictureName, setPictureName] = useState("");
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [certificateName, setCertificateName] = useState("");
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
    password: "", 
  });

  const [errors, setErrors] = useState({}); 

  const handleStepClick = (step) => {
    setActiveStep(step);
    switch (step) {
      case 1:
        navigate("/register");
        break;
      case 2:
        navigate("/register/register-acadamic");
        break;
      case 3:
        navigate("/register/register-acadamic/register-proposes");
        break;
      case 4:
        navigate("/register/register-acadamic/register-proposes/training");
        break;
      case 5:
        navigate(
          "/register/register-acadamic/register-proposes/training/professional-membership"
        );
        break;
      default:
        break;
    }
  };

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

  const countries = [
    { code: 'AF', name: 'Afghanistan', telCode: '+93' },
    { code: 'AL', name: 'Albania', telCode: '+355' },
    { code: 'DZ', name: 'Algeria', telCode: '+213' },
    { code: 'AS', name: 'American Samoa', telCode: '+1-684' },
    { code: 'AD', name: 'Andorra', telCode: '+376' },
    { code: 'AO', name: 'Angola', telCode: '+244' },
    { code: 'AI', name: 'Anguilla', telCode: '+1-264' },
    { code: 'AQ', name: 'Antarctica', telCode: '+672' },
    { code: 'AG', name: 'Antigua and Barbuda', telCode: '+1-268' },
    { code: 'AR', name: 'Argentina', telCode: '+54' },
    { code: 'AM', name: 'Armenia', telCode: '+374' },
    { code: 'AW', name: 'Aruba', telCode: '+297' },
    { code: 'AU', name: 'Australia', telCode: '+61' },
    { code: 'AT', name: 'Austria', telCode: '+43' },
    { code: 'AZ', name: 'Azerbaijan', telCode: '+994' },
    { code: 'BS', name: 'Bahamas', telCode: '+1-242' },
    { code: 'BH', name: 'Bahrain', telCode: '+973' },
    { code: 'BD', name: 'Bangladesh', telCode: '+880' },
    { code: 'BB', name: 'Barbados', telCode: '+1-246' },
    { code: 'BY', name: 'Belarus', telCode: '+375' },
    { code: 'BE', name: 'Belgium', telCode: '+32' },
    { code: 'BZ', name: 'Belize', telCode: '+501' },
    { code: 'BJ', name: 'Benin', telCode: '+229' },
    { code: 'BM', name: 'Bermuda', telCode: '+1-441' },
    { code: 'BT', name: 'Bhutan', telCode: '+975' },
    { code: 'BO', name: 'Bolivia', telCode: '+591' },
    { code: 'BA', name: 'Bosnia and Herzegovina', telCode: '+387' },
    { code: 'BW', name: 'Botswana', telCode: '+267' },
    { code: 'BR', name: 'Brazil', telCode: '+55' },
    { code: 'IO', name: 'British Indian Ocean Territory', telCode: '+246' },
    { code: 'BN', name: 'Brunei Darussalam', telCode: '+673' },
    { code: 'BG', name: 'Bulgaria', telCode: '+359' },
    { code: 'BF', name: 'Burkina Faso', telCode: '+226' },
    { code: 'BI', name: 'Burundi', telCode: '+257' },
    { code: 'KH', name: 'Cambodia', telCode: '+855' },
    { code: 'CM', name: 'Cameroon', telCode: '+237' },
    { code: 'CA', name: 'Canada', telCode: '+1' },
    { code: 'CV', name: 'Cape Verde', telCode: '+238' },
    { code: 'KY', name: 'Cayman Islands', telCode: '+1-345' },
    { code: 'CF', name: 'Central African Republic', telCode: '+236' },
    { code: 'TD', name: 'Chad', telCode: '+235' },
    { code: 'CL', name: 'Chile', telCode: '+56' },
    { code: 'CN', name: 'China', telCode: '+86' },
    { code: 'CX', name: 'Christmas Island', telCode: '+61' },
    { code: 'CC', name: 'Cocos (Keeling) Islands', telCode: '+61' },
    { code: 'CO', name: 'Colombia', telCode: '+57' },
    { code: 'KM', name: 'Comoros', telCode: '+269' },
    { code: 'CG', name: 'Congo', telCode: '+242' },
    { code: 'CD', name: 'Congo, the Democratic Republic of the', telCode: '+243' },
    { code: 'CK', name: 'Cook Islands', telCode: '+682' },
    { code: 'CR', name: 'Costa Rica', telCode: '+506' },
    { code: 'CI', name: "Cote d'Ivoire", telCode: '+225' },
    { code: 'HR', name: 'Croatia', telCode: '+385' },
    { code: 'CU', name: 'Cuba', telCode: '+53' },
    { code: 'CY', name: 'Cyprus', telCode: '+357' },
    { code: 'CZ', name: 'Czech Republic', telCode: '+420' },
    { code: 'DK', name: 'Denmark', telCode: '+45' },
    { code: 'DJ', name: 'Djibouti', telCode: '+253' },
    { code: 'DM', name: 'Dominica', telCode: '+1-767' },
    { code: 'DO', name: 'Dominican Republic', telCode: '+1-809, +1-829, +1-849' },
    { code: 'EC', name: 'Ecuador', telCode: '+593' },
    { code: 'EG', name: 'Egypt', telCode: '+20' },
    { code: 'SV', name: 'El Salvador', telCode: '+503' },
    { code: 'GQ', name: 'Equatorial Guinea', telCode: '+240' },
    { code: 'ER', name: 'Eritrea', telCode: '+291' },
    { code: 'EE', name: 'Estonia', telCode: '+372' },
    { code: 'ET', name: 'Ethiopia', telCode: '+251' },
    { code: 'FK', name: 'Falkland Islands (Malvinas)', telCode: '+500' },
    { code: 'FO', name: 'Faroe Islands', telCode: '+298' },
    { code: 'FJ', name: 'Fiji', telCode: '+679' },
    { code: 'FI', name: 'Finland', telCode: '+358' },
    { code: 'FR', name: 'France', telCode: '+33' },
    { code: 'GF', name: 'French Guiana', telCode: '+594' },
    { code: 'PF', name: 'French Polynesia', telCode: '+689' },
    { code: 'TF', name: 'French Southern Territories', telCode: '+262' },
    { code: 'GA', name: 'Gabon', telCode: '+241' },
    { code: 'GM', name: 'Gambia', telCode: '+220' },
    { code: 'GE', name: 'Georgia', telCode: '+995' },
    { code: 'DE', name: 'Germany', telCode: '+49' },
    { code: 'GH', name: 'Ghana', telCode: '+233' },
    { code: 'GI', name: 'Gibraltar', telCode: '+350' },
    { code: 'GR', name: 'Greece', telCode: '+30' },
    { code: 'GL', name: 'Greenland', telCode: '+299' },
    { code: 'GD', name: 'Grenada', telCode: '+1-473' },
    { code: 'GP', name: 'Guadeloupe', telCode: '+590' },
    { code: 'GU', name: 'Guam', telCode: '+1-671' },
    { code: 'GT', name: 'Guatemala', telCode: '+502' },
    { code: 'GN', name: 'Guinea', telCode: '+224' },
    { code: 'GW', name: 'Guinea-Bissau', telCode: '+245' },
    { code: 'GY', name: 'Guyana', telCode: '+592' },
    { code: 'HT', name: 'Haiti', telCode: '+509' },
    { code: 'HM', name: 'Heard Island and McDonald Islands', telCode: '+672' },
    { code: 'VA', name: 'Holy See (Vatican City State)', telCode: '+379' },
    { code: 'HN', name: 'Honduras', telCode: '+504' },
    { code: 'HK', name: 'Hong Kong', telCode: '+852' },
    { code: 'HU', name: 'Hungary', telCode: '+36' },
    { code: 'IS', name: 'Iceland', telCode: '+354' },
    { code: 'IN', name: 'India', telCode: '+91' },
    { code: 'ID', name: 'Indonesia', telCode: '+62' },
    { code: 'IR', name: 'Iran, Islamic Republic of', telCode: '+98' },
    { code: 'IQ', name: 'Iraq', telCode: '+964' },
    { code: 'IE', name: 'Ireland', telCode: '+353' },
    { code: 'IL', name: 'Israel', telCode: '+972' },
    { code: 'IT', name: 'Italy', telCode: '+39' },
    { code: 'JM', name: 'Jamaica', telCode: '+1-876' },
    { code: 'JP', name: 'Japan', telCode: '+81' },
    { code: 'JO', name: 'Jordan', telCode: '+962' },
    { code: 'KZ', name: 'Kazakhstan', telCode: '+7' },
    { code: 'KE', name: 'Kenya', telCode: '+254' },
    { code: 'KI', name: 'Kiribati', telCode: '+686' },
    { code: 'KP', name: "Korea, Democratic People's Republic of", telCode: '+850' },
    { code: 'KR', name: 'Korea, Republic of', telCode: '+82' },
    { code: 'KW', name: 'Kuwait', telCode: '+965' },
    { code: 'KG', name: 'Kyrgyzstan', telCode: '+996' },
    { code: 'LA', name: "Lao People's Democratic Republic", telCode: '+856' },
    { code: 'LV', name: 'Latvia', telCode: '+371' },
    { code: 'LB', name: 'Lebanon', telCode: '+961' },
    { code: 'LS', name: 'Lesotho', telCode: '+266' },
    { code: 'LR', name: 'Liberia', telCode: '+231' },
    { code: 'LY', name: 'Libyan Arab Jamahiriya', telCode: '+218' },
    { code: 'LI', name: 'Liechtenstein', telCode: '+423' },
    { code: 'LT', name: 'Lithuania', telCode: '+370' },
    { code: 'LU', name: 'Luxembourg', telCode: '+352' },
    { code: 'MO', name: 'Macao', telCode: '+853' },
    { code: 'MK', name: 'Macedonia, the Former Yugoslav Republic of', telCode: '+389' },
    { code: 'MG', name: 'Madagascar', telCode: '+261' },
    { code: 'MW', name: 'Malawi', telCode: '+265' },
    { code: 'MY', name: 'Malaysia', telCode: '+60' },
    { code: 'MV', name: 'Maldives', telCode: '+960' },
    { code: 'ML', name: 'Mali', telCode: '+223' },
    { code: 'MT', name: 'Malta', telCode: '+356' },
    { code: 'MH', name: 'Marshall Islands', telCode: '+692' },
    { code: 'MQ', name: 'Martinique', telCode: '+596' },
    { code: 'MR', name: 'Mauritania', telCode: '+222' },
    { code: 'MU', name: 'Mauritius', telCode: '+230' },
    { code: 'YT', name: 'Mayotte', telCode: '+262' },
    { code: 'MX', name: 'Mexico', telCode: '+52' },
    { code: 'FM', name: 'Micronesia, Federated States of', telCode: '+691' },
    { code: 'MD', name: 'Moldova, Republic of', telCode: '+373' },
    { code: 'MC', name: 'Monaco', telCode: '+377' },
    { code: 'MN', name: 'Mongolia', telCode: '+976' },
    { code: 'MS', name: 'Montserrat', telCode: '+1-664' },
    { code: 'MA', name: 'Morocco', telCode: '+212' },
    { code: 'MZ', name: 'Mozambique', telCode: '+258' },
    { code: 'MM', name: 'Myanmar', telCode: '+95' },
    { code: 'NA', name: 'Namibia', telCode: '+264' },
    { code: 'NR', name: 'Nauru', telCode: '+674' },
    { code: 'NP', name: 'Nepal', telCode: '+977' },
    { code: 'NL', name: 'Netherlands', telCode: '+31' },
    { code: 'AN', name: 'Netherlands Antilles', telCode: '+599' },
    { code: 'NC', name: 'New Caledonia', telCode: '+687' },
    { code: 'NZ', name: 'New Zealand', telCode: '+64' },
    { code: 'NI', name: 'Nicaragua', telCode: '+505' },
    { code: 'NE', name: 'Niger', telCode: '+227' },
    { code: 'NG', name: 'Nigeria', telCode: '+234' },
    { code: 'NU', name: 'Niue', telCode: '+683' },
    { code: 'NF', name: 'Norfolk Island', telCode: '+672' },
    { code: 'MP', name: 'Northern Mariana Islands', telCode: '+1-670' },
    { code: 'NO', name: 'Norway', telCode: '+47' },
    { code: 'OM', name: 'Oman', telCode: '+968' },
    { code: 'PK', name: 'Pakistan', telCode: '+92' },
    { code: 'PW', name: 'Palau', telCode: '+680' },
    { code: 'PS', name: 'Palestinian Territory, Occupied', telCode: '+970' },
    { code: 'PA', name: 'Panama', telCode: '+507' },
    { code: 'PG', name: 'Papua New Guinea', telCode: '+675' },
    { code: 'PY', name: 'Paraguay', telCode: '+595' },
    { code: 'PE', name: 'Peru', telCode: '+51' },
    { code: 'PH', name: 'Philippines', telCode: '+63' },
    { code: 'PN', name: 'Pitcairn', telCode: '+64' },
    { code: 'PL', name: 'Poland', telCode: '+48' },
    { code: 'PT', name: 'Portugal', telCode: '+351' },
    { code: 'PR', name: 'Puerto Rico', telCode: '+1-787, +1-939' },
    { code: 'QA', name: 'Qatar', telCode: '+974' },
    { code: 'RE', name: 'Reunion', telCode: '+262' },
    { code: 'RO', name: 'Romania', telCode: '+40' },
    { code: 'RU', name: 'Russian Federation', telCode: '+7' },
    { code: 'RW', name: 'Rwanda', telCode: '+250' },
    { code: 'SH', name: 'Saint Helena', telCode: '+290' },
    { code: 'KN', name: 'Saint Kitts and Nevis', telCode: '+1-869' },
    { code: 'LC', name: 'Saint Lucia', telCode: '+1-758' },
    { code: 'PM', name: 'Saint Pierre and Miquelon', telCode: '+508' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines', telCode: '+1-784' },
    { code: 'WS', name: 'Samoa', telCode: '+685' },
    { code: 'SM', name: 'San Marino', telCode: '+378' },
    { code: 'ST', name: 'Sao Tome and Principe', telCode: '+239' },
    { code: 'SA', name: 'Saudi Arabia', telCode: '+966' },
    { code: 'SN', name: 'Senegal', telCode: '+221' },
    { code: 'RS', name: 'Serbia', telCode: '+381' },
    { code: 'SC', name: 'Seychelles', telCode: '+248' },
    { code: 'SL', name: 'Sierra Leone', telCode: '+232' },
    { code: 'SG', name: 'Singapore', telCode: '+65' },
    { code: 'SK', name: 'Slovakia', telCode: '+421' },
    { code: 'SI', name: 'Slovenia', telCode: '+386' },
    { code: 'SB', name: 'Solomon Islands', telCode: '+677' },
    { code: 'SO', name: 'Somalia', telCode: '+252' },
    { code: 'ZA', name: 'South Africa', telCode: '+27' },
    { code: 'GS', name: 'South Georgia and the South Sandwich Islands', telCode: '+500' },
    { code: 'ES', name: 'Spain', telCode: '+34' },
    { code: 'LK', name: 'Sri Lanka', telCode: '+94' },
    { code: 'SD', name: 'Sudan', telCode: '+249' },
    { code: 'SR', name: 'Suriname', telCode: '+597' },
    { code: 'SJ', name: 'Svalbard and Jan Mayen', telCode: '+47' },
    { code: 'SZ', name: 'Swaziland', telCode: '+268' },
    { code: 'SE', name: 'Sweden', telCode: '+46' },
    { code: 'CH', name: 'Switzerland', telCode: '+41' },
    { code: 'SY', name: 'Syrian Arab Republic', telCode: '+963' },
    { code: 'TW', name: 'Taiwan, Province of China', telCode: '+886' },
    { code: 'TJ', name: 'Tajikistan', telCode: '+992' },
    { code: 'TZ', name: 'Tanzania, United Republic of', telCode: '+255' },
    { code: 'TH', name: 'Thailand', telCode: '+66' },
    { code: 'TL', name: 'Timor-Leste', telCode: '+670' },
    { code: 'TG', name: 'Togo', telCode: '+228' },
    { code: 'TK', name: 'Tokelau', telCode: '+690' },
    { code: 'TO', name: 'Tonga', telCode: '+676' },
    { code: 'TT', name: 'Trinidad and Tobago', telCode: '+1-868' },
    { code: 'TN', name: 'Tunisia', telCode: '+216' },
    { code: 'TR', name: 'Turkey', telCode: '+90' },
    { code: 'TM', name: 'Turkmenistan', telCode: '+993' },
    { code: 'TC', name: 'Turks and Caicos Islands', telCode: '+1-649' },
    { code: 'TV', name: 'Tuvalu', telCode: '+688' },
    { code: 'UG', name: 'Uganda', telCode: '+256' },
    { code: 'UA', name: 'Ukraine', telCode: '+380' },
    { code: 'AE', name: 'United Arab Emirates', telCode: '+971' },
    { code: 'GB', name: 'United Kingdom', telCode: '+44' },
    { code: 'US', name: 'United States', telCode: '+1' },
    { code: 'UM', name: 'United States Minor Outlying Islands', telCode: '+1' },
    { code: 'UY', name: 'Uruguay', telCode: '+598' },
    { code: 'UZ', name: 'Uzbekistan', telCode: '+998' },
    { code: 'VU', name: 'Vanuatu', telCode: '+678' },
    { code: 'VE', name: 'Venezuela', telCode: '+58' },
    { code: 'VN', name: 'Viet Nam', telCode: '+84' },
    { code: 'VG', name: 'Virgin Islands, British', telCode: '+1-284' },
    { code: 'VI', name: 'Virgin Islands, U.S.', telCode: '+1-340' },
    { code: 'WF', name: 'Wallis and Futuna', telCode: '+681' },
    { code: 'EH', name: 'Western Sahara', telCode: '+212' },
    { code: 'YE', name: 'Yemen', telCode: '+967' },
    { code: 'ZM', name: 'Zambia', telCode: '+260' },
    { code: 'ZW', name: 'Zimbabwe', telCode: '+263' }
  ];

  const handleFileSelect = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch(
          type === "picture"
            ? "http://72.60.42.161/api/upload/profile-picture"
            : "http://72.60.42.161/api/upload/birth-certificate",
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to upload file.");
        }
  
        const result = await response.json();
        if (type === "picture") {
          setPicturePreview(URL.createObjectURL(file));
          setPictureName(file.name);
          setFormData((prevData) => ({
            ...prevData,
            profile_picture_path: result.filePath,
          }));

        // Clear profile picture error
        setErrors((prevErrors) => ({
          ...prevErrors,
          profile_picture_path: undefined,
        }));

        } else {
          setCertificatePreview(URL.createObjectURL(file));
          setCertificateName(file.name);
          setFormData((prevData) => ({
            ...prevData,
            birth_certificate_path: result.filePath,
          }));

        // Clear profile picture error
        setErrors((prevErrors) => ({
          ...prevErrors,
          birth_certificate_path: undefined,
        }));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update the telephone code if the country changes
    if (name === "currentCountry" || name === "officialCountry" || name === "permanentCountry") {
      const selectedCountry = countries.find((country) => country.name === value);
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
    if (!formData.nameDenoted) newErrors.nameDenoted = "Name Denoted by initials is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.nic) newErrors.nic = "NIC is required.";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required.";
    if (!formData.currentAddressLine1) newErrors.currentAddressLine1 = "Current address line 1 is required.";
    if (!formData.currentCity) newErrors.currentCity = "Current city is required.";
    if (!formData.currentProvince) newErrors.currentProvince = "Current province is required.";
    if (!formData.currentCountry) newErrors.currentCountry = "Current country is required.";
    if (!formData.permanentAddressLine1) newErrors.permanentAddressLine1 = "Permanent address line 1 is required.";
    if (!formData.permanentCity) newErrors.permanentCity = "Permanent city is required.";
    if (!formData.permanentProvince) newErrors.permanentProvince = "Permanent province is required.";
    if (!formData.permanentCountry) newErrors.permanentCountry = "Permanent country is required.";
    if (!formData.password) newErrors.password = "Password is required."; // Validate password
    if (!formData.profile_picture_path) newErrors.profile_picture_path = "Profile Picture is required.";
    if (!formData.birth_certificate_path) newErrors.birth_certificate_path = "Birth certificate is required.";


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
      const response = await fetch("http://72.60.42.161/api/register/personal", {
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
  
      // Navigate to the academic qualifications form and pass the user ID
      navigate("/register/register-acadamic", {
        state: { userId: result.userId },
      });
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
          IPET Member Registration Form
        </h1>

        <div className="max-w-[1430px] mx-auto lg:bg-white rounded-lg lg:shadow-md lg:p-6">
          <p className="text-sm mb-6 lg:text-left text-center">
            You may submit a request for membership at IPET by completing the
            following form. For completing this application you should have
            electronic copies of following documents ready.
          </p>
          <div className="max-w-7xl mx-auto lg:bg-white rounded-lg">
            {/* Steps Navigation */}
            <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-0">
              <div className="relative">
                {/* Mobile View (current step only) */}
                <div className="sm:hidden">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-full p-4 text-white bg-[#1e3a8a] flex flex-col justify-center items-center min-h-[60px]"
                    >
                      <div className="text-base font-medium">
                        Step {activeStep}
                      </div>
                      <div className="text-sm mt-1 text-center">
                        {activeStep === 1 && "Training & Experience"}
                        {activeStep === 2 && "Academic Qualifications"}
                        {activeStep === 3 && "Training & Experience"}
                        {activeStep === 4 && "Professional Memberships"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop View (all steps) */}
                <div className="hidden sm:block">
                  <div className="flex flex-row justify-between items-stretch gap-[1px] mb-0.5">
                    {/* Step 1 */}
                    <div
                      className={`flex-1 p-4 text-white ${
                        activeStep === 1 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                      } flex flex-col justify-center min-h-[80px] min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    >
                      <div className="text-base font-medium whitespace-nowrap">
                        Step 1
                      </div>
                      <div className="text-sm mt-1 whitespace-nowrap">
                        Training & Experience
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div
                      className={`flex-1 p-4 text-white ${
                        activeStep === 2 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                      } flex flex-col justify-center min-h-[80px] min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    >
                      <div className="text-base font-medium whitespace-nowrap">
                        Step 2
                      </div>
                      <div className="text-sm mt-1 whitespace-nowrap">
                        Academic Qualifications
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div
                      className={`flex-1 p-4 text-white ${
                        activeStep === 3 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                      } flex flex-col justify-center min-h-[80px] min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    >
                      <div className="text-base font-medium whitespace-nowrap">
                        Step 3
                      </div>
                      <div className="text-sm mt-1 whitespace-nowrap">
                        Training & Experience
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div
                      className={`flex-1 p-4 text-white ${
                        activeStep === 4 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                      } flex flex-col justify-center min-h-[80px] min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    >
                      <div className="text-base font-medium whitespace-nowrap">
                        Step 4
                      </div>
                      <div className="text-sm mt-1 whitespace-nowrap">
                        Professional Memberships
                      </div>
                    </div>
                  </div>

                  {/* Arrow Indicator for Desktop */}
                  <div
                    className="absolute -bottom-5 transition-all duration-200"
                    style={{
                      left: `calc(${(activeStep - 1) * (100 / 4)}% + ${100 / 8}%)`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div
                      className="w-0 h-0 
                        border-l-[10px] border-l-transparent 
                        border-t-[20px] border-t-[#1e3a8a] 
                        border-r-[10px] border-r-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Main Form */}
            <div className="max-w-7xl mx-auto bg-[#EDEDED] border-t-8 border-t-[#2D387D] border-b-8 border-b-[#2D387D] lg:shadow-md lg:p-0">
              <form onSubmit={handleSubmit} className="lg:space-y-6 bg-[#EDEDED] lg:p-6 rounded-lg">
                <div className="lg:bg-white bg-[#EDEDED]  lg:p-4 rounded-lg">
                  <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
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
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
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
                          <label className="block text-[18px]  text-[#000000] font-[700]  mb-1">
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
                        <label className="block mb-3 text-[18px] text-[#000000] font-[700] ">
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
                          <label className="flex items-center mb-4">
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

                      {/* Current Address */}
                      <div className="space-y-4">
                        <h3 className="font-[700] text-[18px] lg:mt-0 lg:mb-0 mt-10 mb-5">
                          Current Address
                        </h3>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-2">
                            Address Line 1 : *
                          </label>
                          <input
                            type="text"
                            name="currentAddressLine1"
                            placeholder="Line 1"
                            value={formData.currentAddressLine1}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            required
                          />
                          {errors.currentAddressLine1 && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentAddressLine1}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            Address Line 2 : *
                          </label>
                          <input
                            type="text"
                            name="currentAddressLine2"
                            placeholder="Line 2"
                            value={formData.currentAddressLine2}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            required
                          />
                          {errors.currentAddressLine2 && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentAddressLine2}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            City : *
                          </label>
                          <input
                            type="text"
                            name="currentCity"
                            placeholder="City"
                            value={formData.currentCity}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            required
                          />
                          {errors.currentCity && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentCity}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                            Province/State : *
                          </label>
                          {formData.currentCountry === "Sri Lanka" ? (
                            <select
                              name="currentProvince"
                              value={formData.currentProvince}
                              onChange={handleInputChange}
                              className="w-full border border-black rounded p-2"
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
                              className="w-full border border-black rounded p-2"
                              placeholder="Enter Province/State"
                              required
                            />
                          )}
                          {errors.currentProvince && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentProvince}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                            Country : *
                          </label>
                          <select
                            name="currentCountry"
                            value={formData.currentCountry}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2 lg:mb-0 mb-10"
                            required
                          >
                            <option value="">Select</option>
                            {countries.map((country) => (
                              <option key={country.code} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                          {errors.currentCountry && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentCountry}</p>
                          )}
                        </div>
                      </div>
                      <div className="h-[0.6px]  bg-[#112211] mb-5  opacity-90"></div>
                      {/* Official Address */}
                      <div className="space-y-4">
                        <h3 className="font-[700] text-[18px] lg:mt-0 lg:mb-0 mt-10 mb-5">
                          Official Address
                        </h3>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            Address Line 1 : 
                          </label>
                          <input
                            type="text"
                            name="officialAddressLine1"
                            placeholder="Line 1"
                            value={formData.officialAddressLine1}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            
                          />
                          {errors.officialAddressLine1 && (
                            <p className="text-red-500 text-sm mt-1">{errors.officialAddressLine1}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            Address Line 2 : 
                          </label>
                          <input
                            type="text"
                            name="officialAddressLine2"
                            placeholder="Line 2"
                            value={formData.officialAddressLine2}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            
                          />
                          {errors.officialAddressLine2 && (
                            <p className="text-red-500 text-sm mt-1">{errors.officialAddressLine2}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            City : 
                          </label>
                          <input
                            type="text"
                            name="officialCity"
                            placeholder="City"
                            value={formData.officialCity}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            
                          />
                          {errors.officialCity && (
                            <p className="text-red-500 text-sm mt-1">{errors.officialCity}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                            Province/State : 
                          </label>
                          {formData.officialCountry === "Sri Lanka" ? (
                            <select
                              name="officialProvince"
                              value={formData.officialProvince}
                              onChange={handleInputChange}
                              className="w-full border border-black rounded p-2"
                              
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
                              className="w-full border border-black rounded p-2"
                              placeholder="Enter Province/State"
                              
                            />
                          )}
                          {errors.officialProvince && (
                            <p className="text-red-500 text-sm mt-1">{errors.officialProvince}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                            Country : 
                          </label>
                          <select
                            name="officialCountry"
                            value={formData.officialCountry}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2 lg:mb-0 mb-10"
                            
                          >
                            <option value="">Select</option>
                            {countries.map((country) => (
                              <option key={country.code} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                          {errors.officialCountry && (
                            <p className="text-red-500 text-sm mt-1">{errors.officialCountry}</p>
                          )}
                        </div>
                        <div className="h-[0.6px]  bg-[#112211] mb-5  opacity-90"></div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
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
                            Current Place of Work : 
                          </label>
                          <input
                            type="text"
                            name="workplace"
                            value={formData.workplace}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            
                          />
                          {errors.workplace && (
                            <p className="text-red-500 text-sm mt-1">{errors.workplace}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            Current Designation : 
                          </label>
                          <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            
                          />
                          {errors.designation && (
                            <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4 lg:mt-[89.5px]">
                      <div>
                        <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                          Name Denoted by Initials : *
                        </label>
                        <input
                          type="text"
                          name="nameDenoted"
                          value={formData.nameDenoted}
                          onChange={handleInputChange}
                          className="w-full border border-black rounded p-2"
                          required
                        />
                        {errors.nameDenoted && (
                          <p className="text-red-500 text-sm mt-1">{errors.nameDenoted}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[18px] text-[#000000] font-[700]  mb-1 lg:mt-5 mt-0">
                          Date Of Birth *
                        </label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="w-full border border-black rounded p-2"
                          max={maxDobDate.toISOString().split('T')[0]} // Restrict DOB to 18 years ago
                          required
                        />
                        {errors.dob && (
                          <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                        )}
                      </div>

                      {/* Permanent Address */}
                      <div className="space-y-4 ">
                        <h3 className="font-[700] text-[18px] lg:mt-0 mt-10 mb-5">
                          Permanent Address
                        </h3>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            Address Line 1 : *
                          </label>
                          <input
                            type="text"
                            name="permanentAddressLine1"
                            placeholder="Line 1"
                            value={formData.permanentAddressLine1}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            required
                          />
                          {errors.permanentAddressLine1 && (
                            <p className="text-red-500 text-sm mt-1">{errors.permanentAddressLine1}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            Address Line 2 : *
                          </label>
                          <input
                            type="text"
                            name="permanentAddressLine2"
                            placeholder="Line 2"
                            value={formData.permanentAddressLine2}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            required
                          />
                          {errors.permanentAddressLine2 && (
                            <p className="text-red-500 text-sm mt-1">{errors.permanentAddressLine2}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            City : *
                          </label>
                          <input
                            type="text"
                            name="permanentCity"
                            placeholder="City"
                            value={formData.permanentCity}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
                            required
                          />
                          {errors.permanentCity && (
                            <p className="text-red-500 text-sm mt-1">{errors.permanentCity}</p>
                          )}
                        </div>
                        <div>
                        <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                          Province/State : *
                        </label>
                        {formData.permanentCountry === "Sri Lanka" ? (
                          <select
                            name="permanentProvince"
                            value={formData.permanentProvince}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2"
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
                            className="w-full border border-black rounded p-2"
                            placeholder="Enter Province/State"
                            required
                          />
                        )}
                        {errors.permanentProvince && (
                          <p className="text-red-500 text-sm mt-1">{errors.permanentProvince}</p>
                        )}
                      </div>
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                            Country : *
                          </label>
                          <select
                            name="permanentCountry"
                            value={formData.permanentCountry}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2 lg:mb-0 mb-10"
                            required
                          >
                            <option value="">Select</option>
                            {countries.map((country) => (
                              <option key={country.code} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                          {errors.permanentCountry && (
                            <p className="text-red-500 text-sm mt-1">{errors.permanentCountry}</p>
                          )}
                        </div>
                      </div>
                      <div className="h-[0.6px]  bg-[#112211] mb-5  opacity-90"></div>
                      
                      {/* Contact Information */}
                      <div className="space-y-4">                        
                        <h3 className="font-[700] text-[18px] lg:mt-0 lg:mb-0 mt-10 mb-5">
                          Contact Information
                        </h3>
                        <div>
                        {/* Mobile Number */}
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

                        {/* Home Telephone Number */}
                        <label className="block text-[18px] text-[#000000] font-[700] mb-1 mt-4">
                          Home Telephone Number :
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
                                value: formData.homeTelCode,
                                label: (
                                  <div className="flex items-center gap-2">
                                    <ReactCountryFlag
                                      countryCode={
                                        countries.find(
                                          (country) => country.telCode === formData.homeTelCode
                                        )?.code || "LK"
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
                            name="homeTel"
                            placeholder="725566777"
                            value={formData.homeTel}
                            onChange={handleInputChange}
                            className="flex-1 rounded-r p-2 no-arrows focus:outline-none"
                          />
                        </div>
                        {errors.homeTel && (
                          <p className="text-red-500 text-sm mt-1">{errors.homeTel}</p>
                        )}

                        {/* Office Telephone Number */}
                        <label className="block text-[18px] text-[#000000] font-[700] mb-1 mt-4">
                          Office Telephone Number : 
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
                                value: formData.officeTelCode,
                                label: (
                                  <div className="flex items-center gap-2">
                                    <ReactCountryFlag
                                      countryCode={
                                        countries.find(
                                          (country) => country.telCode === formData.officeTelCode
                                        )?.code || "LK"
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
                            name="officeTel"
                            placeholder="725566777"
                            value={formData.officeTel}
                            onChange={handleInputChange}
                            className="flex-1 rounded-r p-2 no-arrows focus:outline-none"
                            
                          />
                        </div>
                        {errors.officeTel && (
                          <p className="text-red-500 text-sm mt-1">{errors.officeTel}</p>
                        )}
                        {errors.officeFax && (
                          <p className="text-red-500 text-sm mt-1">{errors.officeFax}</p>
                        )}
                      </div>
                      <div>
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
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
                          <label className="block text-[18px] text-[#000000] font-[700]  mb-1">
                            Passport Number : 
                          </label>
                          <style>
                            {`
                              .no-arrows {
                                -moz-appearance: textfield; /* Firefox */
                              }

                              .no-arrows::-webkit-outer-spin-button,
                              .no-arrows::-webkit-inner-spin-button {
                                -webkit-appearance: none; /* Safari and Chrome */
                                margin: 0; /* Remove default margin */
                              }
                            `}
                          </style>
                          <input
                            type="text"
                            name="passport"
                            value={formData.passport}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded p-2 no-arrows"
                          />
                          {errors.passport && (
                            <p className="text-red-500 text-sm mt-1">{errors.passport}</p>
                          )}
                        </div>
                        <div className="h-[0.6px]  bg-[#112211] mb-5  opacity-90"></div>
                     
                        {/* Profile Picture Upload */}
                        <div>
                          <label className="block text-[18px] text-[#000000] font-[700] mt-5">
                            Profile Picture Upload : *
                          </label>
                          <div className="flex items-center gap-4"> {/* Flex container to align items horizontally */}
                            <input
                              type="file"
                              id="pictureInput"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleFileSelect(e, "picture")}
                            />
                            <button
                              type="button" // Add type="button" to prevent form submission
                              onClick={(e) => {
                                e.preventDefault(); // Prevent default form submission
                                document.getElementById("pictureInput").click();
                              }}
                              className="lg:w-[118px] w-full bg-[#2D387D] text-white rounded p-2 hover:bg-[#232d66] transition-colors"
                            >
                              Browse...
                            </button>
                            {picturePreview && ( // Display the preview in a small circle
                              <div className="flex items-center gap-2"> {/* New flex container for preview and name */}
                                <div
                                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2D387D] flex items-center justify-center"
                                  style={{ minWidth: "40px", minHeight: "40px" }} // Ensure fixed size
                                >
                                  <img
                                    src={picturePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {pictureName && ( // Display the file name to the right of the preview
                                  <div className="text-sm break-all">
                                    {pictureName}
                                  </div>
                                )}
                              </div>
                            )}
                          {errors.profile_picture_path && (
                            <p className="text-red-500 text-sm mt-1">{errors.profile_picture_path}</p>
                          )}
                          </div>
                        </div>

                      {/* Birth Certificate Upload */}
                      <div>
                        <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                          Birth Certificate Upload : *
                        </label>
                        <div className="flex items-center gap-4"> {/* Flex container to align items horizontally */}
                          <input
                            type="file"
                            id="certificateInput"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileSelect(e, "certificate")}
                          />
                          <button
                            type="button" // Add type="button" to prevent form submission
                            onClick={(e) => {
                              e.preventDefault(); // Prevent default form submission
                              document.getElementById("certificateInput").click();
                            }}
                            className="lg:w-[118px] w-full bg-[#2D387D] text-white rounded p-2 hover:bg-[#232d66] transition-colors"
                          >
                            Browse...
                          </button>
                          {certificateName && ( // Display the file name to the right of the button
                            <div className="text-sm break-all">
                              {certificateName}
                            </div>
                          )}
                          {errors.birth_certificate_path && (
                            <p className="text-red-500 text-sm mt-1">{errors.birth_certificate_path}</p>
                          )}
                        </div>
                      </div>

                      {/* Password Field */}
                      <div>
                        <label className="block text-[18px] text-[#000000] font-[700] mb-1">
                          Password : *
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full border border-black rounded p-2 bg-blue-100" // Added bg-blue-100 for light blue color
                          required
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                      </div>
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
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage_1;