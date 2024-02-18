const convertToNinja = async (sentence: string): Promise<string> => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sentence,
        })
      };
    try {
      const response = await fetch("http://18.181.87.200:12358/toninja", options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.content;
    } catch (e) {
      console.error('Error:', e);
      return ""; // エラーメッセージを一貫性のあるものに
    }
  }
  
export { convertToNinja };