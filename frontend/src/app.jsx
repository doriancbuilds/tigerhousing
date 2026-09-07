import React, { useState, useEffect } from 'react';
import Home from "./home.jsx";
import Properties from "./properties.jsx";
import Footer from "./footer.jsx";
import Model from './model.jsx';

const API_URL = import.meta.env.VITE_API_URL;

function App () {

        const[properties, setProperties] = useState([]);
        const[filteredProperties, setFilteredProperties] = useState([]);


        const [search, setSearch] = useState("");
        const [roomTypes, setRoomTypes] = useState([]);
        const [apartmentSizes, setApartmentSizes] = useState([]);
        const [amenities, setAmenities] = useState([]);
        const [pricePeriods, setPricePeriods] = useState([]);
        const [maxPrice, setMaxPrice] = useState("");
            

    useEffect(() => {
                fetch(`{API_URL}/api/properties`)
                    .then(res=>res.json())
                    .then(data => {                       
                        setProperties(data);
                    setFilteredProperties(data);
                    })
                    .catch(err=>console.log(err));
            }, []);

    const [selectedProperty, setSelectedProperty] = useState(null);


        const parseSearch = (input) => {
            const value = input.toLowerCase();

            let parsedRoomTypes = [];
            let parsedApartmentSizes = [];
            let parsedAmenities = [];
            let parsedPrice = [];            

            if(value.includes("single room") || value.includes("own room") || value.includes("single") || value.includes("i want my own room") || value.includes("private bedroom") || value.includes("room to myself") || value.includes("private bedroom")) {
                parsedRoomTypes.push( "Single"
                );
            }

            if(value.includes("shared room") || value.includes("share a room") || value.includes("double") || value.includes("room with another person") || value.includes("room with a roommate") || value.includes("roommate in my room") || value.includes("one roommate")) {
                parsedRoomTypes.push("Double");
            }

            if(value.includes("shared room") || value.includes("share a room") || value.includes("triple") || value.includes("room with 2 other people") || value.includes("room with 2 roommates") || value.includes("roommates in my room") || value.includes("two roommates")) {
                parsedRoomTypes.push("Triple");
            }

            if(value.includes("1 bedroom") || value.includes("one bedroom")) {
                parsedApartmentSizes.push( "1 Bedroom"
                );
            }

            if(value.includes("2 bedroom") || value.includes("2 bedrooms") ||value.includes("two bedroom")) {
                parsedApartmentSizes.push( "2 Bedroom"
                );
            }

            if(value.includes("4 bedroom") || value.includes("4 bedrooms") || value.includes("four bedroom")) {
                parsedApartmentSizes.push( "4 Bedroom"
                );
            }

            if(value.includes("laundry") || value.includes("laundry room")) {
                parsedAmenities.push("Laundry Room"
                );
            }

            if(value.includes("study area") || value.includes("study lounge") || value.includes("study space") || value.includes("study room")) {
                parsedAmenities.push("Study Space"
                );
            }

            if(value.includes("kitchen") || value.includes("cooking")) {
                parsedAmenities.push("Kitchen"
                );
            }

            if(value.includes("package") || value.includes("mailbox") || value.includes("packages") || value.includes("post office") || value.includes("mailroom")) {
                parsedAmenities.push("Mailbox"
                );
            }

            if(value.includes("parking") || value.includes("parking spots")) {
                parsedAmenities.push("Parking"
                );
            }

            if(value.includes("gym") || value.includes("fitness") || value.includes("workout")) {
                parsedAmenities.push("Fitness Center"
                );
            }

            if(value.includes("communal kitchen") || value.includes("coooking area") || value.includes("kitchen area")) {
                parsedAmenities.push("Communal Kitchen"
                );
            }

            if(value.includes("communal bathroom") || value.includes("shared bathroom") || value.includes("bathroom with others")) {
                parsedAmenities.push("Communal Bathroom"
                );
            }

            if(value.includes("pool") || value.includes("swimming pool") || value.includes("swim") || value.includes("acvitities") || value.includes("sports") || value.includes("swimming")) {
                parsedAmenities.push("Pool"
                );
            }

            if(value.includes("coffee bar") || value.includes("coffee") || value.includes("matcha") ) {
                parsedAmenities.push("Coffee Bar"
                );
            }

            if(value.includes("computer lab") || value.includes("computer area") || value.includes("computers")) {
                parsedAmenities.push("Computer Lab"
                );
            }

            if(value.includes("volleyball court") || value.includes("volleyball area") || value.includes("volleyball") || value.includes("sports") || value.includes("activities")) {
                parsedAmenities.push("Volleyball Court"
                );
            }

            if(value.includes("sauna") || value.includes("sauna area")) {
                parsedAmenities.push("Sauna"
                );
            }

            if(value.includes("per semester") || value.includes("semester") || value.includes("semester price")) {
                parsedPrice.push("Per Semester"
                );
            }

            if(value.includes("per year") || value.includes("academic year") || value.includes("per academic year")) {
                parsedPrice.push("Per Academic Year"
                );
            }

            if(value.includes("academic term") || value.includes("per academic term") || value.includes("academic term price")) {
                parsedPrice.push("Academic Term"
                );
            }
            
            if(value.includes("extended academic term") || value.includes("per extended academic term") || value.includes("extended academic term price")) {
                parsedPrice.push("Extended Academic Term"
                );
            }

            if(value.includes("summer + academic term") || value.includes("per summer + academic term") || value.includes("summer + academic term price")) {
                parsedPrice.push("Summer + Academic Term"
                );
            }

            return {
                roomTypes: parsedRoomTypes,
                apartmentSizes: parsedApartmentSizes,
                amenities: parsedAmenities,
                pricePeriods: parsedPrice,
            };
        };
        

    const handleSearch= () => {
        const searchValue = search.toLowerCase();

        const parsedSearch = parseSearch(search);

        const selectedRoomTypes = [
            ...new Set([...roomTypes, ...parsedSearch.roomTypes])
        ];

        const selectedApartmentSizes = [
            ...new Set([...apartmentSizes, ...parsedSearch.apartmentSizes])
        ];

        const selectedAmenities = [
            ...new Set([...amenities, ...parsedSearch.amenities])
        ];

        const selectedPricePeriods = [
            ...new Set([...pricePeriods, ...parsedSearch.pricePeriods])
        ]
        const hasParsedSearch = parsedSearch.roomTypes.length > 0 || parsedSearch.apartmentSizes.length > 0 || parsedSearch.amenities.length > 0 || parsedSearch.pricePeriods.length > 0;

        const filteredData = properties.filter(property =>
        (
        searchValue === "" ||
        hasParsedSearch || 
        property.name.toLowerCase().includes(searchValue) || 
        property.type.toLowerCase().includes(searchValue) ||
        property.location.toLowerCase().includes(searchValue) ||
        property.description.toLowerCase().includes(searchValue)
        )

        &&
        (

        (selectedRoomTypes.length === 0 && selectedApartmentSizes.length === 0 && selectedPricePeriods.length === 0 && maxPrice === "") ||
        
            (property.traits || []).some(trait => {

                const matchesRoomType =
                    selectedRoomTypes.length === 0 ||
                    selectedRoomTypes.includes(trait.room_type);

                const matchesApartmentSize =
                    selectedApartmentSizes.length === 0 ||
                    selectedApartmentSizes.includes(trait.apartment_size);

            const selectedPrices = [];

            const noPricePeriodSelected = selectedPricePeriods.length === 0;


            if (noPricePeriodSelected || selectedPricePeriods.includes("Per Semester")) {
                selectedPrices.push(trait.semester_price);
            }

            if (noPricePeriodSelected || selectedPricePeriods.includes("Per Academic Year")) {
                selectedPrices.push(trait.academic_year_price);
            }

            if (noPricePeriodSelected || selectedPricePeriods.includes("Academic Term")) {
                selectedPrices.push(trait.academic_term_price);
            }

            if (noPricePeriodSelected || selectedPricePeriods.includes("Summer + Academic Term")) {
                selectedPrices.push(trait.summer_academic_term_price);
            }
            
            if (noPricePeriodSelected || selectedPricePeriods.includes("Extended Academic Term")) {
                selectedPrices.push(trait.extended_academic_term_price);
            }

            const matchesPrice = selectedPricePeriods.length === 0 && maxPrice === "" ? true : maxPrice === ""
            ? selectedPrices.some(price => price !== null && price !== undefined) : selectedPrices.some(price => price !== null && price !== undefined && price <= Number(maxPrice));


            return (
                matchesRoomType && matchesApartmentSize && matchesPrice
            );
          })
        )

        &&
        (
            selectedAmenities.length === 0 ||
            selectedAmenities.every(amenity => 
                (property.amenities || []).includes(amenity)
            )
        ));
        setFilteredProperties(filteredData);
  };

    return (
        <div className="min-h-screen w-full bg-gray-50">
 
        <Home 
        
                search={search}
                apartmentSizes={apartmentSizes}
                setApartmentSizes={setApartmentSizes}
                setSearch={setSearch}
                roomTypes={roomTypes}
                setRoomTypes={setRoomTypes}
                amenities={amenities}
                setAmenities={setAmenities}
                pricePeriods={pricePeriods}
                setPricePeriods={setPricePeriods}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                handleSearch={handleSearch}
        
        
        />
        
        <Properties setSelectedProperty = {setSelectedProperty}
                    properties = {filteredProperties} />

        <Footer />


        {selectedProperty && (
            <Model properties={properties} 
                selectedProperty={selectedProperty}
            onClose={()  => setSelectedProperty(null)} />
                
        )}

        </div>

    );
}

export default App;