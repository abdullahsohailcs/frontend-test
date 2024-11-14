const SearchIcon= () => {
  return (
    <svg
      className="absolute left-4 top-1/2 transform -translate-y-1/2" // Apply className to the SVG element
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.8 }} // Set the opacity to 80%
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9816 9.61047C16.9816 13.1526 13.9625 16.2209 9.9908 16.2209C6.01908 16.2209 3 13.1526 3 9.61047C3 6.06828 6.01908 3 9.9908 3C13.9625 3 16.9816 6.06828 16.9816 9.61047ZM15.3467 17.7247C13.7988 18.6721 11.9614 19.2209 9.9908 19.2209C4.47303 19.2209 0 14.9182 0 9.61047C0 4.30275 4.47303 0 9.9908 0C15.5086 0 19.9816 4.30275 19.9816 9.61047C19.9816 11.9596 19.1054 14.1118 17.6503 15.7813L24.0019 21.9159L21.8441 24L15.3467 17.7247Z"
        fill="black"
      />
    </svg>
  );
}

export default SearchIcon;
