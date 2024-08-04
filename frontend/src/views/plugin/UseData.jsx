import Cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

function UserData() {
    let access_token = Cookie.get("access_token")
    let refresh_token = Cookie.get("refresh_token")
    // console.log('refresh_token', refresh_token)
    // console.log('access_token', access_token)
    if (access_token && refresh_token){
        const token = refresh_token
        // console.log(token, "token")
        const decoded = jwtDecode(token)
        return decoded
    }else {
        console.log("user token does not exist")
    }
}

export default UserData