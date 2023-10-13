import exress from "express";
import { getMeaningOfWord } from "../controllers/dictionaryController";
import { checkQueryInDb } from "../middleware/dictionaryMiddleware";

const router = exress.Router();

router.route("/").get(checkQueryInDb,getMeaningOfWord)

export default router;