import React from 'react';
import { MapPin, BedDouble, Bath } from 'lucide-react';
import Button from './Button';

export default function Card({
  title,
  location,
  price,
  category = "Apartment",
  image,
  bedrooms,
  bathrooms,
  onDetailsClick
}) {
  return (
    <div className="bg-[#161b26] border border-slate-800/90 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between">
      
      {/* Image & Category Tag */}
      <div>
        <div className="relative h-48 sm:h-52 bg-slate-800 overflow-hidden">
          <img
            src={image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-lg">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" /> 
            <span className="truncate">{location}</span>
          </p>

          {/* Specs */}
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
            {bedrooms && (
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-emerald-500" /> {bedrooms} Bed
              </span>
            )}
            {bathrooms && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-emerald-500" /> {bathrooms} Bath
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 pt-3 border-t border-slate-800/80 flex justify-between items-center">
        <div>
          <span className="text-lg font-bold text-emerald-400">৳ {price}</span>
          <span className="text-xs text-slate-500 font-normal"> /month</span>
        </div>
        <Button variant="secondary" size="sm" onClick={onDetailsClick}>
          View Details
        </Button>
      </div>

    </div>
  );
}