export const fetchData = async (page, articles, setArticles, setEnd) => {
  console.log(`fetching data, page number: ${page}`);
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=bbc-news,cbc-news,nbc-news,fox-news,mtv-news=&page=${page}&pageSize=10&apiKey=48dec07403fe43efbbb1ccae07b1c4c9`,
  );
  const jsonData = await response.json();
  if (jsonData.articles.length === 0) {
    setEnd(true);
  }

  setArticles([...articles, ...jsonData.articles]);
};
