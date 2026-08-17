import express from 'express'
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'
import path from 'path'
import redis from 'redis'
import methodOverride from 'method-override'

const port = 3000

const app = express()

//  Create Redis Clint
let client = redis.createClient()

client.on('error', (err) => {
    console.log('Redis error:', err)
})
await client.connect()
console.log('💪 Connected to Redis ...')

// View Engine
app.engine('handlebars', engine({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

// methodOverride
app.use(methodOverride('_method'))

app.get('/', function (req, res, next) {
    res.render('searchusers')
})

// User create page
app.get('/user/create', function(req,res,next) {
    res.render('createuser')
})

// Search
app.post('/user/search', async function(req, res, next){
    try {
        const id = req.body.id;

        const obj = await client.hGetAll(id);
        if (Object.keys(obj).length === 0) {
            return res.render('searchusers', {
                error: 'User does not exist'
            });
        }

        obj.id = id;
        res.render('details', {
            user: obj
        });

    } catch (err) {
        next(err);
    }
})

// User add
app.post('/user/add', async function(req, res, next){
    try{
        const {id, first_name, last_name, email, phone} = req.body

        if (!id || id.trim().length === 0) {
            return res.render('createuser', {
                error: 'ID required'
            });
        }

        if (!first_name || first_name.length < 2) {
            return res.render('createuser', {
                error: 'First name must contain at least 2 characters'
            });
        }

        if (!last_name || last_name.length < 2) {
            return res.render('createuser', {
                error: 'Last name must contain at least 2 characters'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.render('createuser', {
                error: 'Please enter a valid email'
            });
        }

        await client.hSet(id, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone
        });

        res.redirect('/');
    }catch (err) {
        next(err);
    }

})
// User delete
app.post('/user/delete/:userid', async function(req, res, next){
    try{
        const userid = req.params.userid;
        await client.del(userid)
        res.redirect('/');
    }catch (err) {
        next(err);
    }
})


app.listen(port, ()=>{
    console.log('👉   Server started on port: ' + port)
})




