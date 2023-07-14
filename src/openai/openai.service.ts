import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
const MODULE_ID="text-davinci-003"
const defaultTemperature=0.9
@Injectable()
export class OpenaiService {
    private readonly OpenaiApi:OpenAIApi
    constructor(){
        const configuration = new Configuration({
            organization: process.env.example.ORGANISATION_ID,
            apiKey: process.env.example.OPENAI_API_KEY,
        });
        this.OpenaiApi = new OpenAIApi(configuration);
    }
    async getModelAnswer(question:string,temperature?:number){
        try{
           const params:CreateCompletionRequest={
            prompt : question,
            model : MODULE_ID,
            temperature: temperature!=undefined?temperature:defaultTemperature
           }
           const response = await this.OpenaiApi.createCompletion(params)
           const {data} = response
           if(data.choices.length){
            return data.choices
           }
           return response.data
        }catch(error){
            console.error('Error:', error);
        }
    }
    healthCheck() {
      //TODO: add this to /health service
    }
  
    query(question: string) {
      //   TODO:
    }
} 