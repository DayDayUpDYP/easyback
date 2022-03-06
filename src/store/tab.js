const state={
    isCollapse:false,
    tabsList :[
        {
            path:'/',
            name:'home',
            label:'首页',
            icon:'home'
        }
    ], /* 用于存储面包屑的信息 更改选中颜色 */
    currentMenu:null // 当前高亮显示的面包屑
}
const mutations={
    collapseMenu(state){
        state.isCollapse = ! state.isCollapse
    },
    // 用于改变tabsList的数据
    selectMenu(state,val){
        /* val 表示当前点击的菜单 */
        if(val.name !=='home'){
            state.currentMenu = val  //当前的menu值
            const result = state.tabsList.findIndex(item=>item.name == val.name) //选中的面包屑有没有加入List 没有就重新加
            if(result === -1){
                state.tabsList.push(val)
            }else{
                state.currentMenu=null;
            }
        }
    }

}
export default{
    state,
    mutations,
}