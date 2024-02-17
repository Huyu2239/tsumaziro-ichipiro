const BASE_URL = `https://labs.goo.ne.jp/api/hiragana`;
const OUTPUT_TYPE = `hiragana`;


const convertToHiragana = async (sentence: string): Promise<string> => {
  const APIKEY = "8a17a7b55ba45233acbedf13ee732c4222e8a40afe63a37ed3a6e1ecda28b7d4";

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app_id: APIKEY,
      sentence: sentence,
      output_type: OUTPUT_TYPE
    })
  };

  try {
    const response = await fetch(BASE_URL, options);
    if (!response.ok) {
      return "Unknown";
    }
    const data = await response.json();
    return data.converted;
  } catch (e) {
    console.error('Error:', e);
    return "UnKnown";
  }
}

export { convertToHiragana };
