const API_KEY = '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'; // Sua chave da API Groq

export const getAiExplanation = async (verseText: string) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Modelo específico da Groq
        messages: [
          {
            role: 'user',
            content: `O versículo a seguir é: '${verseText}'. Explique esse versículo de forma clara, objetiva e em português.`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();
    const explanation = data.choices[0].message.content; // A explicação estará nesse campo

    return explanation;
  } catch (error) {
    console.error('Erro ao chamar a API do Groq:', error);
    return "Erro ao obter explicação da IA.";
  }
};
