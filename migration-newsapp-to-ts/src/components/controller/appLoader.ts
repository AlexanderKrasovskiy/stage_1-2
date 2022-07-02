import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            // Original API link - https://newsapi.org/v2/
            apiKey: '4cdc102cbd074241b43b3659a534436e',
        });
    }
}

export default AppLoader;
