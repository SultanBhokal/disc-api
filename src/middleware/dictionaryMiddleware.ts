import { Request, Response, NextFunction } from "express";
import { QueryParams } from "../types/query";
import { findMeaningByWord } from "../model/dictionaryModel";

export async function checkQueryInDb(
  req: Request<{}, {}, {}, QueryParams>,
  res: Response,
  next: NextFunction
) {
  try {
    const { query } = req.query;
    if (!query) {
      return res.json({ result: "Please provide query " }).status(200);
    }
    const dbData = await findMeaningByWord(query);
    if (dbData?.meaning) {
      console.log("Found In DB : ",dbData)
      
      const results = {
        words:dbData.words,
        meaning:dbData.meaning,
        lemma:dbData.lemma
      }
      return res.json({results:results}).status(200)
    }
    next();
  } catch (error) {
    console.log(error)
    return res.json({error:"Internal Server Error"}).status(500)
  }
}
