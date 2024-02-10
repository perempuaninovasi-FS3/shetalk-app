import { getUser } from './userUtils';
import bronzeBadge from '../assets/img/bronzebadge.svg';
import silverBadge from '../assets/img/silverbadge.svg';
import goldBadge from '../assets/img/goldbadge.svg';

const user = getUser() || {};
const totalAnswered = user.total_answered || 0;

let badgeName;
let badgeImage;

if (totalAnswered >= 100) {
    badgeName = 'Gold Badge';
    badgeImage = goldBadge;
} else if (totalAnswered >= 50) {
    badgeName = 'Silver Badge';
    badgeImage = silverBadge;
} else if (totalAnswered >= 20) {
    badgeName = 'Bronze Badge';
    badgeImage = bronzeBadge;
} else {
    // Default image if totalAnswered is less than or equal to 20
    badgeImage = null;
}

export { badgeImage, badgeName };