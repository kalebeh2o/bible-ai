import { GetExplanationParams } from "../../types/api";

const API_KEY = "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";

export const explanationEndpoints = {
  getExplanation: async ({
    verseText,
  }: GetExplanationParams): Promise<string> => {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "user",
                content: `O versículo a seguir é: '${verseText}'. 
                Explique esse versículo de forma clara, objetiva com até 500 caracteres e em português. 
                1. Estrutura do HTML:
                  Todo o conteúdo deve ser envolvido em uma única <div>.
                  
                  O artigo deve conter uma explicação clara e objetiva do versículo, limitada a 500 caracteres.
                  Devem ser incluídas citações de outros versículos que sejam relevantes e complementem a mensagem do versículo principal.
                  Todo o conteúdo deve seguir uma estrutura lógica e organizada, permitindo uma leitura fluida e agradável.
                2. Hierarquia e Formatação:
                  O título principal deve ser um <h4>, pois será o maior elemento de texto.
                  Deve haver subtítulos (<h5>) para separar seções como "Explicação" e "Versículos Relacionados".
                  O versículo e suas referências devem ser destacados em negrito e itálico para facilitar a leitura.
                  O texto explicativo deve ser estruturado em parágrafos (<p>) curtos e diretos, para melhorar a legibilidade.
                  As citações bíblicas devem estar dentro de <blockquote>, garantindo destaque especial.
                  Destaque os tópicos.
                3. Interatividade e Sofisticação:
                  O artigo deve começar com uma introdução chamativa para engajar o leitor.
                  O uso de listas (<ul> ou <ol>) é encorajado para apresentar pontos importantes de maneira organizada.
                  Perguntas reflexivas ou mensagens de aplicação prática podem ser adicionadas ao final para incentivar a reflexão do leitor.
                  Não deve haver CSS embutido ou externo—a estilização deve ser garantida apenas pela estrutura HTML bem organizada.
                 `,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content;

      content = content
        .replace(/\*\*\*(.*?)\*\*\*/g, "<b><i>$1</i></b>")
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") 
        .replace(/_(.*?)_/g, "<i>$1</i>"); 

      return content;
    } catch (error) {
      console.error("Erro ao chamar a API do Groq:", error);
      throw new Error("Erro ao obter explicação da IA.");
    }
  },
};
