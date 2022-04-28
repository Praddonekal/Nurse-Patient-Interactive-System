let graphql = require("graphql");

module.exports = graphql.buildSchema(`
    scalar Date

    type User{
        _id: ID!
        username:String!,
        password:String!
        role:String!
    }

    type ClinicalVisit{
        _id: ID!
        bodyTemperature:Int!,
        heartRate:Int!
        bloodPressure:String!,
        respiratoryRate: Int!,
        nurse: ID,
        patient: ID
    }

    type Alert{
        _id: ID!
        message:String!,
        unread:Boolean!,
        patient:ID!,
        created:Date!
    }
    type MotivationalTips{
        _id: ID!
        tip:String!,
        created:Date!
    }

    type LoginReturnType{
        token:String  
        id:ID 
        role:String
    }
    type DailyLog{
        _id: ID!,
        pulse:String!,
        bloodPressure:String!,
        weight:String!,
        bodyTemperature:String!,
        respiratoryRate: String!,
        nurse: ID,
        patient: ID,
        created:Date!
    }
    type MessageReturn{
        message:String 
        status:String  
    }
    

    type RootMutation{
        createUser(username:String!, password:String!, role:String!):MessageReturn!
        login(username:String!,password:String!):LoginReturnType!
        createClinicalVisit(bodyTemperature:Int!, heartRate:Int!, bloodPressure:String!,respiratoryRate: Int!,nurse: String,patient: String):MessageReturn!
        createMotivationalTips(type: String!, tip:String!):MessageReturn!
        createEmergencyAlert(patient:String!,message:String!):MessageReturn!
        createDailyLog(pulse:String!,bodyTemperature:String!,bloodPressure:String!,respiratoryRate:String!, nurse:String!, patient:String!,weight:String!):MessageReturn!
        heartDiseasePredict(age:Int!,sex:Int!,cp:Int!,trestbps:Int!,chol:Int!,fbs:Int!,restecg:Int!,thalach:Int!,exang:Int!,oldpeak:Float!,slope:Int!,ca:Int!,thal:Int!):MessageReturn!
    }
    type RootQuery{
        user(userId:String!):User!
        findUserByRole(role:String!):[User]
        findClinicalVisitsByNurse(nurse:ID!):[ClinicalVisit]
        findAlerts:[Alert]
        findMotivationalTips(type:String!):[MotivationalTips]
        findDailyLogsByNurse(nurse:ID!):[DailyLog]
       

    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);
