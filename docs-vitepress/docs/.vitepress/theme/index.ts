import Theme from 'vitepress/theme';
import HaoeaUi from 'haoea-ui';

export default {
    ...Theme,
    enhanceApp({ app })  {
        app.use(HaoeaUi);
    }
}