import React, { useState, useEffect } from 'react';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import '../styles/searchcomponent.css';
import NoresultSVG from './svg/noresult';
import ErrorSVG from './svg/error';
import Card from './card';
import Tag from './tag';
import SearchBar from './searchbar';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tags = ["Languages", "Build", "Design", "Cloud"];
  let cancelToken: CancelTokenSource | null = null;

  useEffect(() => {
    // Set up the debouncing for search term
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedTerm) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      if (cancelToken) cancelToken.cancel();
      cancelToken = axios.CancelToken.source();

      try {
        const response = await axios.get(
          `https://frontend-test-api.digitalcreative.cn/?no-throttling=false&search=${debouncedTerm}`,
          {
            cancelToken: cancelToken.token,
            timeout: 5000, // Set timeout to 5 seconds
          }
        );
        setResults(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Previous request canceled:", error.message);
        } else if ((error as AxiosError).code === 'ECONNABORTED') {
          console.error("Request timed out:", error);
          setError("The request timed out.");
        } else {
          console.error("Error fetching data:", error);
          setError("Something went wrong, but this is not your fault : )");
        }
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (cancelToken) cancelToken.cancel();
    };
  }, [debouncedTerm]);

  const handleTagClick = (tagText: string) => {
    setSearchTerm(tagText);
    setActiveTag(tagText); // Set the clicked tag as active
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setActiveTag(null); // Make the tag passive as soon as the user starts typing
  };

  const calculateMaxHeight = () => {
    if (loading || error || results.length === 0) return '600px';
    return `${Math.min(600, 150 + results.length * 100)}px`; // Adjusts the height based on results
  };

  return (
    <div data-testid="search-component">
      <div
        className="pt-4 pr-4 pl-4 bg-white w-full sm:w-[90%] md:w-[690px] max-w-full mx-auto"
        style={{
          height: calculateMaxHeight(),
          overflow: 'hidden',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          boxShadow: '0px 50px 100px -20px #32325D40, 0px 30px 60px -30px #00000040',
          transition: 'height 0.3s ease',
        }}
      >
        <div className="pt-2 pl-2 pr-2 flex flex-col space-y-3 h-full">
          
          {/* Use the SearchBar component */}
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={handleSearchChange} 
            error={!!error} // Pass error as a boolean
          />

          <div className="flex flex-wrap gap-2 pt-2 pb-2 tag-component">
            {tags.map((tag) => (
              <Tag
                key={tag}
                text={tag}
                isActive={activeTag === tag}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>

          <div className="space-y-4 overflow-y-auto flex-grow relative">
  {/* Show spinner with overlay when loading and there are results */}
  {loading && results.length > 0 && (
    <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex justify-center items-center">
      <div className="w-10 h-10 border-solid rounded-full animate-spin spinner"></div>
    </div>
  )}

  {/* Show spinner without overlay when loading and there are no results */}
  {loading && results.length === 0 && (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      <div className="w-10 h-10 border-solid rounded-full animate-spin spinner"></div>
    </div>
  )}

  {/* Show the content or error */}
  <div className={`${loading ? 'opacity-50' : ''} flex flex-col justify-center items-center`}>
    {error ? (
      <div className="flex justify-center items-center" style={{ paddingTop: '70px' }}>
        <ErrorSVG />
      </div>
    ) : results.length > 0 ? (
      <div className="card-container flex flex-col w-full gap-4">
        {results.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
            url={item.url}
          />
        ))}
      </div>
    ) : (
      !loading && (
        <div className="flex justify-center items-center h-full w-full" style={{ paddingTop: '70px' }}>
          <NoresultSVG />
        </div>
      )
    )}
  </div>
</div>


        </div>
      </div>

      <div className="pl-6 pt-4 pb-4 bg-white w-full sm:w-[90%] md:w-[690px] max-w-full mx-auto lowerbox">
        <div className="text-left">
          {error ? (
            <div className="mt-2" style={{ color: '#ED2E7E' }}>
              {error}
            </div>
          ) : loading ? (
            "Searching..."
          ) : results.length > 0 ? (
            `${results.length} results`
          ) : searchTerm ? (
            "No result"
          ) : (
            "No result"
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
