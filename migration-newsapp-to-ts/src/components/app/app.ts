import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        this.controller.getSources((data) => {
            this.view.drawSources(data);
            this.view.drawOptions(data);
        });

        this.controller.getTopTechNews((data) => this.view.drawNews(data));

        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );

        (document.querySelector('#options-form') as HTMLFormElement).addEventListener('submit', (e) => {
            e.preventDefault();
            this.view.filterNewsSources();
        });
    }
}

export default App;
