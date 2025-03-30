import React, { useState } from 'react';
import './Searchbar.scss';
import { Link } from 'react-router-dom';

const types = ["buy", "rent"];

function Searchbar() {
    const [query, setQuery] = useState({
        type: "buy",
        city: "",
        minPrice: "",
        maxPrice: "",
    });

    const switchType = (val) => {
        setQuery(prev => ({ ...prev, type: val }));
    };

    const handleChange = (e) => {
        setQuery(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Construct the query parameters dynamically to avoid sending empty values
    const buildQueryParams = () => {
        const params = new URLSearchParams();
        params.append("type", query.type);
        
        if (query.city.trim()) params.append("city", query.city.toLowerCase()); // Case insensitive
        if (query.minPrice !== "") params.append("minPrice", query.minPrice);
        if (query.maxPrice !== "") params.append("maxPrice", query.maxPrice);

        return params.toString();
    };

    return (
        <div className='searchBar'>
            <div className="type">
                {types.map((type) => (
                    <button key={type} onClick={() => switchType(type)} className={query.type === type ? "active" : ""}>
                        {type}
                    </button>
                ))}
            </div>
            <form>
                <input type="text" name="city" placeholder="City" onChange={handleChange} />
                <input type="number" name="minPrice" min={0} max={10000000} placeholder="Min Price" onChange={handleChange} />
                <input type="number" name="maxPrice" min={0} max={10000000} placeholder="Max Price" onChange={handleChange} />
                
                <Link to={`/list?${buildQueryParams()}`}>
                    <button type="button">
                        <img src="/search.png" alt="Search" />
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default Searchbar;
