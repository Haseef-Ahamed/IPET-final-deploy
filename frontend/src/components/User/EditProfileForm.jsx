import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PersonalInformationForm from './PersonalInformation';

const EditProfileForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.profileData || {};
  
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    // Header Info
    engineeringDiscipline: initialData.engineeringDiscipline || '',
    membershipNumber: initialData.membershipNumber || '',
    classOfMembership: initialData.classOfMembership || '',
    wildApricotId: initialData.wildApricotId || '',
    ecslNumber: initialData.ecslNumber || '',
    profileEnrollmentDate: initialData.profileEnrollmentDate || '',
    libraryMemberNo: initialData.libraryMemberNo || '',
    
    // Personal Information
    nameWithInitials: initialData.nameWithInitials || '',
    nameDenotedByInitials: initialData.nameDenotedByInitials || '',
    gender: initialData.gender || '',
    dateOfBirth: initialData.dateOfBirth || '',
    email: initialData.email || '',
    mobileNumber: initialData.mobileNumber || '',
    homeTelephoneNumber: initialData.homeTelephoneNumber || '',
    currentPlaceOfWork: initialData.currentPlaceOfWork || '',
    currentDesignation: initialData.currentDesignation || '',
    addressLine1: initialData.addressLine1 || '',
    addressLine2: initialData.addressLine2 || '',
    city: initialData.city || '',
    province: initialData.province || '',
    country: initialData.country || '',
    nic: initialData.nic || '',

    // Academic Qualifications
    gceExamination: initialData.gceExamination || '',
    gceYear: initialData.gceYear || '',
    subjects: initialData.subjects || [
      { name: 'Combined Mathematics', credits: '' },
      { name: 'Physics', credits: '' },
      { name: 'Chemistry', credits: '' },
      { name: 'English', credits: '' }
    ],
    higherEducation: {
      periodFrom: initialData.higherEducation?.periodFrom || '',
      periodTo: initialData.higherEducation?.periodTo || '',
      ongoing: initialData.higherEducation?.ongoing || false,
      institutionName: initialData.higherEducation?.institutionName || '',
      institutionType: initialData.higherEducation?.institutionType || '',
      qualificationName: initialData.higherEducation?.qualificationName || '',
      qualificationName2: initialData.higherEducation?.qualificationName2 || ''
    },

    // Training & Experience
    workExperience: initialData.workExperience || [
      {
        from: '',
        to: '',
        placeOfWork: '',
        positionHeld: ''
      },
      {
        from: '',
        to: '',
        placeOfWork: '',
        positionHeld: ''
      }
    ],
    workDescription: initialData.workDescription || '',

    // Professional Memberships
    institution: initialData.institution || '',
    // membershipNumber: initialData.membershipNumber || '',
    membership_Number: initialData.membershipNumber || '',
    joinedYear: initialData.joinedYear || ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setFormData(prev => ({ ...prev, subjects: newSubjects }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, workExperience: newWorkExperience }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('userProfile', JSON.stringify(formData));
    navigate('/user');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header Info */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <img src="/api/placeholder/48/48" alt="Profile" className="rounded-full" />
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Engineering Discipline</label>
                <input
                  type="text"
                  name="engineeringDiscipline"
                  value={formData.engineeringDiscipline}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            {/* Add other header fields similarly */}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 ${activeTab === 'personal' ? 'bg-[#2D387D] text-white' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Information
            </button>
            <button
              className={`px-6 py-3 ${activeTab === 'academic' ? 'bg-[#2D387D] text-white' : ''}`}
              onClick={() => setActiveTab('academic')}
            >
              Academic Qualifications
            </button>
            <button
              className={`px-6 py-3 ${activeTab === 'training' ? 'bg-[#2D387D] text-white' : ''}`}
              onClick={() => setActiveTab('training')}
            >
              Training & Experience
            </button>
            <button
              className={`px-6 py-3 ${activeTab === 'professional' ? 'bg-[#2D387D] text-white' : ''}`}
              onClick={() => setActiveTab('professional')}
            >
              Professional Memberships
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-1">Name With Initials</label>
                  <input
                    type="text"
                    name="nameWithInitials"
                    value={formData.nameWithInitials}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* Add other personal information fields */}
              </div>
            )}

            {/* Academic Qualifications Tab */}
            {activeTab === 'academic' && (
              <div className="space-y-6">
                <div className="border rounded p-4">
                  <h3 className="font-medium mb-4">GCE Advanced Level</h3>
                  {formData.subjects.map((subject, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                      <input
                        type="text"
                        value={subject.name}
                        onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        value={subject.credits}
                        onChange={(e) => handleSubjectChange(index, 'credits', e.target.value)}
                        className="p-2 border rounded"
                      />
                    </div>
                  ))}
                </div>
                {/* Add Higher Education section */}
              </div>
            )}

            {/* Training & Experience Tab */}
            {activeTab === 'training' && (
              <div className="space-y-6">
                {formData.workExperience.map((exp, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="From"
                      value={exp.from}
                      onChange={(e) => handleWorkExperienceChange(index, 'from', e.target.value)}
                      className="p-2 border rounded"
                    />
                    {/* Add other work experience fields */}
                  </div>
                ))}
                <div>
                  <label className="block text-sm mb-1">Work Description</label>
                  <textarea
                    name="workDescription"
                    value={formData.workDescription}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="4"
                  />
                </div>
              </div>
            )}

            {/* Professional Memberships Tab */}
            {activeTab === 'professional' && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* Add other membership fields */}
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => activeTab === 'personal' ? navigate('/profile') : setActiveTab(getPreviousTab(activeTab))}
                className="px-6 py-2 bg-gray-100 rounded"
              >
                {activeTab === 'personal' ? 'Cancel' : 'Back'}
              </button>
              {activeTab === 'professional' ? (
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2D387D] text-white rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab(getNextTab(activeTab))}
                  className="px-6 py-2 bg-[#2D387D] text-white rounded"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const getNextTab = (currentTab) => {
  const tabs = ['personal', 'academic', 'training', 'professional'];
  const currentIndex = tabs.indexOf(currentTab);
  return tabs[currentIndex + 1];
};

const getPreviousTab = (currentTab) => {
  const tabs = ['personal', 'academic', 'training', 'professional'];
  const currentIndex = tabs.indexOf(currentTab);
  return tabs[currentIndex - 1];
};

export default EditProfileForm;



