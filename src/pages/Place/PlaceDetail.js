import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BiBookmark } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { MyUserContext } from '../../configs/Context';
import APIs, { endpoints } from '../../configs/APIs';
import location from '../../assets/location.png'


const PlaceDetail = () => {
    const { placeId, destinationId} = useParams();
    const [destinations, setDestinations] = useState(null);
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [page, setPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading] = useState(true);
    // const [isFavorite, setIsFavorite] = useState(false);
    // const [isSubmittingFavorite, setIsSubmittingFavorite] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(null);
    const navigate = useNavigate();
    const user = useContext(MyUserContext);

    useEffect(() => {
        const getPlaceDetails = async () => {
            try {
                const response = await APIs.get(endpoints['placesDetail'](placeId, destinationId));
                setPlaces(response.data);
                console.log(places)
                // const favoriteJobs = JSON.parse(localStorage.getItem('favoriteJobs')) || [];
                // const isFav = favoriteJobs.some(item => item.id === jobId);
                // setIsFavorite(isFav);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getPlaceDetails();
    }, [placeId]);


    // const fetchPlaces = async (pageNum = 1) => {
    //     // if (loading) return;
    //     setLoading(true);
    
    //     try {
    //       const data = await APIs.get(endpoints["places"](placeId));
    //       if (data && Array.isArray(data.data)) {
    //         setPlaces(data.data);
    //         setFilteredPlaces(data.data);
    //         setPage(pageNum);
    //         setHasNextPage(!!data.next);
    //         if (data.data.length > 0) {
    //           setSelectedPlace(data.data[0]);
    //         }
    //       } else {
    //         console.error('API response does not contain a results array');
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     } finally {
    //       setLoading(false);
    //       setIsRefreshing(false);
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchPlaces();
    //   }, []);



    if (loading) {
        return (
            <div class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    

    if (!places) {
        return <div>Don't find any places</div>;
    }

    // const renderPlaceItem = (place) => (
    //     <div
    //       key={place.id}
    //       class="relative flex flex-col shadow-lg hover:shadow-2xl transform 
    //       hover:scale-105 transition-all duration-300 mb-4 rounded-lg
    //        bg-yellow-50 cursor-pointer w-96 h-full m-2"
    //       onClick={() => navigate(`/place-detail/${place.id}`)}
    //     >
            
    //       <img src={place.image} alt={place.title} class="w-full h-full object-cover rounded-sm" />
    //       <div class="text-center w-10 h-8 absolute bg-red-500 text-white text-xs font-bold p-2 ml-3">
    //             #{place.id}
    //         </div>
    //       <div class="flex items-center justify-center p-4 ">
    //         <div class="">
    //           <h2 class=" text-xl font-bold hover:underline transition-all duration-300">{place.title}</h2>
    //           <p className="text-sm">{place.description}</p>
    //         </div>
    //       </div>
    //     </div>
    // )


    return (
        <div className="container mx-auto min-w-[1230px]">
            <nav>
                <ol class="font-sans flex container mx-5 py-4 md:py-3 sm:px-5 lg:px-0">
                    <li>
                        <a class="text-gray-800 hover:underline" href="/">
                            <span>Home</span>
                        </a>
                    </li>
                    <li class="ml-1 mr-1">/</li>
                    <li class="breadcrumb-item">
                        <a class="text-gray-800 hover:underline" href="/destinations">
                            <span>Destinations</span>
                        </a>
                    </li>
                    <li class="ml-1 mr-1">/</li>
                    <li class="breadcrumb-item">
                        <a class="text-gray-800">
                            <span>Things to do in {places.title}</span>
                        </a>
                    </li>
                </ol>
            </nav>
                

            <div class="relative min-h-[400px]">
                <img src={places.image} alt={places.title} className="w-full h-64 object-cover mb-4 opacity-20" />
                
                <div class="absolute inset-0 opacity-80 flex justify-center my-8 ">
                    <div class="bg-white rounded-lg flex justify-center shadow-xl max-w-[1000px] max-h-72">
                        <img src={places.image} alt={places.title} className="min-w-[500px] h-72 object-cover mb-4 rounded-s-lg" />
                        <div class="min-w-[500px] h-72 p-10 space-y-5">
                            <h1 class="text-xl font-bold">{places.title} Tours and Tickets</h1>
                            <p class="text-sm">{places.description}</p>
                            <div class="flex space-x-2">
                                <img class="w-5 h-5" src={location}></img>
                                <p class="text-sm font-bold">{places.address}</p>
                            </div>
                            
                        </div>
                    </div>
                </div> 
                
            </div>


            <div className="items-center">
                <div className="max-w-[1000px] p-8 rounded bg-white">
                    <h1 className="text-3xl font-bold">
                        {places.title} Tours and Tickets
                    </h1>
                </div>
                <div className="container mx-auto min-w-[1200px]">
                    <div class="flex">
                        {places.tags.map(t => (
                            <div key={t.id} class="border border-gray-300 hover:border-black 
                            rounded-2xl p-2 m-1 flex items-center space-x-4 bg-gray-100 max-w-[230px] h-12">
                                <div class="font-bold text-sm">
                                    {t.name}
                                </div>
                            </div>
                        ))}  
                    </div> 
                </div>
            </div>


            <div class="flex items-center justify-center size-full">
                <div class="flex items-center w-full max-w-[1500px] space-x-4 m-10">
                    <div class="flex-grow border-t border-gray-300"></div>
                    <div class="w-auto h-10 opacity-60" data-action-capture="click">Why you are seeing <a class="underline" href='/destinations'>these recommendations</a></div>
                    <div class="flex-grow border-t border-gray-300"></div>
                </div>
            </div>

            {/* <div className="container mx-auto min-w-[1200px] bg-gray-100">
                <h1 class="p-7 text-2xl font-bold">Top 10 attractions in {places.title}</h1>

                <div>
                    {loading && page === 1 ? (
                        <div class="flex justify-center items-center h-64">
                        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
                        </div>
                    ) : filteredPlaces.length > 0 ? (
                        <div class="container mx-auto flex flex-wrap min-w-[1200px]">
                        {filteredPlaces.slice((page - 1) * 10, page * 10).map(renderPlaceItem)}
                        </div>
                    
                    ) : (
                        <div class="text-center py-4 text-gray-600">
                        <p>0 kết quả tìm kiếm</p>
                        </div>
                    )}
                </div>
            </div> */}

            {/* <div className="container mx-auto min-w-[1200px]">
                <h1 class="p-7 text-2xl font-bold">Explore {destinations.title} by interest</h1>
                <div class="flex">
                    {destinations.tags.map(t => (
                        <div key={t.id} class="border border-gray-300 hover:border-green-500 hover:text-green-500 
                        rounded-lg p-2 m-1 flex items-center space-x-4 bg-white shadow-md max-w-[230px] h-20">
                            <div class="font-bold text-base">
                                {t.name}
                            </div>
                            <img src={t.icon} alt="Icon" class="h-10 w-10" color='green'></img>
                        </div>
                    ))}  
                </div> 
            </div> */}
        </div>
        
    );
};

export default PlaceDetail;