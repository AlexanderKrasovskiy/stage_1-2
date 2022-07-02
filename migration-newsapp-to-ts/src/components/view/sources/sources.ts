import { NewsSource } from '../../types/index';
import './sources.css';

class Sources {
    constructor(private newsSources: NewsSource[] = []) {}

    public draw(data: NewsSource[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            (sourceClone.querySelector('.source__item-name') as HTMLSpanElement).textContent = item.name;
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
            sourceClone.querySelector('.source__item')?.setAttribute('title', item.category);

            fragment.append(sourceClone);
        });

        const sourcesDiv = document.querySelector('.sources') as HTMLDivElement;
        sourcesDiv.innerHTML = '';
        sourcesDiv.append(fragment);
    }

    public drawOptions(data: NewsSource[]) {
        this.newsSources = data;

        const categories = new Set<string>();
        const languages = new Set<string>();

        data.forEach((el) => {
            categories.add(el.category);
            languages.add(el.language);
        });

        const categoryTag = document.querySelector('#categorySelect') as HTMLSelectElement;
        const languageTag = document.querySelector('#languageSelect') as HTMLSelectElement;

        this.fillSelectTag(categoryTag, categories);
        this.fillSelectTag(languageTag, languages);
    }

    private fillSelectTag(tag: HTMLSelectElement, set: Set<string>) {
        const fragment = document.createDocumentFragment();
        set.forEach((cat) => {
            const optionTag = document.createElement('option');
            optionTag.value = cat;
            optionTag.innerText = cat[0].toUpperCase() + cat.slice(1);
            fragment.append(optionTag);
        });
        tag.append(fragment);
    }

    public filterSources() {
        const currentCategory = (document.querySelector('#categorySelect') as HTMLSelectElement).value;
        const currentLanguage = (document.querySelector('#languageSelect') as HTMLSelectElement).value;

        if (currentCategory === '' && currentLanguage === '') {
            this.draw(this.newsSources);
        } else if (currentCategory === '') {
            const newData = this.newsSources.filter((el) => el.language === currentLanguage);
            this.draw(newData);
        } else if (currentLanguage === '') {
            const newData = this.newsSources.filter((el) => el.category === currentCategory);
            this.draw(newData);
        } else {
            const newData = this.newsSources.filter((el) => {
                return el.language === currentLanguage && el.category === currentCategory;
            });

            this.draw(newData);
        }
    }
}

export default Sources;
