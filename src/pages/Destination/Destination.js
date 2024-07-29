import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIs, { endpoints } from '../../configs/APIs';


const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const navigate = useNavigate();

  const fetchDestinations = async (pageNum = 1) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await APIs.get(endpoints["destinations"]);
      if (data && Array.isArray(data.data.results)) {
        setDestinations(data.data.results);
        setFilteredDestinations(data.data.results);
        setPage(pageNum);
        setHasNextPage(!!data.next);
        if (data.data.results.length > 0) {
          setSelectedDestination(data.data.results[0]);
        }
      } else {
        console.error('API response does not contain a results array');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDestinations(1);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchDestinations(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchDestinations(page - 1);
    }
  };

  const containsAllWords = (text, searchWords) => {
    return searchWords.every(word =>
      text.toLowerCase().includes(word.toLowerCase())
    );
  };

  const search = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredDestinations(destinations);
    } else {
      const searchWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
      const filtered = destinations.filter((destination) =>
        containsAllWords(destination.title, searchWords)
        // containsAllWords(trip.price, searchWords) ||
        // containsAllWords(`${trip.title} ${trip.price} `, searchWords)
      );
      setFilteredDestinations(filtered);
    }
  };

  const renderDestinationItem = (destination) => (
    <div
      key={destination.id}
      className="relative flex flex-col shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4 rounded-lg bg-yellow-50 cursor-pointer size-64 "
      onClick={() => navigate(`/destination-detail/${destination.id}`)}
    >
      <img src={destination.image} alt={destination.title} className="w-full h-full object-cover rounded-sm border-2 border-cyan-900" />
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-opacity-20 bg-black hover:bg-opacity-20 hover:bg-white transition-all duration-300">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold hover:transition-all duration-300">{destination.title}</h2>
          {/* <p className="text-gray-600">Ngày đăng: {destination.created_date}</p>
          <p className="text-red-800">Giá: {destination.price}</p> */}
        </div>
      </div>
    </div>
  );
  
  
  

  const shouldShowPagination = filteredDestinations.length > 10;

  return (
    <div className="container mx-auto bg-slate-200 p-10 min-w-[1220px]">
      <div className="my-4">
        <input
          type="text"
          placeholder="Search for destination..."
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {searchQuery && (
        <p className="text-gray-600 mb-4">
          Tìm thấy {filteredDestinations.length} kết quả cho "{searchQuery}"
        </p>
      )}
      {loading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : filteredDestinations.length > 0 ? (
        <div className="container mx-auto flex flex-wrap justify-between min-w-[1100px]">
          {filteredDestinations.slice((page - 1) * 10, page * 10).map(renderDestinationItem)}
        </div>
      
      ) : (
        <div className="text-center py-4 text-gray-600">
          <p>0 kết quả tìm kiếm</p>
        </div>
      )}
      {filteredDestinations.length > 0 && shouldShowPagination && (
        <div className="flex justify-between items-center py-4">
          <button
            className={`bg-green-600 text-white py-2 px-4 rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Trang trước
          </button>
          <span className="text-lg">Trang {page}</span>
          <button
            className={`bg-green-600 text-white py-2 px-4 rounded ${!hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNextPage}
            disabled={!hasNextPage}
          >
            Trang tiếp theo
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationList;