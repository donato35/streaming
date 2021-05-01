export const STAGE = process.env.VUE_APP_STAGE || "local";
const AWS_REGION = "eu-west-1";
const GRAPHQL = {
  local: "https://nryckdzv4bfbtahpg7xhjrey64.appsync-api.eu-west-1.amazonaws.com/graphql",
  dev: "https://nryckdzv4bfbtahpg7xhjrey64.appsync-api.eu-west-1.amazonaws.com/graphql",
  test: "https://nryckdzv4bfbtahpg7xhjrey64.appsync-api.eu-west-1.amazonaws.com/graphql"
};
const USER_POOL = {
  local: "eu-west-1_yFaUiXe64",
  dev: "eu-west-1_yFaUiXe64",
  test: "eu-west-1_yFaUiXe64"
}
const USER_CLIENT = {
  local: "1cd89fbti3lribodt3rcsrqhnr",
  dev: "1cd89fbti3lribodt3rcsrqhnr",
  test: "1cd89fbti3lribodt3rcsrqhnr"
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
