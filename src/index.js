const app = require('./app');

async function main(){
    await app.listen(app.get(process.env.PORT ||'port'));
    console.log('Server on port', app.get('port'));
};
main();
