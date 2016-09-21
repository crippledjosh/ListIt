import App from '../ui/components/App'
import Ingredients from '../api/ingredients/collection'
import IngredientList from '../ui/containers/ingredients-list'
import IngredientView from '../ui/containers/ingredient-view'
import RecipesList from '../ui/containers/recipes-list'
import Landing from '../ui/pages/Landing'
import { Login } from '../ui/pages/auth/Login'
import { NotFound } from '../ui/pages/NotFound'
import { RecoverPassword } from '../ui/pages/auth/RecoverPassword'
import { ResetPassword } from '../ui/pages/auth/ResetPassword'
import { Signup } from '../ui/pages/auth/Signup'


const requireAuth = (nextState, replace) => {
	if (!Meteor.loggingIn() && !Meteor.userId()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname },
		})
		return true
	}
}

const routes = {
	component : App,
	path: '/',
	indexRoute:{
		component: Landing
	},
	childRoutes: [
		{
			path: 'login',
			component: Login,
		},
		{
			path: 'recover-password',
			component: RecoverPassword,
		},
		{
			path: 'reset-password/:token',
			component: ResetPassword,
		},
		{
			path: 'signup',
			component: Signup,
		},
		{
			path: 'recipe/:id',
			component: NotFound,
			onEnter: requireAuth
		},
		{
			path: 'ingredients',
			component: IngredientList,
			onEnter: requireAuth
		},
		{
			path: 'ingredients/:limit',
			component: IngredientList,
			onEnter: requireAuth
		},
		{
			path: 'ingredient/:id',
			component: IngredientView,
			onEnter: requireAuth
		},
		{
			path: 'recipes',
			component: RecipesList
		},
		{
			path: 'shopping-list',
			component: NotFound
		},
		{
			path: '*',
			component: NotFound
		}
	]
}

export default routes
