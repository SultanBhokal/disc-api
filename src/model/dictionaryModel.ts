import mongoose from "../service/mongooseService";
import { disc } from "../types/discModel";

const Schema = mongoose.Schema;

const disctionarySchema=new Schema({
    word:String,
    words:String,
    meaning:String,
    lemma:String

});

const disctionaryModel = mongoose.model("dictionary",disctionarySchema);

const findMeaningByWord = (word:string)=>{
    return disctionaryModel.findOne({word:word})
}

const createDictionary = (data:disc)=>{
    const disc = new disctionaryModel(data);
    return disc.save();
}

export {disctionaryModel,findMeaningByWord,createDictionary};
