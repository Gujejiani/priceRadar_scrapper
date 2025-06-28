import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  disabled: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch, disabled }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="border border-gray-300 rounded-l-md p-2 w-full disabled:bg-gray-100"
        placeholder="ჩაწერე პროდუქტის სახელი..."
      />
      <button
        onClick={onSearch}
        disabled={disabled}
        className="bg-blue-500 text-white rounded-r-md p-2 disabled:bg-blue-300"
      >
        ძებნა
      </button>
    </div>
  );
};
