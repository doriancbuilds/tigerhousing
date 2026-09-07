import React, { useState, Fragment } from 'react'
import { FaChevronLeft, FaChevronRight, FaX } from "react-icons/fa6";

 const Model = ({onClose, properties, selectedProperty}) => {

    console.log(properties.indexOf(selectedProperty));

    const [currentPropertyIndex, setCurrentProperty] = useState(properties.indexOf(selectedProperty));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    if(!properties || properties.length === 0){
        return null;
    }

    const currentProperty = properties[currentPropertyIndex];
    const images = currentProperty.images || [];
    const amenities = currentProperty.amenities || [];
    const traits = currentProperty.traits || [];

    const nextProperty = () => {
        setCurrentProperty( (prev) => (prev == properties.length - 1 ? 0 :
        prev + 1));
        setCurrentImageIndex(0);
    }

    const previousProperty = () => {
        setCurrentProperty( (prev) => (prev == 0 ? properties.length -  1 : prev - 1))
        setCurrentImageIndex(0);

    }

    const nextImage = () => {
        setCurrentImageIndex( (prev) => (prev === images.length - 1 ? 0 :
        prev + 1 ))
    }

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center
            justify-center z-50 p-4" onClick={onClose}>


                <div className="relative bg-white rounded-xl max-w-3xl w-full">

                <button onClick={(e) => {
                    e.stopPropagation();
                    nextProperty();
                }}
                className="absolute -right-14 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white">
                            <FaChevronRight size={20}/>
                    </button>


                    <button onClick={(e) => {
                    e.stopPropagation();
                    previousProperty();
                }}

                 className="absolute -left-14 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white">
                            <FaChevronLeft size={20}/>
                        </button>

                <div className="
                md:max-h-[90vh] overflow-y-auto shadow-2xl" 
                onClick={(e) => e.stopPropagation()}>


                    <div className="relative h-[240px] md:h-[280px]">
                        <img src={images[currentImageIndex]} alt={currentProperty.name}
                        className="w-full h-full object-cover bg-gray-100"/>


                        <button onClick={previousImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80
                        p-2 rounded-full hover:bg-white">
                            <FaChevronLeft size={20}/>
                        </button>

                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80
                        p-2 rounded-full hover:bg-white">
                            <FaChevronRight size={20}/>
                        </button>

                        <button onClick={onClose} className="absolute text-white top-10 right-5 -translate-y-1/2 bg-red-500
                        p-2 rounded-full">
                            <FaX size={20}/>
                        </button>


                        <div className="absolute top-3 left-3 bg-black/90 text-white px-3 py-1 rounded-full text-sm"> 
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </div>

                    <div className="p-6 text-center"> 


                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {currentProperty.name}</h2>
                    <div className="text-lg text-gray-500 font-bold mb-6">
                        {currentProperty.location} </div>

                        <div className="border-t border-gray-200 pt-5 mt-5 text-left">
                        <h4 className="text-2xl font-semibold text-gray-800 mb-2" >Description</h4>
                        <p className="text-gray-500 font-bold leading-relaxed">{currentProperty.description}</p>
                    </div>
                    

                        <div className="border-t border-gray-200 pt-5 mt-4 text-left">
                        <h4 className="text-2xl font-semibold text-gray-800 mb-2" >Amenities</h4>
                        <div className="flex items-center gap-3 flex-wrap justify-center"> {amenities.map((amenity) => (
                        
                            <Fragment key={amenity}>
                                {(amenity !== 'Communal Kitchen' && amenity !== 'Communal Bathroom') && (
                                        <div className="flex items-center justify-center px-3 py-2 font-bold md:w-40 border rounded-3xl">
                                            {amenity}
                                    </div>
                                )}

                                {(amenity == 'Communal Kitchen' || amenity == 'Communal Bathroom') && (
                                        <div className="flex items-center justify-center px-3 py-2 font-bold md:w-51 border rounded-3xl">
                                            {amenity}
                                    </div>
                                )}
                                </Fragment>
                        ))}
                        </div>
                    </div>

                        <div className="border-t border-gray-200 pt-5 mt-4 text-left">
                        <h3 className="text-2xl text-left font-bold text-gray-800 mb-2"
                        >Room Options</h3>
                    </div>

                       <div className="text-gray-800 font-bold">
                        {traits.map((trait) => (
                            <div className="border rounded-4xl p-4 mb-3" key={`${trait.room_type}-${trait.floor_plan}`}>

                                    {trait.room_type}
                                
                                    {trait.floor_plan !== trait.room_type && (
                                        <div>{trait.floor_plan}</div>
                                    )}
                            <div>

                                {trait.semester_price && (
                                    <div>
                                        ${trait.semester_price} / semester
                                    </div>
                                )} 
                            </div>

                            <div>
                                {trait.academic_year_price && (
                                    <div>
                                        ${trait.academic_year_price} / academic year
                                        </div>
                                )}
                            </div> 

                            {trait.academic_term_price && (
                                <div>
                                    ${trait.academic_term_price} / academic term
                            </div>
                            )}

                            {trait.summer_academic_term_price && (
                                <div>
                                    ${trait.summer_academic_term_price} / summer + academic term
                            </div>
                            )}

                            {trait.extended_academic_term_price && (
                                <div>
                                    ${trait.extended_academic_term_price} / extended academic term
                            </div>
                            )}
                        </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    </div>

    )
 }

 export default Model;