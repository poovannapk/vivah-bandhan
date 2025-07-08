// filepath: backend/ai/matchmaking.ts
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

const llm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

export async function getMatchRecommendations(userProfile, candidates) {
  const prompt = new PromptTemplate({
    template: `
      Given the following user profile:
      {userProfile}
      And these candidate profiles:
      {candidates}
      Recommend the top 3 best matches and explain why.
    `,
    inputVariables: ["userProfile", "candidates"],
  });

  const input = await prompt.format({
    userProfile: JSON.stringify(userProfile),
    candidates: JSON.stringify(candidates),
  });

  const response = await llm.call([input]);
  return response.content;
}