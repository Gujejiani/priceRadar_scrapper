import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-l-md p-2 w-full"
        placeholder="Enter a product name..."
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white rounded-r-md p-2"
      >
        Search
      </button>
    </div>
  );
};
