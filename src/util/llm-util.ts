import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getPrefs } from "@/util/prefs-util"
import { z } from "zod";

const model = new ChatGoogleGenerativeAI({
  apiKey: "CHANGE ME",
  model: "gemini-1.5-flash",
  maxOutputTokens: 2048,
  temperature: 0.1,
});

// Categories allowed to be inferred by LLM.
const possibleCategories = getPrefs().possibleCategories;

// Prompt for infering category batch.
const promptTemplate_queryLLMTransactionsBatch = PromptTemplate.fromTemplate(
  "You are given JSON input that is a list of items that are transactions with id and description. " +
  "For each item, determine the most related transaction category from these options:\n" +
  `Options: ${possibleCategories}\n` +
  "Modify the given list to include for each item a new string field 'category' " +
  "that is set to the most related category as a string as it appears in the options. \n" +
  "Return the modified list in JSON format." +
  "Given JSON input: \n" +
  "{input}"
)

// Structured output for batch infer categories prompt.
const structuredOutput_LLMTransactionsBatch = z.object({
  transactions: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      category: z.string(),
    })
  ),
});

// Chain piping batch infer categories prompt to LLM with structured output.
const chain_queryLLMTransactionsBatch = promptTemplate_queryLLMTransactionsBatch.pipe(
  model.withStructuredOutput(structuredOutput_LLMTransactionsBatch)
);

export interface DescriptionLLMInputModel {
  id: string;
  description: string;
}

export interface DescriptionLLMResultModel {
  id: string;
  description: string;
  category: string;
}

/*
  Send LLM query for batch infer categories. Returns structure output with new category field.
*/
export async function queryLLMTransactionsBatch(descriptionsArray: DescriptionLLMInputModel[]): Promise<DescriptionLLMResultModel[]> {
  const result = await chain_queryLLMTransactionsBatch.invoke({ input: JSON.stringify(descriptionsArray) })
  return result.transactions;
}

