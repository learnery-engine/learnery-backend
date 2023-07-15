import { Injectable } from '@nestjs/common';
import { CreateCompletionRequest, OpenAIApi } from "openai";
import { ConfigModule } from '@nestjs/config';
const MODULE_ID="text-davinci-003"
const defaultTemperature=0.9
@Injectable()
export class OpenaiService {
    private readonly OpenaiApi:OpenAIApi
    constructor(private readonly config:ConfigModule){
        const configuration = [{
            organization: config.get<string>('ORGANISATION_ID'),
            apiKey: config.get<string>('OPENAI_API_KEY'),
        }];
        
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