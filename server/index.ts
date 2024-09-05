import dotenv from 'dotenv';
import express, {Express, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app: Express = express();

 // Array of example users for testing purposes
 const users = [
    {
      id: 1,
      name: 'Maria Doe',
      email: 'maria@example.com',
      password: 'maria123'
    },
    {
      id: 2,
      name: 'Juan Doe',
      email: 'juan@example.com',
      password: 'juan123'
    }
  ];

interface Iform {
    email: string,
    password: string
}

export const validateLoginForm = (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if(!email && typeof email!== 'string' && !email.includes('@')){
        return res.status(401).json({'error': 'Invalid email format'});
    }

    if(!password && typeof password!== 'string' && password.length<6){
        return res.status(401).json({'error': 'Invalid password format'});
    }
    next()
}

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    console.log('hit request')
    res.send('Hello World From the Typescript Server!')
});

app.post('/login', validateLoginForm, (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = users.find((user) => {
        return user.email === email && user.password === password
    })
    if(!user){
        res.status(401).send({message: 'User not found'})
    }
    return res.status(201).json(user)
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});
