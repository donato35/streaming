export const STAGE = process.env.VUE_APP_STAGE || "local";
const AWS_REGION = "eu-west-1";
const GRAPHQL = {
  local: "https://33ewgzqfvvfcdmhmstcmsjfdny.appsync-api.eu-west-1.amazonaws.com/graphql",
  dev: "https://33ewgzqfvvfcdmhmstcmsjfdny.appsync-api.eu-west-1.amazonaws.com/graphql",
  test: "https://2bq75k6kszds3jr57tux3g5ffm.appsync-api.eu-west-1.amazonaws.com/graphql"
};
const USER_POOL = {
  local: "eu-west-1_uFRDME2zV",
  dev: "eu-west-1_uFRDME2zV",
  test: "eu-west-1_uFRDME2zV"
}
const USER_CLIENT = {
  local: "6c6qa0i673ljhqsdhoqu9u0k0n",
  dev: "6c6qa0i673ljhqsdhoqu9u0k0n",
  test: "6c6qa0i673ljhqsdhoqu9u0k0n"
}

export default {
  Auth: {
    region: AWS_REGION,
    userPoolId: USER_POOL[STAGE],
    userPoolWebClientId: USER_CLIENT[STAGE],
    // oauth: {
    //   scope: [],
    //   redirectSignIn: "",
    //   redirectSignOut: "",
    //   responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
    // }
  },
  aws_appsync_graphqlEndpoint: GRAPHQL[STAGE],
  aws_appsync_region: AWS_REGION,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"
}

export const API_GW = {
  local: "https://9xrdcwcdkj.execute-api.eu-west-1.amazonaws.com",
  dev: "https://9xrdcwcdkj.execute-api.eu-west-1.amazonaws.com",
  test: "https://q72c9hs9gf.execute-api.eu-west-1.amazonaws.com"
};
