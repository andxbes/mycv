let dbConfig = {
    synchronize: false
};


switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
        });
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.js'],
        });
        break;
    default:
        throw new Error('unknown environment');
}
console.info(dbConfig);
module.exports = dbConfig;
