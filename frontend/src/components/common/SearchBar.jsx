const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name, role, mobile, Aadhaar"
      onChange={(e) => onSearch(e.target.value)}
      style={styles.input}
    />
  );
};

export default SearchBar;

const styles = {
  input: {
    padding: "8px",
    width: "300px",
    marginBottom: "15px",
  },
};
