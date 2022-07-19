export function login(dispatch, updateUser, JWTtoken){
    fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + JWTtoken
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message !== "Successfully got user profile data"){
            console.log("Une erreur s'est produite")
        }else{
            dispatch(updateUser({
                firstName: data.body.firstName,
                lastName: data.body.lastName,
                email: data.body.email,
                isloged: true
            }))
        }
    })
    .catch((error) => {
        console.log(error)
    });
}