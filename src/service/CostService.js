import { API, graphqlOperation } from 'aws-amplify';

export default class CountryService {

    async getCost(st,en,ty) {
        const GetDailyCost = `query($start:AWSDate, $end:AWSDate,$type:String) {
            getDailyCost(start:$start, end:$end, type:$type) {
                data
                labels
            }
          }`
        const data = await API.graphql(graphqlOperation(GetDailyCost, { start: st, end:en, type:ty }))
        return data.data.getDailyCost
    }
}
