import React, { useState, useRef, useEffect } from 'react';

const Home = ({
    search,
    setSearch,
    handleSearch,
    roomTypes,
    setRoomTypes,
    apartmentSizes,
    setApartmentSizes,
    amenities,
    setAmenities,
    pricePeriods,
    setPricePeriods,
    maxPrice,
    setMaxPrice
}) => {

    const [roomTypeOpen, setRoomTypeOpen] = useState(false);
    const [apartmentSizeOpen, setApartmentSizeOpen] = useState(false);
    const [amenityTypeOpen, setAmenityTypeOpen] = useState(false);
    const [pricePeriodTypesOpen, setPricePeriodTypesOpen] = useState(false);

    const filtersRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filtersRef.current && !filtersRef.current.contains(event.target)) {
                setRoomTypeOpen(false);
                setApartmentSizeOpen(false);
                setAmenityTypeOpen(false);
                setPricePeriodTypesOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => { 
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const roomTypeOptions = [
        "Single",
        "Double",
        "Triple"
    ];

    const apartmentSizeOptions = [
        "1 Bedroom",
        "2 Bedroom",
        "4 Bedroom"
    ];

    const amenityTypeOptions = [
        "Laundry Room",
        "Study Space",
        "Kitchen",
        "Mailbox",
        "Parking",
        "Fitness Center",
        "Communal Kitchen",
        "Communal Bathroom",
        "Pool",
        "Coffee Bar",
        "Computer Lab",
        "Volleyball Court",
        "Sauna"
    ];

    const maxPriceOptions = [
        "5000",
        "7500",
        "10000",
        "12500",
        "15000",
        "18000"
    ];

    const pricePeriodOptions = [
        "Per Semester",
        "Per Academic Year",
        "Academic Term",
        "Extended Academic Term",
        "Summer + Academic Term"
    ];


    return (
        <div className="relative min-h-screen">
            <img
                src="/homeImage.jpg"
                className="absolute inset-0 w-full h-full object-cover blur-[2px]"
                alt=""
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/50 flex items-center justify-center">
                <div className="text-center text-white max-w-5xl px-4">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight p-3 drop-shadow-lg">
                        Find The Perfect Living Space
                    </h1>

                    <div className="bg-white/25 p-4 rounded-3xl shadow-2xl backdrop-blur-md max-w-5xl mx-auto">
                        <div ref={filtersRef} className="flex flex-col md:flex-row gap-3 items-stretch relative">

                            <input
                                type="text"
                                placeholder="I want my own room..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none
                                focus:ring-2 focus:ring-amber-500 bg-white text-black transition-colors duration-200"
                            />

                            <div className="relative flex flex-col justify-center gap-1 px-4 py-2 rounded-lg border border-gray-300 md:w-35 shrink-0">
                                <label className="text-xs mr-4 font-semibold text-white/80 text-center whitespace-nowrap">
                                    Room Type
                                </label>
                                
                                <button onClick={() => setRoomTypeOpen(!roomTypeOpen)}
                                    className="w-full border rounded-xl px-4 py-2 bg-transparent text-center">

                                        {roomTypes.length === 0 ? "Select Room Types" : roomTypes.length === 1 ? roomTypes[0] : `${roomTypes.length} Room Types Selected`
                                        }
                                    </button>

                                    {roomTypeOpen && (
                                        <div className="absolute left-0 top-full mt-2 z-50 w-full bg-transparent border border-gray-300 rounded-xl shadow-lg p-2 max-h-72 overflow-y-auto">
                                            {roomTypeOptions.map((roomType) => (
                                                <label key={roomType} className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-600 rounded-lg">

                                                    <input type="checkbox" checked={roomTypes.includes(roomType)}
                                                    onChange={() => {
                                                        if (roomTypes.includes(roomType)) {
                                                            setRoomTypes(roomTypes.filter ((type) => type !== roomType));
                                                        } else {
                                                            setRoomTypes([...roomTypes, roomType]);
                                                        }
                                                    }}/>
                                                    <span className="text-white text-sm">
                                                        {roomType}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                            </div>


                            <div className="relative flex flex-col justify-center gap-1 px-4 py-2 rounded-lg border border-gray-300 md:w-35 shrink-0">
                                <label className="text-xs mr-4 font-semibold text-white/80 text-center whitespace-nowrap">
                                    Apt Size
                                </label>
                                
                                <button onClick={() => setApartmentSizeOpen(!apartmentSizeOpen)}
                                    className="w-full border rounded-xl px-4 py-2 bg-transparent text-center">

                                        {apartmentSizes.length === 0 ? "Select Apt Sizes" : apartmentSizes.length === 1 ? apartmentSizes[0] : `${apartmentSizes.length} Apt Sizes Selected`
                                        }
                                    </button>

                                    {apartmentSizeOpen && (
                                        <div className="absolute left-0 top-full mt-2 z-50 w-full bg-transparent border border-gray-300 rounded-xl shadow-lg p-2 max-h-60 overflow-y-auto">
                                            {apartmentSizeOptions.map((apartmentSize) => (
                                                <label key={apartmentSize} className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-600 rounded-lg">

                                                    <input type="checkbox" checked={apartmentSizes.includes(apartmentSize)}
                                                    onChange={() => {
                                                        if (apartmentSizes.includes(apartmentSize)) {
                                                            setApartmentSizes(apartmentSizes.filter ((type) => type !== apartmentSize));
                                                        } else {
                                                            setApartmentSizes([...apartmentSizes, apartmentSize]);
                                                        }
                                                    }}/>
                                                    <span className="text-white text-sm">
                                                        {apartmentSize}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                            </div>

                            <div className="relative flex flex-col justify-center gap-1 px-4 py-2 rounded-lg border border-gray-300 md:w-35 shrink-0">
                                <label className="text-xs mr-4.5 font-semibold text-white/80 text-center whitespace-nowrap">
                                    Amenities
                                </label>

                                <button onClick={() => setAmenityTypeOpen(!amenityTypeOpen)}
                                    className="w-full border rounded-xl px-4 py-2 bg-transparent text-center">

                                        {amenities.length === 0 ? "Select Amenities" : amenities.length === 1 ? amenities[0] : `${amenities.length} Amenities Selected`
                                        }
                                    </button>

                                    {amenityTypeOpen && (
                                        <div className="absolute left-0 top-full mt-2 z-50 w-full bg-transparent border border-gray-300 rounded-xl shadow-lg p-2 max-h-60 overflow-y-auto">
                                            {amenityTypeOptions.map((amenityType) => (
                                                <label key={amenityType} className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-600 rounded-lg">

                                                    <input type="checkbox" checked={amenities.includes(amenityType)}
                                                    onChange={() => {
                                                        if (amenities.includes(amenityType)) {
                                                            setAmenities(amenities.filter ((type) => type !== amenityType));
                                                        } else {
                                                            setAmenities([...amenities, amenityType]);
                                                        }
                                                    }}/>
                                                    <span className="text-white text-sm">
                                                        {amenityType}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="relative flex flex-col justify-center gap-1 px-2 py-2 rounded-lg border border-gray-300 md:w-35 shrink-0">
                                <label className="text-xs mr-4.5 font-semibold text-white/80 text-center whitespace-nowrap">
                                    Price
                                </label>

                                <button onClick={() => setPricePeriodTypesOpen(!pricePeriodTypesOpen)}
                                    className="w-full border rounded-xl px-1 py-2 bg-transparent text-center">

                                        {pricePeriods.length === 0 && !maxPrice ? "Select Price Period and Max Price" : `${pricePeriods.length} Price Periods${maxPrice ? ` • $${Number(maxPrice).toLocaleString()} Max ` : ""}`
                                        }
                                    </button>

                                    {pricePeriodTypesOpen && (
                                        <div className="absolute left-0 top-full mt-2 z-50 w-full bg-transparent border border-gray-300 rounded-xl shadow-lg p-2 max-h-60 overflow-y-auto">
                                            {pricePeriodOptions.map((pricePeriodType) => (
                                                <label key={pricePeriodType} className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-600 rounded-lg">

                                                    <input type="checkbox" checked={pricePeriods.includes(pricePeriodType)}
                                                    onChange={() => {
                                                        if (pricePeriods.includes(pricePeriodType)) {
                                                            setPricePeriods(pricePeriods.filter ((type) => type !== pricePeriodType));
                                                        } else {
                                                            setPricePeriods([...pricePeriods, pricePeriodType]);
                                                        }
                                                    }}/>
                                                    <span className="text-white text-sm">
                                                        {pricePeriodType}</span>
                                                </label>
                                            ))}

                                            <p className="text-white text-xs font-semibold px-2 py-2">
                                                Max Price
                                            </p>

                                            {maxPriceOptions.map((price) => (
                                                <label key={price}
                                                className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-600 rounded-lg">
                                                    <input type="radio" name="maxPrice" value={price} 
                                                    checked={maxPrice === price} onChange={() => setMaxPrice(price)}/>

                                                    <span className="text-white text-sm">
                                                        ${Number(price).toLocaleString()}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>

                                    )}
                                </div>


                            <button onClick={handleSearch}
                            className="bg-amber-600 text-white py-3 rounded-3xl font-semibold hover:bg-amber-700 px-3.5 transition-colors shrink-0">
                                Search
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;