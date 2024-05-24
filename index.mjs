/* global fetch */

function denyResponse(event) {
  return generatePolicy('user', 'Deny', event.methodArn);
}
function allowResponse(event) {
  return generatePolicy('user', 'Allow', event.methodArn);
}
function generatePolicy(principalId, effect, resource) {
  const response = {
    principalId,
    context: {
      message: 'HelloWorld'
    }
  };
  // if (!effect || !resource) {
  //   return response;
  // }
  
  response.policyDocument = {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    }],
  };
  
  
  console.log(JSON.stringify(response));
  return response;
}

export const handler = async (
  event,
  context,
) => {

  console.log(JSON.stringify(event));

  const queryParams = event["queryStringParameters"];
  if (!queryParams) {
    return denyResponse(event);
  }
  const apiKey = queryParams["key"];
  console.log(`---->apikey=${apiKey}`);
  if (!apiKey) {
    return denyResponse(event);
  }
  
  const authResponse = await fetch(`http://ec2-35-76-34-50.ap-northeast-1.compute.amazonaws.com/auth/realms/kana-api/check?apikey=${apiKey}`);
  console.log("---->after fetch");
  console.log(JSON.stringify(authResponse));
  if (authResponse.status === 200) {
    return allowResponse(event);
  } else {
    return denyResponse(event);
  }
};

