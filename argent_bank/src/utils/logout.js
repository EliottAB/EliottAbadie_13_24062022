export function logout(dispatch, updateUser){
    dispatch(updateUser({
        firstName: "",
        lastName: "",
        email: "",
        isloged: false
    }))
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
}