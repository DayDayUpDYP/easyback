import Cookie from "js-cookie";

const state = {
  isCollapse: false,
  tabsList: [
    {
      path: "/",
      name: "home",
      label: "首页",
      icon: "home"
    }
  ] /* 用于存储面包屑的信息 更改选中颜色 */,
  currentMenu: null, // 当前高亮显示的面包屑
  // 用于动态路由的展示
  menu:[]
};
const mutations = {
  collapseMenu(state) {
    state.isCollapse = !state.isCollapse;
  },
  // 用于改变tabsList的数据
  selectMenu(state, val) {
    /* val 表示当前点击的菜单 */
    if (val.name !== "home") {
      state.currentMenu = val; //当前的menu值
      const result = state.tabsList.findIndex(item => item.name == val.name); //选中的面包屑有没有加入List 没有就重新加
      if (result === -1) {
        state.tabsList.push(val);
      } else {
        state.currentMenu = null;
      }
    }
  },
  closeTag(sate, val) {
    const result = sate.tabsList.findIndex(item => item.name === val.name);
    state.tabsList.splice(result, 1);
  },
  setMenu(state,val){
    // 将menu数据获取并缓存到cookie
    console.log('执行setmenut')
    state.menu = val;
    console.log('va;==>',val)
    Cookie.set('menu',JSON.stringify(val))
  },
  clearMenu(state){
    state.menu = []
  },
  // 将menu添加
  addMenu(state,router){

    if(!Cookie.get('menu')){
      return
    }
    // 这句话出错了 
    const menu = JSON.parse(Cookie.get('menu'))
    
    state.menu = menu;
    const menuArray = []
    menu.forEach(item=>{
      // 表示如果有二级菜单
      if(item.children){
        // 给children每个添加component 赋值
        item.children = item.children.map(item=>{
          item.component = ()=> import(`../view/${item.url}`)
          return item
        })
        menuArray.push(...item.children)
      }else{
        item.component = () =>import(`../view/${item.url}`)
        menuArray.push(item)
      }
      // 动态添加路由
      menuArray.forEach(element => {
        // 给main动态添加路由
       router.addRoute('Main',element)
      });
    });
  }
};
export default {
  state,
  mutations
};
