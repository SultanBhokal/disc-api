import wordnet from "en-wordnet";
import Dictionary from "en-dictionary";
import { Request, Response } from "express";
import { QueryParams } from "../types/query";
import { createDictionary } from "../model/dictionaryModel";

export async function getMeaningOfWord(
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) {
  try {
    const { query } = req.query;
    const dictionary = new Dictionary(wordnet.get("3.0"));
    await dictionary.init();
    const results = dictionary.searchSimpleFor([query]);
    const data = results.get(query);
    
    if(data?.meaning){
      const obj = {
        word:query,
        words:data.words,
        meaning:data.meaning,
        lemma:data.lemma
      }
      console.log("got from github api",data);

      const insertNewWord = await createDictionary(obj)
     
    }
    return res.json({ results: data });
  } catch (error) {
    return res.json({error:"Internal Server Error"}).status(500)
  }
}
