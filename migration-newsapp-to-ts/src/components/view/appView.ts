import { SourcesResponse, ArticlesResponse } from '../types/index';

import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: ArticlesResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: SourcesResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    public drawOptions(data?: SourcesResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.drawOptions(values);
    }

    public filterNewsSources() {
        this.sources.filterSources();
    }
}

export default AppView;
