import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        // Original API link - https://newsapi.org/v2/
        super('https://nodenews.herokuapp.com/', {
            apiKey: '4cdc102cbd074241b43b3659a534436e',
        });
    }
}

export default AppLoader;
