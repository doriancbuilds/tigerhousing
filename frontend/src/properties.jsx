import React from 'react';

const Properties = ({setSelectedProperty, properties}) => {

        
    return (
        <section className="max-w-7xl mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center"> Towson University Housing   
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-8">
                {properties.map((property) => (
                    <div key={property.property_id}
                    className="bg-white rounded-2xl drop-shadow-lg overflow-hidden
                    hover-shadow-xl hover:scale-105 transition-all duration-300
                    relative group cursor-pointer"
                    onClick={()  => setSelectedProperty(property)}
                    >

                        <div className="relative h-72">
                            <img 
                                src={(property.images || []) [0]} className="w-full h-full object-cover
                                group-hover:scale-105 transition-transform duration-300"
                                alt={property.name}
                            />
                        </div>

                        
                        <div className="p-5">
                        <div className="text-sm font-bold text-gray-500 mb-2">
                            {property.location}
                            </div>
                            
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">{property.name}</h3>
                    </div>
                    </div>
                ))}
            </div>
            
        </section>
     );
};

export default Properties;