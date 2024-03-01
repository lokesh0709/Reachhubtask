import React, { useState } from 'react';

const CompanyInfo = () => {
  const [ticker, setTicker] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);
  const [fetchNews, setFetchNews] = useState(false);

  const API_KEY = 'cngv959r01qhlsli9ni0cngv959r01qhlsli9nig';

  const handleInputChange = (e) => {
    setTicker(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const companyResponse = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`);
      if (!companyResponse.ok) {
        throw new Error('Kindly enter a valid ticker symbol!');
      }
      const companyData = await companyResponse.json();
      setCompanyData(companyData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFetchNews = async () => {
    setError(null);
    try {
      const newsResponse = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`);
      if (!newsResponse.ok) {
        throw new Error('Try again!');
      }
      const newsData = await newsResponse.json();
      setNewsData(newsData);
    } catch (error) {
      setError(error.message);
    }
    setFetchNews(true);
  };

  return (
    <div className="company-info-container">
      <h1>Company Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Ticker Symbol:
          <input type="text" value={ticker} onChange={handleInputChange} />
        </label>
        <button type="submit">Get Information</button>
      </form>
      {error && <p className="error-message">Error: {error}</p>}
      {companyData && (
        <div>
          <h2>{companyData.name}</h2>
          <p>Industry: {companyData.finnhubIndustry}</p>
          <p>Website: <a href={companyData.weburl} target="_blank" rel="noopener noreferrer">{companyData.weburl}</a></p>
          <button onClick={handleFetchNews}>Get Latest News</button>
        </div>
      )}
      {fetchNews && (
        <div>
          <h2>Latest News</h2>
          {newsData ? (
            <ul>
              {newsData.slice(0, 5).map((newsItem, index) => (
                <li key={index}>
                  <a href={newsItem.url} target="_blank" rel="noopener noreferrer">{newsItem.headline}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyInfo;
