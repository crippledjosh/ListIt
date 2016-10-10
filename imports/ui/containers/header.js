import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Header }  from '../components/Header';

const composer = (props, onData) => {
	onData(null, { hasUser: Meteor.user() });
};

export const HeaderContainer = composeWithTracker(composer, {}, {}, { pure: false })(Header);
