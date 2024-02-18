const getSimilarWords = async (word: string): Promise<string[]> => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: word,
        })
      };
    try {
      const response = await fetch("http://18.181.87.200:12358/similarwords", options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data.results;
    } catch (e) {
      console.error('Error:', e);
      return [""]; // エラーメッセージを一貫性のあるものに
    }
  }
  
export { getSimilarWords };