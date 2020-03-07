const getArticle = async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const response = await fetch(`https://dev.to/api/articles/${id}`);
    const data = await response.json();

    document.title = data.title;
    document.querySelector('#title').textContent = data.title;
    document.querySelector('#cover').src = data.cover_image;

    document.querySelector('#author-img').src = data.user.profile_image_90;
    document.querySelector('#author-img').addEventListener('click', speedup);
    document.querySelectorAll('.name').forEach(el => el.textContent = data.user.name);
    
    setUserLink('#twitter', !!data.user.twitter_username, `https://twitter.com/${data.user.twitter_username}`);
    setUserLink('#github', !!data.user.github_username, `https://github.com/${data.user.github_username}`);
    setUserLink('#devto', !!data.user.username, `https://dev.to/${data.user.username}`);
    setUserLink('#homepage', !!data.user.website_url, data.user.website_url, data.user.website_url.replace(/http[s]?:\/\//, ''));

    document.querySelector('#date').textContent = data.readable_publish_date;

    const tagList = document.querySelector('#tags');
    for(const tag of data.tags){
        const li = document.createElement('li');
        li.textContent = tag;
        tagList.appendChild(li);
    }

    const articleElement = document.querySelector('#article-body');
    articleElement.innerHTML = data.body_html;
}

const setUserLink = (id, hasValue, url, text) => {
    const el = document.querySelector(id);
    if (!hasValue){
        el.style.display = 'none';
        return;
    }
    el.href = url;
    if(text){
        el.textContent = text;
    }
}

getArticle();

const speedup = () =>{
    let speed = getComputedStyle(document.body).getPropertyValue('--user-img-speed');
    speed = parseFloat(speed.replace('s', '')) / 3 + 's'
    document.documentElement.style.setProperty('--user-img-speed', speed);
}