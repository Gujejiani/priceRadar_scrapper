import { Search } from '@/components/client/Search';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">PharmacyRadar</h1>
      </header>
      <main className="flex flex-col items-center flex-1 p-24">
        <h2 className="text-4xl font-bold mb-4">Welcome to PharmacyRadar</h2>
        <p className="text-lg text-gray-600 mb-8">
          Your one-stop shop for comparing pharmacy prices.
        </p>
        <Search />
      </main>
    </div>
  );
}
