const username = 'gautemeekolsen'

const getArticles = async () => {
    const response = await fetch(`https://dev.to/api/articles?username=${username}`);
    const data = await response.json();
    const name = data[0].user.name;
    document.querySelectorAll('.name').forEach(el => el.textContent = name);
    document.title = `Blog - ${name}`;
    for(article of data){
        addArticle(article);
    }
}

const addArticle = article => {
    const template = document.querySelector('#blog-item');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.title').textContent = article.title;
    clone.querySelector('.url').href = `article.html?id=${article.id}`;
    
    if(article.cover_image){
        clone.querySelector('.cover').src = article.cover_image;
    }else{
        clone.querySelector('.cover').src = './images/placeholder.jpg';
    }

    document.querySelector('#blog-list').appendChild(clone);
}

getArticles();