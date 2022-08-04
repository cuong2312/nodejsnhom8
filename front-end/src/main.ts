import './style.css'
import Navigo from 'navigo'
import AdminPage from './pages/Admin'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
const router = new Navigo('/', {linksSelector: "a"})

export type ComponentBase = {
  render: () => Promise<string>;
  afterRender?: () => void
}

const print = async (component: ComponentBase, id) => {
  document.getElementById('app').innerHTML = await component.render(id)
  if(component.afterRender) {
    component.afterRender(id)
  }
}

router.on({

  "/Signin": () => {
    print(Signin)
  },
  "/Signup": () => {
    print(Signup)
  },
  "/admin": () => {
    print(AdminPage)
  }
})
router.resolve()