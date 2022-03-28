// 缓存 后端发过来的token
import Cokie from 'js-cookie'
export default {
    state:{
        token:''
    },
    mutations:{
        setToken(state,val){
            state.token = val;
            Cokie.set('token',val)
        },
        clearToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state){
            state.token = state.token||Cokie.get('token')
        }
    }
}