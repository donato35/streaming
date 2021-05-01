import { API, graphqlOperation } from 'aws-amplify';

export default class CountryService {

    async getDailyCost(st,en) {
        
        console.log(API)
        console.log(graphqlOperation)
        const GetDailyCost = `query($start:AWSDate, $end:AWSDate) {
            getDailyCost(start:$start, end:$end) {
                data
                labels
            }
          }`
        const data = await API.graphql(graphqlOperation(GetDailyCost, { start: st, end:en }))
        return data.data.getDailyCost
    }
}
