
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useToast } from '@chakra-ui/react';

// const SearchFriend = () => {
//     const [username, setUsername] = useState('');
//     const [educationLevel, setEducationLevel] = useState('');
//     const [schoolName, setSchoolName] = useState('');
//     const [passingYear, setPassingYear] = useState('');
//     const [state, setState] = useState('');
//     const [district, setDistrict] = useState('');
//     const [suggestions, setSuggestions] = useState({ usernames: [], schools: [], states: [], districts: [] });
//     const [searchResults, setSearchResults] = useState([]);
//     const toast = useToast();


//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};
    
//     const fetchSuggestions = async (type, value) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/usersearch/suggestions/${type}?query=${value}`);
//             setSuggestions(prev => ({ ...prev, [type]: response.data }));
//         } catch (error) {
//             console.error('Error fetching suggestions:', error);
//         }
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/api/usersearch/usersearch', {
//                 params: { username, educationLevel, schoolName, passingYear, state, district },
//             });
//             setSearchResults(response.data);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleAddFriend = async (userId) => {
//         try {
//             await axios.post(`http://localhost:4000/api/usersearch/addfriends/${userId}`);
//             toast({
//                 title: "Friend request sent successfully!",
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     return (
//         <div className="p-4 ">
//             <div className="mb-4">
//                 <label className="block text-gray-700">Username</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={username}
//                     onChange={(e) => {
//                         setUsername(e.target.value);
//                         fetchSuggestions('usernames', e.target.value);
//                     }}
//                     list="username-suggestions"
//                 />
//                 <datalist id="username-suggestions">
//                     {suggestions.usernames.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">Education Level</label>
//                 <select
//                     className="w-full px-3 py-2 border rounded"
//                     value={educationLevel}
//                     onChange={(e) => setEducationLevel(e.target.value)}
//                 >
//                     <option value="">Select</option>
//                     <option value="highschool">Highschool</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="graduation">Graduation</option>
//                     <option value="postgraduation">Postgraduation</option>
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">School Name</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={schoolName}
//                     onChange={(e) => {
//                         setSchoolName(e.target.value);
//                         fetchSuggestions('schools', e.target.value);
//                     }}
//                     list="school-suggestions"
//                 />
//                 <datalist id="school-suggestions">
//                     {suggestions.schools.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">Passing Year</label>
//                 <input
//                     type="number"
//                     className="w-full px-3 py-2 border rounded"
//                     value={passingYear}
//                     onChange={(e) => setPassingYear(e.target.value)}
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">State</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={state}
//                     onChange={(e) => {
//                         setState(e.target.value);
//                         fetchSuggestions('states', e.target.value);
//                     }}
//                     list="state-suggestions"
//                 />
//                 <datalist id="state-suggestions">
//                     {suggestions.states.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">District</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={district}
//                     onChange={(e) => {
//                         setDistrict(e.target.value);
//                         fetchSuggestions('districts', e.target.value);
//                     }}
//                     list="district-suggestions"
//                 />
//                 <datalist id="district-suggestions">
//                     {suggestions.districts.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={handleSearch}
//             >
//                 Search
//             </button>

//             <div className="mt-6">
//                 {searchResults.length > 0 ? (
//                     searchResults.map((user) => (
//                         <div key={user._id} className="flex items-center justify-between p-2 border-b">
//                             <div>
//                                 <p className="text-gray-800">{user.username}</p>
//                                 <p className="text-gray-500">{user.schoolName}, {user.state}, {user.district}</p>
//                             </div>
//                             <button
//                                 className="px-4 py-2 bg-green-500 text-white rounded"
//                                 onClick={() => handleAddFriend(user._id)}
//                             >
//                                 Add Friend
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No users found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchFriend;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useToast } from '@chakra-ui/react';

// const SearchFriend = () => {
//     const [username, setUsername] = useState('');
//     const [educationType, setEducationType] = useState('');
//     const [school, setSchoolName] = useState('');
//     const [passingYear, setPassingYear] = useState('');
//     const [state, setState] = useState('');
//     const [district, setDistrict] = useState('');
//     const [suggestions, setSuggestions] = useState({ usernames: [], schools: [], states: [], districts: [] });
//     const [searchResults, setSearchResults] = useState([]);
//     const toast = useToast();

//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};

//     const fetchSuggestions = async (type, value) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/usersearch/suggestions/${type}?query=${value}`, config);
//             setSuggestions(prev => ({ ...prev, [type]: response.data }));
//         } catch (error) {
//             console.error('Error fetching suggestions:', error);
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/api/usersearch/usersearch', {
//                 params: { username, educationType, school, passingYear, state, district },
//                 ...config
//             });
//             setSearchResults(response.data);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleAddFriend = async (userId) => {
//         try {
//             await axios.post(`http://localhost:4000/api/usersearch/addfriends/${userId}`, {}, config);
//             toast({
//                 title: "Friend request sent successfully!",
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     return (
//         <div className="p-4 ">
//             <div className="mb-4">
//                 <label className="block text-gray-700">Username</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={username}
//                     onChange={(e) => {
//                         setUsername(e.target.value);
//                         fetchSuggestions('usernames', e.target.value);
//                     }}
//                     list="username-suggestions"
//                 />
//                 <datalist id="username-suggestions">
//                     {suggestions.usernames.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">Education Level</label>
//                 <select
//                     className="w-full px-3 py-2 border rounded"
//                     value={schools}
//                     onChange={(e) => setEducationType(e.target.value)}
//                 >
//                     <option value="">Select</option>
//                     <option value="highschool">Highschool</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="graduation">Graduation</option>
//                     <option value="postgraduation">Postgraduation</option>
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">School Name</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={school}
//                     onChange={(e) => {
//                         setSchoolName(e.target.value);
//                         fetchSuggestions('schools', e.target.value);
//                     }}
//                     list="school-suggestions"
//                 />
//                 <datalist id="school-suggestions">
//                     {suggestions.schools.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">Passing Year</label>
//                 <input
//                     type="number"
//                     className="w-full px-3 py-2 border rounded"
//                     value={passingYear}
//                     onChange={(e) => setPassingYear(e.target.value)}
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">State</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={state}
//                     onChange={(e) => {
//                         setState(e.target.value);
//                         fetchSuggestions('states', e.target.value);
//                     }}
//                     list="state-suggestions"
//                 />
//                 <datalist id="state-suggestions">
//                     {suggestions.states.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">District</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={district}
//                     onChange={(e) => {
//                         setDistrict(e.target.value);
//                         fetchSuggestions('districts', e.target.value);
//                     }}
//                     list="district-suggestions"
//                 />
//                 <datalist id="district-suggestions">
//                     {suggestions.districts.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={handleSearch}
//             >
//                 Search
//             </button>

//             <div className="mt-6">
//                 {searchResults.length > 0 ? (
//                     searchResults.map((user) => (
//                         <div key={user._id} className="flex items-center justify-between p-2 border-b">
//                             <div>
//                                 <p className="text-gray-800">{user.username}</p>
//                                 <p className="text-gray-500">{user.schoolName}, {user.state}, {user.district}</p>
//                             </div>
//                             <button
//                                 className="px-4 py-2 bg-green-500 text-white rounded"
//                                 onClick={() => handleAddFriend(user._id)}
//                             >
//                                 Add Friend
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No users found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchFriend;







// import React, { useState } from 'react';
// import axios from 'axios';
// import { useToast } from '@chakra-ui/react';

// const SearchFriend = () => {
//     const [username, setUsername] = useState('');
//     const [educationLevel, setEducationLevel] = useState('');
//     const [school, setSchool] = useState('');
//     const [passingYear, setPassingYear] = useState('');
//     const [state, setState] = useState('');
//     const [district, setDistrict] = useState('');
//     const [suggestions, setSuggestions] = useState({ usernames: [], schools: [], states: [], districts: [] });
//     const [searchResults, setSearchResults] = useState([]);
//     const toast = useToast();
//     const [loading, setLoading] = useState(false);




//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-type': 'application/json',
//         },
//     } : {};

//     const fetchSuggestions = async (type, value) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/usersearch/suggestions/${type}?query=${value}&educationType=${educationLevel}`, config);
//             setSuggestions(prev => ({ ...prev, [type]: response.data }));
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || 'Error Occurred!',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/api/usersearch/usersearch', {
//                 params: { username, educationLevel, school, passingYear, state, district },
//                 ...config
//             });
//             setSearchResults(response.data);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || 'Error Occurred!',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleAddFriend = async (userId) => {
//         try {
//             await axios.post(`http://localhost:4000/api/usersearch/notifications/friendRequests/addfriends/${userId}`, {}, config);
//             toast({
//                 title: 'Friend request sent successfully!',
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || 'Error Occurred!',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     return (
//         <div className="p-4">
//             <div className="mb-4">
//                 <label className="block text-gray-700">Username</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={username}
//                     onChange={(e) => {
//                         setUsername(e.target.value);
//                         fetchSuggestions('usernames', e.target.value);
//                     }}
//                     list="username-suggestions"
//                 />
//                 <datalist id="username-suggestions">
//                     {suggestions.usernames.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">Education Level</label>
//                 <select
//                     className="w-full px-3 py-2 border rounded"
//                     value={educationLevel}
//                     onChange={(e) => setEducationLevel(e.target.value)}
//                 >
//                     <option value="">Select</option>
//                     <option value="HighSchool">High School</option>
//                     <option value="Intermediate">Intermediate</option>
//                     <option value="Graducation">Graduation</option>
//                     <option value="PostGraducat">Post Graduation</option>
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">School Name</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={school}
//                     onChange={(e) => {
//                         setSchool(e.target.value);
//                         fetchSuggestions('schools', e.target.value);
//                     }}
//                     list="school-suggestions"
//                 />
//                 <datalist id="school-suggestions">
//                     {suggestions.schools.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">Passing Year</label>
//                 <input
//                     type="number"
//                     className="w-full px-3 py-2 border rounded"
//                     value={passingYear}
//                     onChange={(e) => setPassingYear(e.target.value)}
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">State</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={state}
//                     onChange={(e) => {
//                         setState(e.target.value);
//                         fetchSuggestions('states', e.target.value);
//                     }}
//                     list="state-suggestions"
//                 />
//                 <datalist id="state-suggestions">
//                     {suggestions.states.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">District</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={district}
//                     onChange={(e) => {
//                         setDistrict(e.target.value);
//                         fetchSuggestions('districts', e.target.value);
//                     }}
//                     list="district-suggestions"
//                 />
//                 <datalist id="district-suggestions">
//                     {suggestions.districts.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={handleSearch}
//             >
//                 Search
//             </button>
//             {/* {loading && <div className="mt-4 text-center">Loading...</div>} */}
//             <div className="mt-6">
//                 {searchResults.length > 0 ? (
//                     searchResults.map((user) => (
//                         <div key={user._id} className="flex items-center justify-between p-2 border-b">
//                             <div>
//                                 <p className="text-gray-800">{user.username}</p>
//                                 <p className="text-gray-500">{user.firstName} {user.lastName}</p>
//                             </div>
//                             <button
//                                 className="px-4 py-2 bg-green-500 text-white rounded"
//                                 onClick={() => handleAddFriend(user._id)}
//                             >
//                                 Add Friend
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No users found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchFriend;






// import React, { useState } from 'react';
// import axios from 'axios';
// import { useToast } from '@chakra-ui/react';

// const SearchFriend = () => {
//     const [username, setUsername] = useState('');
//     const [educationLevel, setEducationLevel] = useState('');
//     const [school, setSchool] = useState('');
//     const [passingYear, setPassingYear] = useState('');
//     const [state, setState] = useState('');
//     const [district, setDistrict] = useState('');
//     const [suggestions, setSuggestions] = useState({ usernames: [], schools: [], states: [], districts: [] });
//     const [searchResults, setSearchResults] = useState([]);
//     const toast = useToast();
//     const [loading, setLoading] = useState(false);

//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-type': 'application/json',
//         },
//     } : {};

//     const fetchSuggestions = async (type, value) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/usersearch/suggestions/${type}?query=${value}&educationType=${educationLevel}`, config);
//             setSuggestions(prev => ({ ...prev, [type]: response.data }));
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || 'Error Occurred!',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/api/usersearch/usersearch', {
//                 params: { username, educationLevel, school, passingYear, state, district },
//                 ...config
//             });
//             setSearchResults(response.data);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || 'Error Occurred!',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleAddFriend = async (userId) => {
//         try {
//             await axios.post(`http://localhost:4000/api/usersearch/notifications/friendRequests/addfriends/${userId}`, {}, config);
//             toast({
//                 title: 'Friend request sent successfully!',
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             handleSearch(); // Refresh the search results to update friend status
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || 'Error Occurred!',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     return (
//         <div className="p-4">
//             <div className="mb-4">
//                 <label className="block text-gray-700">Username</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={username}
//                     onChange={(e) => {
//                         setUsername(e.target.value);
//                         fetchSuggestions('usernames', e.target.value);
//                     }}
//                     list="username-suggestions"
//                 />
//                 <datalist id="username-suggestions">
//                     {suggestions.usernames.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">Education Level</label>
//                 <select
//                     className="w-full px-3 py-2 border rounded"
//                     value={educationLevel}
//                     onChange={(e) => setEducationLevel(e.target.value)}
//                 >
//                     <option value="">Select</option>
//                     <option value="HighSchool">High School</option>
//                     <option value="Intermediate">Intermediate</option>
//                     <option value="Graduation">Graduation</option>
//                     <option value="PostGraduation">Post Graduation</option>
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">School Name</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={school}
//                     onChange={(e) => {
//                         setSchool(e.target.value);
//                         fetchSuggestions('schools', e.target.value);
//                     }}
//                     list="school-suggestions"
//                 />
//                 <datalist id="school-suggestions">
//                     {suggestions.schools.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">Passing Year</label>
//                 <input
//                     type="number"
//                     className="w-full px-3 py-2 border rounded"
//                     value={passingYear}
//                     onChange={(e) => setPassingYear(e.target.value)}
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">State</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={state}
//                     onChange={(e) => {
//                         setState(e.target.value);
//                         fetchSuggestions('states', e.target.value);
//                     }}
//                     list="state-suggestions"
//                 />
//                 <datalist id="state-suggestions">
//                     {suggestions.states.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700">District</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded"
//                     value={district}
//                     onChange={(e) => {
//                         setDistrict(e.target.value);
//                         fetchSuggestions('districts', e.target.value);
//                     }}
//                     list="district-suggestions"
//                 />
//                 <datalist id="district-suggestions">
//                     {suggestions.districts.map((name, index) => (
//                         <option key={index} value={name} />
//                     ))}
//                 </datalist>
//             </div>

//             <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={handleSearch}
//             >
//                 Search
//             </button>

//             <div className="mt-6">
//                 {searchResults.length > 0 ? (
//                     searchResults.map((user) => (
//                         <div key={user._id} className="flex items-center justify-between p-2 border-b">
//                             <div>
//                                 <p className="text-gray-800">{user.username}</p>
//                                 <p className="text-gray-500">{user.firstName} {user.lastName}</p>
//                             </div>
//                             <div>
//                                 {user.friendStatus === 'friends' ? (
//                                     <button className="px-4 py-2 bg-gray-500 text-white rounded" disabled>Friend</button>
//                                 ) : user.friendStatus === 'requestSent' ? (
//                                     <button className="px-4 py-2 bg-yellow-500 text-white rounded" disabled>Request Sent</button>
//                                 ) : (
//                                     <button
//                                         className="px-4 py-2 bg-green-500 text-white rounded"
//                                         onClick={() => handleAddFriend(user._id)}
//                                     >
//                                         Add Friend
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No users found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchFriend;







































import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import SideBar from './sideBar';

const SearchFriend = () => {
    const [username, setUsername] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [school, setSchool] = useState('');
    const [passingYear, setPassingYear] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [suggestions, setSuggestions] = useState({ usernames: [], schools: [], states: [], districts: [] });
    const [searchResults, setSearchResults] = useState([]);
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const config = token ? {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    } : {};

    const fetchSuggestions = async (type, value) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/usersearch/suggestions/${type}?query=${value}&educationType=${educationLevel}`, config);
            setSuggestions(prev => ({ ...prev, [type]: response.data }));
        } catch (error) {
            toast({
                title: error.response?.data?.message || 'Error Occurred!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/usersearch/usersearch', {
                params: { username, educationLevel, school, passingYear, state, district },
                ...config
            });
            setSearchResults(response.data);
        } catch (error) {
            toast({
                title: error.response?.data?.message || 'Error Occurred!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    const handleAddFriend = async (userId) => {
        try {
            await axios.post(`http://localhost:4000/api/usersearch/notifications/friendRequests/addfriends/${userId}`, {}, config);
            toast({
                title: 'Friend request sent successfully!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            updateFriendStatus(userId, 'requestSent');
        } catch (error) {
            toast({
                title: error.response?.data?.message || 'Error Occurred!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    const handleRejectFriendRequest = async (userId) => {
        try {
            await axios.delete(`http://localhost:4000/api/usersearch/notifications/friendRequests/reject/${userId}`, config);
            toast({
                title: 'Friend request rejected successfully!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            updateFriendStatus(userId, null); // Reset friend status after rejecting request
        } catch (error) {
            toast({
                title: error.response?.data?.message || 'Error Occurred!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    const updateFriendStatus = (userId, status) => {
        setSearchResults(prevResults =>
            prevResults.map(user =>
                user._id === userId ? { ...user, friendStatus: status } : user
            )
        );
    };

    return (
        <div className='flex'>
            <div className='w-1/6'>
                <SideBar/>
            </div>
        
        <div className="p-8 mt-16 w-5/6 justify-center text-left text-slate-300 bg-black min-h-screen border-slate-700">
            <div className="mb-4 ">
                {/* <label className="block text-gray-700">Username</label> */}
                <input
                    type="text"
                    className="w-full px-3 py-2 border-1 rounded bg-gray-900 border-slate-700 "
                    value={username}
                    placeholder='Username'
                    onChange={(e) => {
                        setUsername(e.target.value);
                        fetchSuggestions('usernames', e.target.value);
                    }}
                    list="username-suggestions"
                />
                <datalist id="username-suggestions">
                    {suggestions.usernames.map((name, index) => (
                        <option key={index} value={name} />
                    ))}
                </datalist>
            </div>

            <div className="mb-4 text-gray-700">
                {/* <label className="block text-gray-700">Education Level</label> */}
                <select
                    className="w-full px-3 py-2 border-1 rounded bg-gray-900 text-gray-700 border-slate-700"
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="HighSchool">High School</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Graduation">Graduation</option>
                    <option value="PostGraduation">Post Graduation</option>
                </select>
            </div>

            <div className="mb-4">
                {/* <label className="block text-gray-700">School Name</label> */}
                <input
                    type="text"
                    className="w-full px-3 py-2 border-1 rounded bg-gray-900 border-slate-700"
                    placeholder='School Name'
                    value={school}
                    onChange={(e) => {
                        setSchool(e.target.value);
                        fetchSuggestions('schools', e.target.value);
                    }}
                    list="school-suggestions"
                />
                <datalist id="school-suggestions">
                    {suggestions.schools.map((name, index) => (
                        <option key={index} value={name} />
                    ))}
                </datalist>
            </div>

            <div className="mb-4">
                {/* <label className="block text-gray-700">Passing Year</label> */}
                <input
                    type="number"
                    className="w-full px-3 py-2 border-1 rounded bg-gray-900 border-slate-700"
                    placeholder='Passing Year'
                    value={passingYear}
                    onChange={(e) => setPassingYear(e.target.value)}
                />
            </div>

            <div className="mb-4">
                {/* <label className="block text-gray-700">State</label> */}
                <input
                    type="text"
                    className="w-full px-3 py-2 border-1 rounded bg-gray-900 border-slate-700"
                    placeholder='State'
                    value={state}
                    onChange={(e) => {
                        setState(e.target.value);
                        fetchSuggestions('states', e.target.value);
                    }}
                    list="state-suggestions"
                />
                <datalist id="state-suggestions">
                    {suggestions.states.map((name, index) => (
                        <option key={index} value={name} />
                    ))}
                </datalist>
            </div>

            <div className="mb-4">
                {/* <label className="block text-gray-700">District</label> */}
                <input
                    type="text"
                    className="w-full px-3 py-2 border-1 rounded bg-gray-900 border-slate-700"
                    placeholder='District'
                    value={district}
                    onChange={(e) => {
                        setDistrict(e.target.value);
                        fetchSuggestions('districts', e.target.value);
                    }}
                    list="district-suggestions"
                />
                <datalist id="district-suggestions">
                    {suggestions.districts.map((name, index) => (
                        <option key={index} value={name} />
                    ))}
                </datalist>
            </div>

            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSearch}
            >
                Search
            </button>

            <div className="mt-6">
                {searchResults.length > 0 ? (
                    searchResults.map((user) => (
                        <div key={user._id} className="flex items-center justify-between p-2 border-b">
                            <div>
                                <p className="text-gray-800">{user.username}</p>
                                <p className="text-gray-500">{user.firstName} {user.lastName}</p>
                            </div>
                            <div>
                                {user.friendStatus === 'friends' ? (
                                    <button className="px-4 py-2 bg-gray-500 text-white rounded" disabled>Friend</button>
                                ) : user.friendStatus === 'requestSent' ? (
                                    <>
                                        <button className="px-4 py-2 bg-yellow-500 text-white rounded mr-2" disabled>Request Sent</button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleRejectFriendRequest(user._id)}>Reject</button>
                                    </>
                                ) : (
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded"
                                        onClick={() => handleAddFriend(user._id)}
                                    >
                                        Add Friend
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No users found.</p>
                    // <p></p>

                )}
            </div>
        </div>
        </div>
    );
};

export default SearchFriend;
