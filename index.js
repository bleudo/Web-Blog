import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/home', (req, res) => {
    res.render("home");
});

app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/create_post', (req, res) => {
    const postId = req.query.id;
    let post = {};
    if (postId) {
        post = posts.find(p => p.id == postId) || {};
    }
    res.render('pages/create_post', { post });
});

app.get('/post/:id', (req, res) => {
    const post = posts.find(post => post.id == req.params.id);
    
    if (post) {
    res.json(post);

    } else {
        res.status(404).send('Post not found');
    }
});

app.post("/save-post", (req, res) => {
    const { id, title, content } = req.body;

    if (id) {
        // Actualizar un post existente
        const post = posts.find(post => post.id == id);
    if (post) {
        post.title = title;
        post.content = content;
        post.date = new Date(); // Actualiza la fecha de modificación
     }
    } else {
        // Guardar un nuevo post
        posts.push({ id: nextId++, title, content, date: new Date() });
    }

    res.redirect('/posts');
});

app.delete('/post/:id', (req, res) => {
    const index = posts.findIndex(post => post.id == req.params.id);
    if (index !== -1) {
        posts.splice(index, 1);
        res.status(200).send('Post deleted');
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/posts', (req, res) => {
    res.render('pages/posts', { posts: posts });
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
