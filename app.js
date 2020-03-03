const username = 'gautemeekolsen'

const getArticles = async () => {
    const response = await fetch(`https://dev.to/api/articles?username=${username}`);
    const data = await response.json();
    console.log(data);
    for(article of data){
        addArticle(article);
    }
}

const addArticle = article => {
    const template = document.querySelector('#blog-item');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.title').textContent = article.title;
    clone.querySelector('.url').href = `article.html?id=${article.id}`;

    document.querySelector('#blog-list').appendChild(clone);
}

getArticles();