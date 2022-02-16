import axios from "axios";

// - Receive code(string)
// - Retrieve access_token on github
// - Retrieve user info on github
// - Check if the user exists in the database
// ----- YES = Generate a token
// ----- NO = Create in database, generate a token
// - Return the token with the user info

interface IAccessTokenResponse {
  access_token: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url,null,{
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    })

    const response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    return response.data;
  }
}

export { AuthenticateUserService }