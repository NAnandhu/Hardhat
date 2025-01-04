import express,{json} from 'express'
import { CertRoute } from './Routes/CertiRoute.js';

const app =express();

app.use(json())

app.use('/',CertRoute)
app.listen(8000,function(){
     console.log(`Server listening to 8000`);
     
})