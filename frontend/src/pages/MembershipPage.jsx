import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MembershipPage = () => {
  const [expandedSection, setExpandedSection] = useState('fellow'); // Pre-expand the Fellow section
  const navigate = useNavigate();

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const renderCriterionItem = (criterion, index) => {
    if (criterion === 'OR' || criterion === 'AND') {
      return (
        <div key={index} className="font-medium py-2 text-center">
          {criterion}
        </div>
      );
    } else if (criterion === 'SPACE') {
      return <div key={index} className="py-2" />; // Empty div for spacing without bullet
    }
    return <li key={index}>{criterion}</li>;
  };
  
  const membershipCategories = [
    {
      id: 'student',
      title: 'Student Member - S M iPET',
      criteria: [
        'After completing school and following engineering/technology diploma courses (Not less than two years, part-time and full-time both can apply)',
        'Has to provide a student confirmation letter from the college/university which should be certified and dated by the authorized person from the college/university'
      ]
    },
    {
      id: 'technical',
      title: 'Technical Member - T. M iPET',
      criteria: [
        'Obtained the certificate of proficiency in the field relevant to the subject area not below the National Vocational Qualification Level (NVQ) 04, issued by a Technical/Vocational training institute accepted by the Tertiary and Vocational Education Commission (TVEC) or internationally recognized institution',
        'OR',
        'Has to obtain industrial experience in the technical field for more than 4 years which has to be referred by the Professional Engineer and has to complete industrial training for 6 months under the direct guidance of a Professional Engineer finally has to submit the industrial training report with the presentation and passing viva by the panel board of iPET'
      ]
    },
    {
      id: 'diplomate',
      title: 'Engineering Diplomate – Eng. Dip. iPET',
      criteria: [
        'Having obtained the certificate of proficiency in the field relevant to the subject area National Diploma OR Higher National Diploma OR Bachelor of Technology OR not below the National Vocational Qualification Level (NVQ) 05 or Equal Qualifications accredited by the Institute',
        'Issued by a Technical/Vocational training institute accepted by the Tertiary and Vocational Education Commission (TVEC) or internationally recognized institution'
      ]
    },
    {
      id: 'technologist',
      title: 'Engineering Technologist - Eng. Tec. iPET',
      criteria: [
        'After completing a Bachelor\'s degree related to Engineering/Technology which is recognized by the University Grant Commission (UGC) or an internationally recognized institution',
        'Has to be approved by the Executive Committee Members of iPET'
      ]
    },
    {
      id: 'graduate',
      title: 'Graduate Engineer - G Eng. iPET',
      criteria: [
        'After completing a Bachelor of Science in Engineering OR Bachelor of Engineering or Equivalent Qualifications which is recognized by the University Grant Commission (UGC) or internationally recognized institution'
      ]
    },
    {
      id: 'associate',
      title: 'Associate Engineer – A Eng. iPET',
      criteria: [
        'At least Six (6) years post-qualifying work experience in a relevant field in a corporate, Board, or a Reputed Statutory Institution and got Engineering Diplomate membership in iPET and Completed 20 Hours of CPD',
        'OR',
        'At least two (02) years post-qualifying work experience in a relevant field in a corporate, Board, or a Reputed Statutory Institution and got Graduate Engineer in iPET and Completed 20 Hours of CPD',
        'AND',
        'viva and presentation'
      ]
    },
    {
      id: 'professional',
      title: 'Professional Engineer – P. Eng. iPET',
      criteria: [
        'At least Five (05) years post-qualifying work experience in a relevant field in a corporate, Board, or a Reputed Statutory Institution and got Associate Engineer in iPET and Completed 40 Hours of CPD',
        'OR',
        'At least Two (02) years post-qualifying work experience in a relevant field in a corporate, Board, or a Reputed Statutory Institution and got Associate Engineer in iPET and Completed Master Degree',
        'AND',
        'At least Two (02) years post-qualifying work experience under the Professional Member and has to pass viva and presentation which has to be approved by the Panel Board of iPET and Executive Committee Members of iPET'
      ]
    },
    {
        id: 'fellow',
        title: 'Fellow Member',
        criteria: [
          'Fellow membership is a recognition of your knowledge, achievement, and contribution to the engineering profession. Our Fellows are senior members within their occupational category who hold a respected position within the engineering community',
          'Have advanced qualifications, like a PhD, hold a key position in the field of Engineering OR and make significant contributions to engineering, such as being an associate professor or head of College or University finally approved by the Executive Committee Members of iPET',
          'OR',
          "If you've proven yourself as an expert in the field, you're welcome to apply.",
          'SPACE',
          'To qualify for Fellow membership, you need to:',
          'Be actively working in a senior position as a professional engineer, engineering technologist or engineering associate',
          'Be a Professional Engineering of the iPET',
          'Plus, you should meet at least one of these criteria:',
          'Have at least 15 years after obtaining Professional Engineer of iPET, and of significant responsibility in the design and execution of important engineering projects and be recognized for your exceptional contributions to the profession',
          'Be in a senior role, like a CEO or head of an engineering unit, for at least five years, with overall responsibility for managing operations, a diverse team, and large projects, which has to be accredited by the iPET Committee'
        ]
      }
      
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6" style={{marginBottom:'100px'}}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Institute of Professional Engineers and Technologies</h1>
              <p className="mt-2">Categories of Membership - Announcement</p>
            </div>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
              onClick={() => navigate('/register')} // Redirects to the apply page
            >
              APPLY NOW
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <p className="mb-6">
            iPET announced that the categories of membership in the Institute of Professional Engineers and
            Technologies are as follows. The registration fee for each category will be announced as soon as
            approved by the Executive Committee Members of iPET.
          </p>
          
          <h2 className="text-xl font-bold mb-4">Memberships</h2>
          
          <div className="space-y-4">
            {membershipCategories.map((category) => (
              <div 
                key={category.id} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div 
                  className={`p-4 flex justify-between items-center cursor-pointer ${expandedSection === category.id ? 'bg-blue-50' : 'bg-gray-50'}`}
                  onClick={() => toggleSection(category.id)}
                >
                  <h3 className="font-bold">{category.title}</h3>
                  <div className="text-blue-600 transform transition-transform duration-300">
                    {expandedSection === category.id ? '▲' : '▼'}
                  </div>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSection === category.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 bg-white">
                    <ul className="list-disc pl-5 space-y-2">
                      {category.criteria.map((criterion, index) => 
                        renderCriterionItem(criterion, index)
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button onClick={() => navigate('/register')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition duration-300">
              APPLY FOR MEMBERSHIP
            </button>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Institute of Professional Engineers and Technologists</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;