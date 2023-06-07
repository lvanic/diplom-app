import { Button } from "react-bootstrap"
import { GetServer } from "../helpers/GetServer"
import { useRecoilState } from "recoil"
import { userStateAtom } from "../atoms/userStateAtom"
import { useNavigate } from "react-router-dom"

export const Profile =() => {
    const [userState, setUserState] = useRecoilState(userStateAtom)
    const navigate = useNavigate();
    const logout = () => {
        fetch(GetServer() + '/api/authorization/logout', {credentials:'include'}).then(response => {
            if (response.ok){
                setUserState({isAuth: false, name:'', role:'Guest'})
                navigate('/events')
            }
        })
    }
    return(
        <div>
            <Button onClick={logout}>
                Выход
            </Button>
        </div>
    )
}