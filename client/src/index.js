import dva from 'dva';
import './index.css';

const _createHashHistory = import('history')._createHashHistory
// 1. Initialize
const app = dva({
    history : _createHashHistory
});
// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
