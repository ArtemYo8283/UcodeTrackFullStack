import authRouter from './api/auth.router.js';
import userRouter from './api/user.router.js';
import roleRouter from './api/role.router.js';
import projectRouter from './api/project.router.js';
import formatRouter from './api/format.router.js';
import categoryRouter from './api/category.router.js';

class AppRouter {
	constructor(app) { this.app = app }
	init() {
		this.app.get('/', (_req, res) => {
			res.send('API Running');
		});
		this.app.use('/api/auth', authRouter);
		this.app.use('/api/users', userRouter);
		this.app.use('/api/roles', roleRouter);
		this.app.use('/api/projects', projectRouter);
		this.app.use('/api/formats', formatRouter);
		this.app.use('/api/categories', categoryRouter);
	}
}

export default AppRouter;