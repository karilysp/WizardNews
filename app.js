const express = require("express");
const morgan = require("morgan")
const postBank = require("./postBank")

const app = express();

app.use(morgan('dev'));

app.get("/", (req, res) => {
  const post = postBank.list();

  res.send(`<DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css"/>
  </head>
  <body>
    <div class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
    
    
      ${post.map(post => `
      <div class='news-item'>
      <a href="/posts/${post.id}">${post.title}
      <p>
      <span class="news-position">${post.id}<span>
      ${post.title}
      <small>(by ${post.name})</small>
      </p>
      </a>
      <small class="news-info">
      ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>

    
  </body>
  </html>`
  );

 
});

app.use(express.static("public"));


app.get('/posts/:id', (req, res) => {
  const id= req.params.id;
  const post= postBank.find(id);

  if(!post.id){
    throw new Error('Not Found');
  } else {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              <span class="news-position">${post.id}. ▲</span>${post.title}
              <small>(by ${post.name})</small>
              <small>${post.content}</small>
            </p>
            <small class="news-info">
              ${post.date}
            </small>
          </div>
      </div>
    </body>
  </html>`);

  }

})


const PORT = 1337;

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

