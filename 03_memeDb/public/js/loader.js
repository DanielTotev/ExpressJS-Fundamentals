$(() => {
    $.get('/data')
        .then(data => {
            data = data.sort((a, b) => b.dateStamp - a.dateStamp).filter((currMeme) => currMeme.privacy === 'on');
            for(let meme of data){
                let memeElement = $(`<a href="/getDetails?id=${meme.id}">`);
                memeElement.append($(`<div class="meme">`));
                memeElement.append($(`<img class="memePoster" src="${meme.memeSrc}"/>`));
                $('.container').append(memeElement);
            }
            $('#replaceMe').remove();
        }).catch(err => {
            console.log(err);
        });
});