import {App} from '../ui/components/App'
import { IngredientsListContainer } from '../ui/containers/ingredients-list'
import { IngredientViewContainer } from '../ui/containers/ingredient-view'
import { RecipesListContainer } from '../ui/containers/recipes-list'
import { Landing } from '../ui/pages/Landing'
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
		});
		return true
	}
};

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
			component: IngredientsListContainer,
			onEnter: requireAuth
		},
		{
			path: 'ingredients/:limit',
			component: IngredientsListContainer,
			onEnter: requireAuth
		},
		{
			path: 'ingredient/:id',
			component: IngredientViewContainer,
			onEnter: requireAuth
		},
		{
			path: 'recipes',
			component: RecipesListContainer
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
};

export default routes
