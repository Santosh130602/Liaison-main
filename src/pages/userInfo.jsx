// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
// import { useToast } from '@chakra-ui/react';
// import SideBar from '../components/general/sideBar';

// const UserInfo = () => {
//     const [user, setUser] = useState({});
//     const [loadingProfile, setLoadingProfile] = useState(false);
//     const [loadingEducation, setLoadingEducation] = useState(false);
//     const [education, setEducation] = useState({
//         highschool: {},
//         intermediate: {},
//         graduation: {},
//         postGraduation: {}
//     });
//     const [currentEducation, setCurrentEducation] = useState('highschool');

//     const toast = useToast();
//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};

//     useEffect(() => {
//         fetchUserProfile();
//         fetchUserEducation();
//     }, []);

//     const fetchUserProfile = async () => {
//         setLoadingProfile(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/user/profile', config);
//             setUser(response.data.user);
//             setLoadingProfile(false);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error fetching profile!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingProfile(false);
//         }
//     };

//     const fetchUserEducation = async () => {
//         setLoadingEducation(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/user/education', config);
//             setEducation(response.data.education);
//             setLoadingEducation(false);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error fetching education details!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingEducation(false);
//         }
//     };

//     const handleEducationChange = (field, value) => {
//         setEducation((prevEducation) => ({
//             ...prevEducation,
//             [currentEducation]: {
//                 ...prevEducation[currentEducation],
//                 [field]: value,
//             },
//         }));
//     };

//     const handleSaveEducation = async () => {
//         try {
//             const response = await axios.post('http://localhost:4000/api/education/addedulevel', {

//                 educationType: currentEducation,
//                 educationData: education[currentEducation],
//             }, config);
//             toast({
//                 title: response.data.message,
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error saving education details!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     return (
//         <div className='flex'>
//             {/* Left Section for Navigation */}
//             <SideBar />

//             {/* Right Section for Profile */}
//             <div className="w-4/5 p-8 ml-[20%]">
//                 {/* Profile Info */}
//                 {loadingProfile ? (
//                     <Spinner animation="border" />
//                 ) : (
//                     <div className="flex items-center mb-8">
//                         <img src={user.avatar} alt="User Avatar" className="h-16 w-16 rounded-full mr-4" />
//                         <div>
//                             <h2 className="text-xl font-semibold">{user.username}</h2>
//                             <p className="text-gray-500">{user.email}</p>
//                         </div>
//                     </div>
//                 )}

//                 {/* Education Details */}
//                 <div className="space-y-4">
//                     <div className="flex space-x-4">
//                         <button
//                             className={`px-4 py-2 rounded-md ${currentEducation === 'highschool' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                             onClick={() => setCurrentEducation('highschool')}
//                         >
//                             Highschool
//                         </button>
//                         <button
//                             className={`px-4 py-2 rounded-md ${currentEducation === 'intermediate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                             onClick={() => setCurrentEducation('intermediate')}
//                         >
//                             Intermediate
//                         </button>
//                         <button
//                             className={`px-4 py-2 rounded-md ${currentEducation === 'graduation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                             onClick={() => setCurrentEducation('graduation')}
//                         >
//                             Graduation
//                         </button>
//                         <button
//                             className={`px-4 py-2 rounded-md ${currentEducation === 'postGraduation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                             onClick={() => setCurrentEducation('postGraduation')}
//                         >
//                             Post Graduation
//                         </button>
//                     </div>

//                     {loadingEducation ? (
//                         <Spinner animation="border" />
//                     ) : (
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-gray-700">School/College Name</label>
//                                 <input
//                                     type="text"
//                                     className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
//                                     value={education[currentEducation]?.school || ''}
//                                     onChange={(e) => handleEducationChange('school', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700">Passing Year</label>
//                                 <input
//                                     type="text"
//                                     className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
//                                     value={education[currentEducation]?.passingYear || ''}
//                                     onChange={(e) => handleEducationChange('passingYear', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700">State</label>
//                                 <input
//                                     type="text"
//                                     className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
//                                     value={education[currentEducation]?.state || ''}
//                                     onChange={(e) => handleEducationChange('state', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700">District</label>
//                                 <input
//                                     type="text"
//                                     className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
//                                     value={education[currentEducation]?.district || ''}
//                                     onChange={(e) => handleEducationChange('district', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <button
//                                     className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                                     onClick={handleSaveEducation}
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserInfo;



import React, { useState } from 'react';
import axios from 'axios';
import SideBar from '../components/general/sideBar'

const UserInfo = () => {
    const [educationType, setEducationType] = useState('');
    const [school, setSchool] = useState('');
    const [passingYear, setPassingYear] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const educationData = { school, passingYear, state, district };

        try {
            const response = await axios.post('http://localhost:4000/api/education/addedulevel', {
                educationType,
                educationData
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                alert('Education details saved successfully');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving education details');
        }
    };


    return (
        <div className='flex bg-black min-h-screen text-slate-300'>
            <div className='w-1/6'>
            <SideBar/>
            </div>
            <div className="max-w-xl w-5/6 mt-16 mx-auto p-6 bg-black shadow-md rounded-md gap-4">
                <h2 className="text-4xl font-bold mb-6">User Education Information</h2>
                <hr className='mb-10'/>
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-6">
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">
                            Education Type
                        </label> */}
                        <select
                            value={educationType}
                            onChange={(e) => setEducationType(e.target.value)}
                            className="mt-1 block w-full   py-2 px-3 border border-gray-300 bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="highschool">High School</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="graduation">Graduation</option>
                            <option value="postGraduation">Post Graduation</option>
                        </select>
                    </div>
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">
                            School
                        </label> */}
                        <input
                            type="text"
                            value={school}
                            placeholder='School'
                            onChange={(e) => setSchool(e.target.value)}
                            className="mt-1 bg-gray-900 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">
                            Passing Year
                        </label> */}
                        <input
                            type="text"
                            value={passingYear}
                            placeholder='Passing Year'
                            onChange={(e) => setPassingYear(e.target.value)}
                            className="mt-1 block bg-gray-900 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">
                            State
                        </label> */}
                        <input
                            type="text"
                            value={state}
                            placeholder='State'
                            onChange={(e) => setState(e.target.value)}
                            className="mt-1 block bg-gray-900 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">
                            District
                        </label> */}
                        <input
                            type="text"
                            value={district}
                            placeholder='District'
                            onChange={(e) => setDistrict(e.target.value)}
                            className="mt-1 block bg-gray-900 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setEducationType('');
                                setSchool('');
                                setPassingYear('');
                                setState('');
                                setDistrict('');
                            }}
                            className="mr-4 py-2 px-4 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default UserInfo;
