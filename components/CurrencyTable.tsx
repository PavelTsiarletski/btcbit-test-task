import React, { useEffect, useState } from 'react';
import { useCurrencies } from '@/hooks';
import { transformData } from '@/utils';
import Link from 'next/link';

interface Currency {
  name: string;
  balance: string;
}

const CurrencyTable = () => {
  const { currencies, loading, error } = useCurrencies();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Currency[]>([]);

  useEffect(() => {
    if (currencies.length) {
      setFilteredData(transformData(currencies));
    }
  }, [currencies]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toUpperCase();
    setSearchTerm(term);
    if (term) {
      setFilteredData(
        transformData(currencies).filter((currency) =>
          currency.name.includes(term)
        )
      );
    } else {
      setFilteredData(transformData(currencies));
    }
  };

  const handleDelete = (currencyName: string) => {
    setFilteredData(
      filteredData.filter((currency) => currency.name !== currencyName)
    );
  };

  if (loading) return <div>Loading...</div>;

  const rows = [];
  for (let i = 0; i < filteredData.length; i += 3) {
    rows.push(filteredData.slice(i, i + 3));
  }

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <Link href="/error">
        <span className="text-blue-500 hover:underline">
          Go to error handler
        </span>
      </Link>
      <h2 className="text-3xl font-bold mb-6">Balances</h2>
      <input
        type="text"
        placeholder="Search by currency code"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-6 px-4 py-2 border rounded w-full"
      />
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {Array(3)
              .fill(null)
              .map((_, idx) => (
                <React.Fragment key={idx}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </React.Fragment>
              ))}
          </tr>
        </thead>
        <tbody>
          {error ? (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          ) : (
            rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {row.map((currency, idx) => (
                  <React.Fragment key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {currency.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {currency.balance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDelete(currency.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </React.Fragment>
                ))}
                {Array(3 - row.length)
                  .fill(null)
                  .map((_, idx) => (
                    <React.Fragment key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    </React.Fragment>
                  ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
