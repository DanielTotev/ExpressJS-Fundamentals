$(() => {
    let id = window.location.href.split('=')[1];
    $.get('/data')
        .then(data => {
            let meme = data.filter(m => m.id == id)[0];
            let memeElement = $(`<div class="content">`);
            memeElement.append($(`<img src="${meme.memeSrc}" alt="/">`));
            memeElement.append($(`<h3>Title  ${meme.title}</h3>`));
            memeElement.append($(`<p> ${meme.description}</p>`));
            memeElement.append($(`<button><a href="${meme.memeSrc}">Download Meme</a></button>`));
            $(document.body).append(memeElement);
            $('#replaceMe').remove();            
        })
        .catch(err => {
            console.log(err);
        })
});