import React, { useState , useEffect} from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Spinner from "../Components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);


  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setSearchResults(result.hits);
      console.log(result.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (postDetails) => {
    console.log('Clicked post details:', postDetails);
    navigate(`/post/${postDetails.objectID}`);
  };

  return (
    <div className="w-[100%] h-[100vh] bg-black overflow-x-hidden">
      <div className="text-white text-center p-3 bg-red-600 shadow-yellow-500 shadow-md" data-aos="flip-down">
        <h1 className="md:text-[30px] text-[20px] font-bold tracking-[15px]">Hacker News</h1>
      </div>

      <div className="w-[100%]  pt-[6%] pb-6 flex mx-[10%]">
        <div className="md:w-[60%] w-[40%]" data-aos="fade-up">
          <input
            className="w-[100%] h-[60px] rounded-md text-sm pl-[4%] shadow-md shadow-yellow-400"
            type="text"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          className="md:w-[140px] w-[100px] bg-white tracking-wide text-gray-800 font-thin rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md md:py-3 py-2 md:px-6 px-3 inline-flex items-center ml-10" data-aos="fade-up"
          onClick={handleSearch}
        > <span className="mx-auto ">Search</span>
          <BsSearch />
        </button>
      </div>

      <div className="w-full pt-7">
        <div>
          <h2 className="text-center text-white pb-5 pt-5 tracking-widest md:text-[30px] text-[20px]" data-aos="fade-up">Searched Results</h2>
          <div className='w-[70%] mx-auto bg-red-500 h-[1px]' data-aos="zoom-in"></div>
          {loading ? (
            <div className='flex justify-center pt-10'>
            <Spinner />
            </div>
          ) : (
            <ul className='list-inside list-decimal text-xs md:text-sm' data-aos="zoom-in">
              {searchResults.map((result) => (
                <li
                  key={result.objectID}
                  className="text-center text-gray-200 p-2 cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  {result.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
