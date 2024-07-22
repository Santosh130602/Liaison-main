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
            const response = await axios.post('https://liaison-main-4oyd.onrender.com/api/education/addedulevel', {
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
